import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { IsIntent, RouteGenerate, GetRequestAttributes, dateFormat, cleanSssmlResponseFromInvalidChars } from "../../lib/helpers";
import { RequestTypes, ApiCallTypes, TranslationTypes, HandlerResponseStatus } from "../../lib/constants";
import { IResponseApiStructure, IHandlerResponse, IParamsApiStructure } from "../../interfaces";
// @ts-ignore no types available
import * as AmazonDateParser from "amazon-date-parser";

export const EventHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return IsIntent(handlerInput, RequestTypes.Event);
    },
    async handle(handlerInput: HandlerInput): Promise<Response> {

        const { t, language } = GetRequestAttributes(handlerInput);
        const lang = language();

        let responseSpeech: IHandlerResponse = {
            speechText: t(TranslationTypes.HELP_MSG),
            promptText: t(TranslationTypes.EVENT_REPROMPT),
            status: HandlerResponseStatus.Success
        };

        // get slots
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const periodSlot = requestAttributes.slots.period;
        const fromdateSlot = requestAttributes.slots.fromdate;
        const todateSlot = requestAttributes.slots.todate;

        let fromdate: any;
        let todate: any;
        let fromdateSpeech: any;
        let todateSpeech: any;

        const page: number = 1;
        const limit: number = 10;

        if (periodSlot.value !== "") {
            // parse the amazon date to a valid date range
            const awsDate = AmazonDateParser(periodSlot.value);

            fromdate = dateFormat({
                date: awsDate.startDate,
                lang
            });
            todate = dateFormat({
                date: awsDate.endDate,
                lang
            });
            fromdateSpeech = dateFormat({
                date: awsDate.startDate,
                lang,
                format: "dddd, DD MMMM"
            });
            todateSpeech = dateFormat({
                date: awsDate.endDate,
                lang,
                format: "dddd, DD MMMM YYYY"
            });
        }
        // get the events that are in a certain period of time
        else if (fromdateSlot.value !== "" && todateSlot.value !== "") {
            fromdate = fromdateSlot.value;
            todate = todateSlot.value;

            // parse the date
            fromdateSpeech = dateFormat({
                date: fromdateSlot.value,
                lang,
                format: "dddd, DD MMMM"
            });
            todateSpeech = dateFormat({
                date: todateSlot.value,
                lang,
                format: "dddd, DD MMMM YYYY"
            });
        }
        else {
            return handlerInput.responseBuilder
                .speak("no date passed")
                .reprompt("no date passed")
                .getResponse();
        }

        // data params for the api call
        let data: IParamsApiStructure[ApiCallTypes.EVENT_LOCALIZED] = {
            "begindate": fromdate,
            "enddate": todate,
            "language": lang,
            "pagenumber": page,
            "pagesize": limit,
        };

        await RouteGenerate({
            url: ApiCallTypes.EVENT_LOCALIZED,
            data,
            onSuccess: (response: IResponseApiStructure[ApiCallTypes.EVENT_LOCALIZED]) => {
                // If records exists
                if (response.Items[0] !== null) {
                    // Get the names from the events
                    const events = cleanSssmlResponseFromInvalidChars(response.Items.map((event) => {
                        return event.Shortname;
                    }).join(", "), t);

                    let msg;
                    // If from- and todate are the same
                    if (data.begindate === data.enddate) {
                        msg = `<p>${t(TranslationTypes.EVENT_MSG_SINGLE_DATE, todateSpeech, events)}.</p>`;
                    }
                    else {
                        msg = `<p>${t(TranslationTypes.EVENT_MSG_MULTIPLE_DATES, fromdateSpeech, todateSpeech, events)}.</p>`;
                    }

                    // If the last page was reached, don't show the message that there are more events available    
                    if (data.pagenumber === response.TotalPages) {
                        responseSpeech.promptText = t(TranslationTypes.EVENT_MORE_INFO);
                    }

                    msg += `<p>${responseSpeech.promptText}</p>`;

                    responseSpeech.speechText = msg;

                    // If the response is successful, save the session attributes for the next request
                    if (responseSpeech.status = HandlerResponseStatus.Success) {

                        // Save session for next request
                        handlerInput.attributesManager.setSessionAttributes({
                            event: {
                                "totalPages": response.TotalPages,
                                "params": data
                            }
                        });
                    }
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