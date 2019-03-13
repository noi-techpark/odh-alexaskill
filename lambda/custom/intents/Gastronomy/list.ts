import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { IsIntent, RouteGenerate, GetRequestAttributes, cleanSssmlResponseFromInvalidChars } from "../../lib/helpers";
import { RequestTypes, ApiCallTypes, TranslationTypes, HandlerResponseStatus, GastronomyType } from "../../lib/constants";
import { IResponseApiStructure, IHandlerResponse, IParamsApiStructure } from "../../interfaces";
// @ts-ignore no types available
import * as AmazonDateParser from "amazon-date-parser";

export const GastronomyListHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return IsIntent(handlerInput, RequestTypes.GastronomyList);
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
        const gastronomyTypeSlot = requestAttributes.slots.gastronomyType;
        const ceremonyTypeSlot = requestAttributes.slots.ceremonyType;
        const districtSlot = requestAttributes.slots.district;

        const page: number = 1;
        const limit: number = 5;

        let data: IParamsApiStructure[ApiCallTypes.GASTRONOMY_LOCALIZED] = {
            "language": lang,
            "pagenumber": page,
            // Get only restaurants
            "categorycodefilter": 1,
            "active": true,
            "pagesize": limit,
        };

        let municipality: IResponseApiStructure[ApiCallTypes.MUNICIPALITY_REDUCED][0];

        if (gastronomyTypeSlot.value !== "") {
            if (gastronomyTypeSlot.isMatch) {
                const gastronomyType = gastronomyTypeSlot.id.split("_");
                // First entry is the filter type and second one is the identifier for the gastronomy type
                if (gastronomyType.length === 2) {
                    switch (gastronomyType[0]) {
                        case GastronomyType.FACILITY_CODE:
                            data.facilitycodefilter = gastronomyType[1];
                            break;
                        case GastronomyType.CUISINE_CODE:
                            data.cuisinecodefilter = gastronomyType[1];
                            break;
                    }
                }
                else {
                    return handlerInput.responseBuilder
                        .speak(t(TranslationTypes.GASTRONOMY_NO_KITCHENTYPE_FOUND))
                        .reprompt(t(TranslationTypes.HELP_MSG))
                        .getResponse();
                }
            }
            else {
                return handlerInput.responseBuilder
                    .speak(t(TranslationTypes.GASTRONOMY_NO_KITCHENTYPE_FOUND))
                    .reprompt(t(TranslationTypes.HELP_MSG))
                    .getResponse();
            }
        }

        if (ceremonyTypeSlot.value !== "") {
            if (ceremonyTypeSlot.isMatch) {
                data.ceremonycodefilter = ceremonyTypeSlot.id;
            }
            else {
                return handlerInput.responseBuilder
                    .speak(t(TranslationTypes.GASTRONOMY_NO_KITCHENTYPE_FOUND))
                    .reprompt(t(TranslationTypes.HELP_MSG))
                    .getResponse();
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

        await RouteGenerate({
            url: ApiCallTypes.GASTRONOMY_LOCALIZED,
            data,
            onSuccess: (response: IResponseApiStructure[ApiCallTypes.GASTRONOMY_LOCALIZED]) => {
                // If records exists
                if (response.Items[0] !== null && response.Items.length) {
                    // Get the names from the events
                    const gastronomies = cleanSssmlResponseFromInvalidChars(response.Items.map((event) => {
                        return event.Shortname;
                    }).join(", "), t);

                    if (data.cuisinecodefilter !== undefined || data.facilitycodefilter !== undefined) {
                        console.log("Type"+ JSON.stringify(gastronomyTypeSlot));
                        console.log("municipality"+ JSON.stringify(municipality));
                        console.log("ceremonyTypeSlot"+ JSON.stringify(ceremonyTypeSlot));
                        if (data.locfilter !== undefined && data.ceremonycodefilter !== undefined) {
                            responseSpeech.speechText = `<p>${t(TranslationTypes.GASTRONOMY_TYPE_WITH_MUNICIPALITY_AND_CEREMONY, { "type": gastronomyTypeSlot.resolved, "municipality": municipality.Name,  "ceremony": ceremonyTypeSlot.resolved })}</p>`;
                        }
                        else if (data.locfilter !== undefined) {
                            responseSpeech.speechText = `<p>${t(TranslationTypes.GASTRONOMY_TYPE_WITH_MUNICIPALITY, { "type": gastronomyTypeSlot.resolved, "municipality": municipality.Name })}</p>`;
                        }
                        else if (data.ceremonycodefilter !== undefined) {
                            responseSpeech.speechText = `<p>${t(TranslationTypes.GASTRONOMY_TYPE_WITH_CEREMONY, { "type": gastronomyTypeSlot.resolved, "ceremony": ceremonyTypeSlot.resolved })}</p>`;
                        }
                        else {
                            responseSpeech.speechText = `<p>${t(TranslationTypes.GASTRONOMY_KITCHENTYPE, { "type": gastronomyTypeSlot.resolved })}</p>`;
                        }
                    }
                    else if (data.locfilter !== undefined) {
                        responseSpeech.speechText = `<p>${t(TranslationTypes.GASTRONOMY_LOCATION, { "municipality": municipality.Name })}</p>`;
                    }
                    else if (data.ceremonycodefilter !== undefined) {
                        responseSpeech.speechText = `<p>${t(TranslationTypes.GASTRONOMY_CEREMONY, { "ceremony": ceremonyTypeSlot.resolved })}</p>`;
                    }

                    // If the last page was reached, don't show the message that there are more gastronomies available    
                    if (data.pagenumber === response.TotalPages) {
                        responseSpeech.promptText = t(TranslationTypes.GASTRONOMY_MORE_INFO);
                    }
                    else {
                        responseSpeech.promptText = t(TranslationTypes.GASTRONOMY_REPROMPT);
                    }

                    responseSpeech.speechText += `<p>${gastronomies}.</p>`;
                    responseSpeech.speechText += `<p>${responseSpeech.promptText}</p>`;


                    // Save session for next request
                    handlerInput.attributesManager.setSessionAttributes({
                        gastronomy: {
                            "totalPages": response.TotalPages,
                            "params": data
                        }
                    });
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