import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { IsIntent, RouteGenerate, GetRequestAttributes, cleanSssmlResponseFromInvalidChars } from "../../lib/helpers";
import { RequestTypes, ApiCallTypes, TranslationTypes, HandlerResponseStatus } from "../../lib/constants";
import { IResponseApiStructure, IHandlerResponse, IParamsApiStructure } from "../../interfaces";
// @ts-ignore no types available
import * as AmazonDateParser from "amazon-date-parser";

export const ShopListHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return IsIntent(handlerInput, RequestTypes.Shop);
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
        const poiTypeSlot = requestAttributes.slots.poiType;
        const districtSlot = requestAttributes.slots.district;

        // let fromdate: any;
        // let todate: any;
        // let fromdateSpeech: any;
        // let todateSpeech: any;

        const page: number = 1;
        const limit: number = 5;

        let data: IParamsApiStructure[ApiCallTypes.POI_LOCALIZED] = {
            "language": lang,
            // Shops
            "poitype": "2",
            "pagenumber": page,
            "active": true,
            "pagesize": limit,
        };

        let municipality: IResponseApiStructure[ApiCallTypes.MUNICIPALITY_REDUCED][0];

        console.log(JSON.stringify(poiTypeSlot));
        // If the user asked for a specific subtype
        if (poiTypeSlot.value !== "") {
            if (poiTypeSlot.isMatch) {
                data.subtype = poiTypeSlot.id;
            }
            else {
                responseSpeech = {
                    "speechText": t(TranslationTypes.ERROR_NO_POITYPE_FOUND),
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
        // }
        // else {
        //     data.locfilter = `mun${selectedMunicipality.Id}`;
        //     municipality = selectedMunicipality;
        // }

        // Disable period slots until api natively supports to filter shops by opening time
        if (periodSlot.value !== "" || (fromdateSlot.value !== "" && todateSlot.value !== "")) {
            // Return the message to alexa
            return handlerInput.responseBuilder
                .speak(t(TranslationTypes.ERROR_MSG))
                .reprompt(t(TranslationTypes.HELP_MSG))
                .getResponse();
        }
        // if (periodSlot.value !== "") {
        //     // parse the amazon date to a valid date range
        //     const awsDate = AmazonDateParser(periodSlot.value);

        //     fromdate = dateFormat({
        //         date: awsDate.startDate,
        //         lang
        //     });
        //     todate = dateFormat({
        //         date: awsDate.endDate,
        //         lang
        //     });
        //     fromdateSpeech = dateFormat({
        //         date: awsDate.startDate,
        //         lang,
        //         format: "dddd, DD MMMM"
        //     });
        //     todateSpeech = dateFormat({
        //         date: awsDate.endDate,
        //         lang,
        //         format: "dddd, DD MMMM YYYY"
        //     });

        //     // Save params for the following api call
        //     data.begindate = fromdate;
        //     data.enddate = todate;
        // }
        // // get the events that are in a certain period of time
        // else if (fromdateSlot.value !== "" && todateSlot.value !== "") {
        //     fromdate = fromdateSlot.value;
        //     todate = todateSlot.value;

        //     // parse the date
        //     fromdateSpeech = dateFormat({
        //         date: fromdateSlot.value,
        //         lang,
        //         format: "dddd, DD MMMM"
        //     });
        //     todateSpeech = dateFormat({
        //         date: todateSlot.value,
        //         lang,
        //         format: "dddd, DD MMMM YYYY"
        //     });

        //     // Save params for the following api call
        //     data.begindate = fromdate;
        //     data.enddate = todate;
        // }

        await RouteGenerate({
            url: ApiCallTypes.POI_LOCALIZED,
            data,
            onSuccess: (response: IResponseApiStructure[ApiCallTypes.POI_LOCALIZED]) => {
                // If records exists
                if (response.Items[0] !== null && response.Items.length) {
                    // Get the names from the events
                    const events = cleanSssmlResponseFromInvalidChars(response.Items.map((event) => {
                        return event.Shortname;
                    }).join(", "), t);

                    // if (data.begindate !== undefined || data.enddate !== undefined) {
                    //     // when no topic filter is selected
                    //     if (data.topicfilter !== undefined) {
                    //         // If from- and todate are the same
                    //         if (data.begindate === data.enddate) {
                    //             responseSpeech.speechText = `<p>${t(TranslationTypes.EVENT_MSG_SINGLE_DATE_WITH_TOPIC, { "date": todateSpeech, "topic": topicSlot.resolved })}</p>`;
                    //         }
                    //         else {
                    //             responseSpeech.speechText = `<p>${t(TranslationTypes.EVENT_MSG_MULTIPLE_DATES_WITH_TOPIC, { "fromdate": fromdateSpeech, "todate": todateSpeech, "topic": topicSlot.resolved })}</p>`;
                    //         }
                    //     }
                    //     else {
                    //         // If from- and todate are the same
                    //         if (data.begindate === data.enddate) {
                    //             responseSpeech.speechText = `<p>${t(TranslationTypes.EVENT_MSG_SINGLE_DATE, { "date": todateSpeech })}.</p>`;
                    //         }
                    //         else {
                    //             responseSpeech.speechText = `<p>${t(TranslationTypes.EVENT_MSG_MULTIPLE_DATES, { "fromdate": fromdateSpeech, "todate": todateSpeech })}.</p>`;
                    //         }
                    //     }
                    // }
                    // else if (data.topicfilter !== undefined) {
                    //     if (data.locfilter !== undefined) {
                    //         responseSpeech.speechText = `<p>${t(TranslationTypes.EVENT_TOPIC_WITH_MUNICIPALITY, { "topic": topicSlot.resolved, "municipality": municipality.Name })}</p>`;
                    //     }
                    //     else {
                    //         responseSpeech.speechText = `<p>${t(TranslationTypes.EVENT_TOPIC, { "topic": topicSlot.resolved })}</p>`;
                    //     }
                    // }
                    if (data.locfilter !== undefined) {
                        if (data.subtype !== undefined) {
                            responseSpeech.speechText = `<p>${t(TranslationTypes.SHOPS_LOCATON_WITH_SUBTYPE, { "municipality": municipality.Name, "type": poiTypeSlot.resolved })}</p>`;
                        }
                        else {
                            responseSpeech.speechText = `<p>${t(TranslationTypes.SHOPS_LOCATION, { "municipality": municipality.Name })}</p>`;
                        }
                    }
                    else if (data.subtype !== undefined) {
                        responseSpeech.speechText = `<p>${t(TranslationTypes.SHOPS_SUBTYPE, { "type": poiTypeSlot.resolved })}</p>`;
                    }

                    // If the last page was reached, don't show the message that there are more events available    
                    if (data.pagenumber === response.TotalPages) {
                        responseSpeech.promptText = t(TranslationTypes.SHOPS_MORE_INFO);
                    }
                    else {
                        responseSpeech.promptText = t(TranslationTypes.SHOPS_REPROMPT);
                    }

                    responseSpeech.speechText += `<p>${events}.</p>`;
                    responseSpeech.speechText += `<p>${responseSpeech.promptText}</p>`;


                    // Save session for next request
                    handlerInput.attributesManager.setSessionAttributes({
                        shop: {
                            "totalPages": response.TotalPages,
                            "params": data
                        }
                    });
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