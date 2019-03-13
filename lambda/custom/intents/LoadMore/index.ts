import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { IsIntent, GetRequestAttributes, RouteGenerate, cleanSssmlResponseFromInvalidChars, removeUnopenedPharmacies } from "../../lib/helpers";
import { RequestTypes, TranslationTypes, HandlerResponseStatus, ApiCallTypes } from "../../lib/constants";
import { IHandlerResponse, IParamsApiStructure, IResponseApiStructure } from "../../interfaces";

export const LoadMoreHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return IsIntent(handlerInput, RequestTypes.LoadMore);
    },
    async handle(handlerInput: HandlerInput): Promise<Response> {

        const { t } = GetRequestAttributes(handlerInput);
        const { event, pharmacy, gastronomy, shop } = handlerInput.attributesManager.getSessionAttributes();

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
        else if (shop !== undefined) {
            let data: IParamsApiStructure[ApiCallTypes.GASTRONOMY_LOCALIZED];

            // set data params from the old session
            data = shop.params;

            if (data.pagenumber) {
                // Get the next page
                data.pagenumber++;
                // Notify the user when no more events are available
                if (data.pagenumber > shop.totalPages) {
                    return handlerInput.responseBuilder
                        .speak(t(TranslationTypes.SHOP_MAX_EXCEEDED))
                        .reprompt(t(TranslationTypes.HELP_MSG))
                        .getResponse();
                }
            }

            await RouteGenerate({
                url: ApiCallTypes.POI_LOCALIZED,
                data,
                onSuccess: (response: IResponseApiStructure[ApiCallTypes.POI_LOCALIZED]) => {
                    // If records exists
                    if (response.Items[0] !== null) {
                        // Slice the array to max 10 entries, because no pagination exists for this service
                        const shops = cleanSssmlResponseFromInvalidChars(response.Items.map((shop) => {
                            return shop.Shortname;
                        }).join(", "), t);

                        responseSpeech.speechText = `<p>${shops}.</p>`;
                        // If last page is reached, show a different prompt message
                        responseSpeech.promptText = t(data.pagenumber === response.TotalPages ? TranslationTypes.SHOPS_MORE_INFO : TranslationTypes.SHOPS_REPROMPT)

                        responseSpeech.speechText += `<p>${responseSpeech.promptText}</p>`;
                    }
                    else {
                        responseSpeech = {
                            speechText: t(TranslationTypes.NO_SHOPS_FOUND),
                            promptText: t(TranslationTypes.NO_SHOPS_FOUND),
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
        else if (gastronomy !== undefined) {
            let data: IParamsApiStructure[ApiCallTypes.GASTRONOMY_LOCALIZED];

            // set data params from the old session
            data = gastronomy.params;

            if (data.pagenumber) {
                // Get the next page
                data.pagenumber++;
                // Notify the user when no more events are available
                if (data.pagenumber > gastronomy.totalPages) {
                    return handlerInput.responseBuilder
                        .speak(t(TranslationTypes.GASTRONOMY_MAX_EXCEEDED))
                        .reprompt(t(TranslationTypes.HELP_MSG))
                        .getResponse();
                }
            }

            await RouteGenerate({
                url: ApiCallTypes.GASTRONOMY_LOCALIZED,
                data,
                onSuccess: (response: IResponseApiStructure[ApiCallTypes.GASTRONOMY_LOCALIZED]) => {
                    // If records exists
                    if (response.Items[0] !== null) {
                        // Slice the array to max 10 entries, because no pagination exists for this service
                        const gastronomies = cleanSssmlResponseFromInvalidChars(response.Items.map((event) => {
                            return event.Shortname;
                        }).join(", "), t);

                        responseSpeech.speechText = `<p>${gastronomies}.</p>`;
                        // If last page is reached, show a different prompt message
                        responseSpeech.promptText = t(data.pagenumber === response.TotalPages ? TranslationTypes.GASTRONOMY_MORE_INFO : TranslationTypes.GASTRONOMY_REPROMPT)

                        responseSpeech.speechText += `<p>${responseSpeech.promptText}</p>`;
                    }
                    else {
                        responseSpeech = {
                            speechText: t(TranslationTypes.NO_GASTRONOMY_FOUND),
                            promptText: t(TranslationTypes.NO_GASTRONOMY_FOUND),
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
        else if (pharmacy !== undefined) {

            if (pharmacy.pagenumber) {
                // Get the next page
                pharmacy.pagenumber++;
                // Notify the user when no more events are available
                if (pharmacy.pagenumber > pharmacy.totalPages) {
                    return handlerInput.responseBuilder
                        .speak(t(TranslationTypes.PHARMACY_MAX_EXCEEDED))
                        .reprompt(t(TranslationTypes.HELP_MSG))
                        .getResponse();
                }
            }

            await RouteGenerate({
                url: ApiCallTypes.POI_LOCALIZED,
                data: pharmacy.data,
                onSuccess: (response: IResponseApiStructure[ApiCallTypes.POI_LOCALIZED]) => {
                    // If records exists
                    if (response.Items[0] !== null) {
                        if (pharmacy.fromdate !== undefined || pharmacy.todate !== undefined) {
                            response = removeUnopenedPharmacies(response, new Date(pharmacy.fromdate), new Date(pharmacy.todate));
                        }
                        // Create fake pagination
                        const pharmacies = cleanSssmlResponseFromInvalidChars(response.Items.map((event: any) => {
                            return event.Shortname;
                        }).splice((pharmacy.pagenumber - 1) * pharmacy.pagesize, pharmacy.pagenumber * pharmacy.pagesize).join(", "), t);

                        responseSpeech.speechText = `<p>${pharmacies}.</p>`;

                        // If last page is reached, show a different prompt message
                        responseSpeech.promptText = t(pharmacy.pagenumber === pharmacy.totalPages ? TranslationTypes.PHARMACY_MORE_INFO : TranslationTypes.PHARMACY_REPROMPT)

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

        let response = handlerInput.responseBuilder;

        if (responseSpeech.speechText) {
            response.speak(responseSpeech.speechText);
        }
        // Return also a prompt text if necessary
        if (responseSpeech.promptText) {
            response.reprompt(responseSpeech.promptText);
        }

        // Return the message to alexa
        return response.getResponse();
    }
}