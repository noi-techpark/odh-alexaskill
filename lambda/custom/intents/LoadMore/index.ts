import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { IsIntent, GetRequestAttributes, RouteGenerate, cleanSssmlResponseFromInvalidChars } from "../../lib/helpers";
import { RequestTypes, TranslationTypes, HandlerResponseStatus, ApiCallTypes } from "../../lib/constants";
import { IHandlerResponse, IParamsApiStructure, IResponseApiStructure } from "../../interfaces";

export const LoadMoreHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return IsIntent(handlerInput, RequestTypes.LoadMore);
    },
    async handle(handlerInput: HandlerInput): Promise<Response> {

        const { t } = GetRequestAttributes(handlerInput);
        const { event } = handlerInput.attributesManager.getSessionAttributes();

        let responseSpeech: IHandlerResponse = {
            speechText: t(TranslationTypes.ERROR_MSG),
            promptText: t(TranslationTypes.HELP_MSG),
            status: HandlerResponseStatus.Failure
        };

        // If event session attributes exists, redirect alexa to the event intent. Event session attributes only exist when the user previously asked alexa for events
        if (event !== undefined) {
            let data: IParamsApiStructure[ApiCallTypes.EVENT_LOCALIZED];

            // set data params from the old session
            data = event.params;

            if (data.pagenumber) {
                // Get the next page
                data.pagenumber++;
                // Notify the user when no more events are available
                if (data.pagenumber > event.totalPages) {
                    return handlerInput.responseBuilder
                        .speak(t(TranslationTypes.EVENT_MAX_EXCEEDED))
                        .reprompt(t(TranslationTypes.HELP_MSG))
                        .getResponse();
                }
            }

            await RouteGenerate({
                url: ApiCallTypes.EVENT_LOCALIZED,
                data,
                onSuccess: (response: IResponseApiStructure[ApiCallTypes.EVENT_LOCALIZED]) => {
                    // If records exists
                    if (response.Items[0] !== null) {
                        // Slice the array to max 10 entries, because no pagination exists for this service
                        const events = cleanSssmlResponseFromInvalidChars(response.Items.map((event) => {
                            return event.Shortname;
                        }).join(", "), t);

                        responseSpeech.speechText = `<p>${events}.</p>`;
                        // If last page is reached, show a different prompt message
                        responseSpeech.promptText = t(data.pagenumber === response.TotalPages ? TranslationTypes.EVENT_MORE_INFO : TranslationTypes.EVENT_REPROMPT)

                        responseSpeech.speechText += `<p>${responseSpeech.promptText}</p>`;
                    }
                    else {
                        responseSpeech = {
                            speechText: t(TranslationTypes.NO_EVENTS_FOUND),
                            promptText: t(TranslationTypes.NO_EVENTS_FOUND),
                            status: HandlerResponseStatus.Failure
                        }
                    }
                },
                onError: (error) => {
                    console.error(error);
                    responseSpeech = {
                        speechText: t(TranslationTypes.ERROR_UNEXPECTED_MSG),
                        promptText: t(TranslationTypes.ERROR_UNEXPECTED_MSG),
                        status: HandlerResponseStatus.Failure
                    }
                }
            });
        }

        let response = handlerInput.responseBuilder
            .speak(responseSpeech.speechText);

        // Return also a prompt text if necessary
        if (responseSpeech.promptText) {
            response.reprompt(responseSpeech.promptText);
        }

        // Return the message to alexa
        return response.getResponse();
    }
}