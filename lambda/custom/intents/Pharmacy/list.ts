import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { IsIntent, RouteGenerate, GetRequestAttributes, dateFormat, cleanSssmlResponseFromInvalidChars, removeUnopenedPharmacies } from "../../lib/helpers";
import { RequestTypes, ApiCallTypes, TranslationTypes, HandlerResponseStatus, ApiUrl } from "../../lib/constants";
import { IResponseApiStructure, IHandlerResponse, IParamsApiStructure } from "../../interfaces";
// @ts-ignore no types available
import * as AmazonDateParser from "amazon-date-parser";
import { AlexaDeviceAddressClient } from "../../lib/AlexaDeviceAddressClient";

export const PharmacyListHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return IsIntent(handlerInput, RequestTypes.Pharmacy);
    },
    async handle(handlerInput: HandlerInput): Promise<Response> {

        const { t, language } = GetRequestAttributes(handlerInput);

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
        const districtSlot = requestAttributes.slots.district;

        let fromdate: any;
        let todate: any;
        let fromdateSpeech: any;
        let todateSpeech: any;

        const page: number = 1;
        const limit: number = 99999;

        // Poitype 1 are the pharmacies
        let data: IParamsApiStructure[ApiCallTypes.POI_LOCALIZED] = {
            "language": lang,
            "poitype": "1",
            "subtype": "1",
            "pagenumber": page,
            "active": true,
            "pagesize": limit,
        };

        // Create fake pagination due to no native api support for getting pharmacies that have opened in a certain range
        const pagenumber: number = 1;
        const pagesize: number = 5;

        let municipality: IResponseApiStructure[ApiCallTypes.MUNICIPALITY_REDUCED][0];

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
                // TODO:
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

        await RouteGenerate({
            host: ApiUrl,
            url: ApiCallTypes.POI_LOCALIZED,
            data,
            onSuccess: (response: IResponseApiStructure[ApiCallTypes.POI_LOCALIZED]) => {
                // If records exists
                if (response.Items[0] !== null && response.Items.length) {
                    if (fromdate !== undefined || todate !== undefined) {
                        response = removeUnopenedPharmacies(response, new Date(fromdate), new Date(todate));
                        if (response.Items.length) {
                            // If from- and todate are the same
                            if (fromdate === todate) {
                                responseSpeech.speechText = `<p>${t(TranslationTypes.PHARMACY_MSG_SINGLE_DATE, { "date": todateSpeech })}</p>`;
                            }
                            else {
                                responseSpeech.speechText = `<p>${t(TranslationTypes.PHARMACY_MSG_MULTIPLE_DATES, { "fromdate": fromdateSpeech, "todate": todateSpeech })}</p>`;
                            }
                        }
                        else {
                            responseSpeech = {
                                speechText: t(TranslationTypes.NO_PHARMACIES_FOUND),
                                promptText: t(TranslationTypes.NO_PHARMACIES_FOUND),
                                status: HandlerResponseStatus.Failure
                            }
                        }
                    }
                    else if (data.locfilter !== undefined) {
                        responseSpeech.speechText = `<p>${t(TranslationTypes.PHARMACY_LOCATION, { "municipality": municipality.Name })}</p>`;
                    }
                    else{
                        responseSpeech.speechText = `<p>${t(TranslationTypes.PHARMACY_GENERAL)}</p>`;
                    }

                    if (responseSpeech.status === HandlerResponseStatus.Success) {
                        // When more than one page exists, don't show the message that there are more pharmacies available    
                        if ((response.Items.length / pagesize) < pagenumber) {
                            responseSpeech.promptText = t(TranslationTypes.PHARMACY_MORE_INFO);
                        }
                        else {
                            responseSpeech.promptText = t(TranslationTypes.PHARMACY_REPROMPT);
                        }

                        // Create fake pagination
                        const pharmacies = cleanSssmlResponseFromInvalidChars(response.Items.map((event) => {
                            return event.Shortname;
                        }).splice((pagenumber - 1) * pagesize, pagenumber * pagesize).join(", "), t);

                        responseSpeech.speechText += `<p>${pharmacies}.</p>`;
                        responseSpeech.speechText += `<p>${responseSpeech.promptText}</p>`;

                        // Save session for next request
                        // Create fake pagination due to no native support
                        handlerInput.attributesManager.setSessionAttributes({
                            pharmacy: {
                                "totalPages": Math.ceil(response.Items.length / pagesize),
                                "pagenumber": pagenumber,
                                "pagesize": pagesize,
                                "data": data,
                                fromdate,
                                todate
                            }
                        });
                    }

                }
                else {
                    responseSpeech = {
                        speechText: t(TranslationTypes.NO_PHARMACIES_FOUND),
                        promptText: t(TranslationTypes.NO_PHARMACIES_FOUND),
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