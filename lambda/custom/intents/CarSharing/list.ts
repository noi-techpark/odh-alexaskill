import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { IsIntent, GetRequestAttributes, RouteGenerate, asyncForEach } from "../../lib/helpers";
import { RequestTypes, TranslationTypes, HandlerResponseStatus, ApiCallTypes, ApiUrlChannel, ApiUrlGeoReverse } from "../../lib/constants";
import { IHandlerResponse, IResponseApiStructure } from "../../interfaces";
// @ts-ignore no types available
import * as AmazonDateParser from "amazon-date-parser";
import { AlexaDeviceAddressClient } from "../../lib/AlexaDeviceAddressClient";
import { NominatimJS } from "nominatim-js";
// @ts-ignore no types available
import * as sortByDistance from "sort-by-distance";


export const CarSharingListHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return IsIntent(handlerInput, RequestTypes.CarSharingList);
    },
    async handle(handlerInput: HandlerInput): Promise<Response> {

        const { t, language } = GetRequestAttributes(handlerInput);

        const lang = language();

        let responseSpeech: IHandlerResponse = {
            speechText: t(TranslationTypes.ERROR_MSG),
            promptText: t(TranslationTypes.HELP_MSG),
            status: HandlerResponseStatus.Success
        };

        interface IData {
            "pagenumber": number,
            "pagesize": number,
            "latitude"?: number,
            "longitude"?: number
        }

        let data: IData = {
            "pagenumber": 1,
            "pagesize": 5
        };

        // get slots
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const citySlot = requestAttributes.slots.city;

        // If the user want events from a specific district
        if (citySlot.value !== "") {

            // Get the coordinates from the entered location
            let geoLocation = await NominatimJS.search({
                q: `${citySlot.value} Alto Adige Italien`
            });

            // Valid coordinates were found
            if (geoLocation.length) {
                data.latitude = parseFloat(geoLocation[0].lat);
                // @ts-ignore
                data.longitude = parseFloat(geoLocation[0].lon);
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
                    data.latitude = parseFloat(address.response.lat);
                    data.longitude = parseFloat(address.response.lng);
                }
            }
        }

        await RouteGenerate({
            "host": ApiUrlChannel,
            "url": ApiCallTypes.CAR_STATIONS,
            onSuccess: async (response: IResponseApiStructure[ApiCallTypes.CAR_STATIONS]) => {
                // If records exists
                if (response.length) {

                    const totalPages: number = response.length;

                    const opts = {
                        yName: 'latitude',
                        xName: 'longitude'
                    }

                    const origin = {
                        "latitude": data.latitude,
                        "longitude": data.longitude
                    }

                    response = sortByDistance(origin, response, opts).splice((data.pagenumber - 1) * data.pagesize, data.pagenumber * data.pagesize);

                    responseSpeech.speechText = t(TranslationTypes.CARSHARING_GENERAL);
                    responseSpeech.promptText = t(TranslationTypes.CARSHARING_REPROMPT);

                    await asyncForEach(response, async (carShare: any) => {
                        // Resolve coordinates to real address name
                        await RouteGenerate({
                            "host": ApiUrlGeoReverse,
                            "url": ApiCallTypes.REVERSE_GEOCODING,
                            "data": {
                                "format": "geojson",
                                "lat": carShare.latitude,
                                "lon": carShare.longitude,
                                "accept-language": lang
                            },
                            onSuccess: (response: IResponseApiStructure[ApiCallTypes.REVERSE_GEOCODING]) => {
                                if (response.features.length) {
                                    if(response.features[0].properties.address.city){
                                        carShare.municipality = response.features[0].properties.address.city;
                                    }
                                    else if(response.features[0].properties.address.village){
                                        carShare.municipality = response.features[0].properties.address.village;
                                    }
                                    else if(response.features[0].properties.address.town){
                                        carShare.municipality = response.features[0].properties.address.town;
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
                        // If car is available
                        if (carShare.availableVehicles > 1) {
                            responseSpeech.speechText += t(TranslationTypes.CARSHARING_MULTIPLE_AVAILABLE_VEHICLES, {
                                "name": carShare.name,
                                "municipality": carShare.municipality,
                                "availableVehicels": carShare.availableVehicles
                            });
                        }
                        else if (carShare.availableVehicles === 1) {
                            responseSpeech.speechText += t(TranslationTypes.CARSHARING_SINGLE_AVAILABLE_VEHICLES, {
                                "name": carShare.name,
                                "municipality": carShare.municipality,
                                "availableVehicels": carShare.availableVehicles
                            });
                        }
                        else {
                            responseSpeech.speechText += t(TranslationTypes.CARSHARING_NO_AVAILABLE_VEHICLES, {
                                "name": carShare.name,
                                "municipality": carShare.municipality
                            })
                        }
                    });

                    // Display prompt message only when more car stations are available
                    if (data.pagenumber < totalPages) {
                        responseSpeech.speechText += `<p>${responseSpeech.promptText}</p>`;
                    }

                    responseSpeech.status = HandlerResponseStatus.Success;

                    // Save session for next request
                    handlerInput.attributesManager.setSessionAttributes({
                        carSharing: {
                            "totalPages": totalPages,
                            "params": data
                        }
                    });
                }
                else {
                    responseSpeech = {
                        speechText: t(TranslationTypes.NO_CARSHARING_FOUND),
                        promptText: t(TranslationTypes.NO_CARSHARING_FOUND),
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