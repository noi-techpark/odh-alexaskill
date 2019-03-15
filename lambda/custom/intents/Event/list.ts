import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { IsIntent, RouteGenerate, GetRequestAttributes, dateFormat, cleanSssmlResponseFromInvalidChars } from "../../lib/helpers";
import { RequestTypes, ApiCallTypes, TranslationTypes, HandlerResponseStatus, ApiUrl } from "../../lib/constants";
import { IResponseApiStructure, IHandlerResponse, IParamsApiStructure } from "../../interfaces";
// @ts-ignore no types available
import * as AmazonDateParser from "amazon-date-parser";
import { AlexaDeviceAddressClient } from "../../lib/AlexaDeviceAddressClient";

export const EventListHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return IsIntent(handlerInput, RequestTypes.Event);
    },
    async handle(handlerInput: HandlerInput): Promise<Response> {

        const { t, language } = GetRequestAttributes(handlerInput);
        //const { selectedMunicipality } = handlerInput.attributesManager.getSessionAttributes();

        const lang = language();

        let responseSpeech: IHandlerResponse = {
            speechText: t(TranslationTypes.ERROR_MSG),
            promptText: t(TranslationTypes.HELP_MSG),
            status: HandlerResponseStatus.Success
        };

        // get slots
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const periodSlot = requestAttributes.slots.period;
        const fromdateSlot = requestAttributes.slots.fromdate;
        const todateSlot = requestAttributes.slots.todate;
        const topicSlot = requestAttributes.slots.topic;
        const districtSlot = requestAttributes.slots.district;

        let fromdate: any;
        let todate: any;
        let fromdateSpeech: any;
        let todateSpeech: any;

        const page: number = 1;
        const limit: number = 5;

        let data: IParamsApiStructure[ApiCallTypes.EVENT_LOCALIZED] = {
            "language": lang,
            "pagenumber": page,
            "active": true,
            "pagesize": limit,
        };

        let municipality: IResponseApiStructure[ApiCallTypes.MUNICIPALITY_REDUCED][0];

        // If the user asked for a specific topic
        if (topicSlot.value !== "") {
            if (topicSlot.isMatch) {
                data.topicfilter = topicSlot.id;
            }
            else {
                responseSpeech = {
                    "speechText": t(TranslationTypes.ERROR_NO_TOPIC_FOUND),
                    "promptText": t(TranslationTypes.HELP_MSG),
                    "status": HandlerResponseStatus.Failure
                }
            }
        }

        // Previously multiple municipalities matched with the search pattern and user finally choosed one of them
        // if (selectedMunicipality === undefined) {
        // If the user want events from a specific district
        if (districtSlot.value !== "") {
            const districtParams: IParamsApiStructure[ApiCallTypes.DISTRICT_LOCALIZED] = {
                "language": lang,
                "elements": 0
            }
            let district_id: string = "";

            await RouteGenerate({
                host: ApiUrl,
                url: ApiCallTypes.DISTRICT_LOCALIZED,
                data: districtParams,
                onSuccess: (response: IResponseApiStructure[ApiCallTypes.DISTRICT_LOCALIZED]) => {
                    if (response.length) {
                        response = response.filter(district => {
                            return district.Detail.Title.toLowerCase().indexOf(districtSlot.value.toLowerCase()) !== -1;
                        });

                        // Districts found with the search term from the user
                        if (response.length === 1) {
                            district_id = response[0].MunicipalityId;
                        }
                        // When more than one record is found that matched the desired search pattern
                        else if (response.length > 1) {

                            // Reduce ids to unique entries
                            let municipalityId = [...new Set(response.map(x => {
                                return x.MunicipalityId
                            }))];

                            // When the multiple districts have the same municipality
                            if (municipalityId.length === 1) {
                                district_id = municipalityId[0];
                            }
                            else {
                                district_id = municipalityId[0];
                                // TODO: Improve location selection when more than one municipality matches with the search pattern

                                // Save ids of allowed municipalities
                                // handlerInput.attributesManager.setSessionAttributes({
                                //     allowedMunicipality: municipalityId,
                                //     eventSlots: requestAttributes
                                // });

                                // responseSpeech = {
                                //     "delegateIntent": "FindMunicipalityIntent",
                                //     "status": HandlerResponseStatus.Delegate
                                // }
                            }
                        }
                        else {
                            responseSpeech = {
                                "speechText": t(TranslationTypes.ERROR_NO_DISTRICTS_FOUND),
                                "promptText": t(TranslationTypes.HELP_MSG),
                                "status": HandlerResponseStatus.Failure
                            }
                        }
                    }
                    // No districts found
                    else {
                        responseSpeech = {
                            "speechText": t(TranslationTypes.ERROR_NO_DISTRICTS_FOUND),
                            "promptText": t(TranslationTypes.HELP_MSG),
                            "status": HandlerResponseStatus.Failure
                        }
                    }
                },
                onError: (error) => {
                    console.error(error);
                    responseSpeech = {
                        "speechText": t(TranslationTypes.ERROR_UNEXPECTED_MSG),
                        "promptText": t(TranslationTypes.HELP_MSG),
                        "status": HandlerResponseStatus.Failure
                    }
                }
            });

            // If a municipality was found
            if (district_id !== "") {
                await RouteGenerate({
                    host: ApiUrl,
                    url: ApiCallTypes.MUNICIPALITY_REDUCED,
                    data: districtParams,
                    onSuccess: (response: IResponseApiStructure[ApiCallTypes.MUNICIPALITY_REDUCED]) => {
                        if (response.length) {
                            response = response.filter(municipality => {
                                return municipality.Id === district_id;
                            });

                            // Municipality was matched with the previously selected district
                            if (response.length) {
                                municipality = response[0];

                                // Add the filter to the data params
                                data.locfilter = `mun${municipality.Id}`;
                            }
                            else {
                                responseSpeech = {
                                    "speechText": t(TranslationTypes.ERROR_NO_DISTRICTS_FOUND),
                                    "promptText": t(TranslationTypes.HELP_MSG),
                                    "status": HandlerResponseStatus.Failure
                                }
                            }
                        }
                        // No districts found
                        else {
                            responseSpeech = {
                                "speechText": t(TranslationTypes.ERROR_NO_DISTRICTS_FOUND),
                                "promptText": t(TranslationTypes.HELP_MSG),
                                "status": HandlerResponseStatus.Failure
                            }
                        }
                    },
                    onError: (error) => {
                        console.error(error);
                        responseSpeech = {
                            "speechText": t(TranslationTypes.ERROR_UNEXPECTED_MSG),
                            "promptText": t(TranslationTypes.HELP_MSG),
                            "status": HandlerResponseStatus.Failure
                        }
                    }
                });
            }

            // If an error occured when fetching the districts
            if (responseSpeech.status === HandlerResponseStatus.Failure) {
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
            else if (responseSpeech.status === HandlerResponseStatus.Delegate && responseSpeech.delegateIntent) {
                // TODO: Configure intent for selecting a specific municiapality
                // return handlerInput.responseBuilder
                //     .addElicitSlotDirective('municipality', {
                //         name: responseSpeech.delegateIntent,
                //         confirmationStatus: 'NONE',
                //         slots: {}
                //     })
                //     .speak(t(TranslationTypes.EVENT_MUNICIPALITY_CHOOSE))
                //     .getResponse();
            }
        }
        else {
            // Get the events by coordinates when no specific district was telled
            const accessToken = handlerInput.requestEnvelope.context.System.apiAccessToken;
            const deviceId = handlerInput.requestEnvelope.context.System.device.deviceId;
            const apiEndpoint = handlerInput.requestEnvelope.context.System.apiEndpoint;

            if (accessToken !== undefined) {
                const device = new AlexaDeviceAddressClient(apiEndpoint, deviceId, accessToken);
                const address = await device.getFullAddress();

                if (address.statusCode === HandlerResponseStatus.Success) {
                    data.latitude = address.response.lat;
                    data.longitude = address.response.lng;
                }
            }
        }

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

            // Save params for the following api call
            data.begindate = fromdate;
            data.enddate = todate;
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

            // Save params for the following api call
            data.begindate = fromdate;
            data.enddate = todate;
        }

        await RouteGenerate({
            host: ApiUrl,
            url: ApiCallTypes.EVENT_LOCALIZED,
            data,
            onSuccess: (response: IResponseApiStructure[ApiCallTypes.EVENT_LOCALIZED]) => {
                // If records exists
                if (response.Items[0] !== null && response.Items.length) {
                    // Get the names from the events
                    const events = cleanSssmlResponseFromInvalidChars(response.Items.map((event) => {
                        return event.Shortname;
                    }).join(", "), t);

                    if (data.begindate !== undefined || data.enddate !== undefined) {
                        // when no topic filter is selected
                        if (data.topicfilter !== undefined) {
                            // If from- and todate are the same
                            if (data.begindate === data.enddate) {
                                responseSpeech.speechText = `<p>${t(TranslationTypes.EVENT_MSG_SINGLE_DATE_WITH_TOPIC, { "date": todateSpeech, "topic": topicSlot.resolved })}</p>`;
                            }
                            else {
                                responseSpeech.speechText = `<p>${t(TranslationTypes.EVENT_MSG_MULTIPLE_DATES_WITH_TOPIC, { "fromdate": fromdateSpeech, "todate": todateSpeech, "topic": topicSlot.resolved })}</p>`;
                            }
                        }
                        else {
                            // If from- and todate are the same
                            if (data.begindate === data.enddate) {
                                responseSpeech.speechText = `<p>${t(TranslationTypes.EVENT_MSG_SINGLE_DATE, { "date": todateSpeech })}.</p>`;
                            }
                            else {
                                responseSpeech.speechText = `<p>${t(TranslationTypes.EVENT_MSG_MULTIPLE_DATES, { "fromdate": fromdateSpeech, "todate": todateSpeech })}.</p>`;
                            }
                        }
                    }
                    else if (data.topicfilter !== undefined) {
                        if (data.locfilter !== undefined) {
                            responseSpeech.speechText = `<p>${t(TranslationTypes.EVENT_TOPIC_WITH_MUNICIPALITY, { "topic": topicSlot.resolved, "municipality": municipality.Name })}</p>`;
                        }
                        else {
                            responseSpeech.speechText = `<p>${t(TranslationTypes.EVENT_TOPIC, { "topic": topicSlot.resolved })}</p>`;
                        }
                    }
                    else if (data.locfilter !== undefined) {
                        responseSpeech.speechText = `<p>${t(TranslationTypes.EVENT_LOCATION, { "municipality": municipality.Name })}</p>`;
                    }

                    // If the last page was reached, don't show the message that there are more events available    
                    if (data.pagenumber === response.TotalPages) {
                        responseSpeech.promptText = t(TranslationTypes.EVENT_MORE_INFO);
                    }
                    else {
                        responseSpeech.promptText = t(TranslationTypes.EVENT_REPROMPT);
                    }

                    responseSpeech.speechText += `<p>${events}.</p>`;
                    responseSpeech.speechText += `<p>${responseSpeech.promptText}</p>`;


                    // Save session for next request
                    handlerInput.attributesManager.setSessionAttributes({
                        event: {
                            "totalPages": response.TotalPages,
                            "params": data
                        }
                    });
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