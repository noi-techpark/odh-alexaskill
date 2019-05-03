import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { IsIntent, GetRequestAttributes, RouteGenerate, cleanSssmlResponseFromInvalidChars, removeOldPharmacySchedule, dateFormat } from "../../lib/helpers";
import { RequestTypes, TranslationTypes, HandlerResponseStatus, ApiCallTypes, WeekDaysMapping, ApiUrl } from "../../lib/constants";
import { IHandlerResponse, IParamsApiStructure, IResponseApiStructure } from "../../interfaces";

export const PharmacyDetailHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return IsIntent(handlerInput, RequestTypes.PharmacyDetail);
    },
    async handle(handlerInput: HandlerInput): Promise<Response> {

        const { t, language } = GetRequestAttributes(handlerInput);

        const lang = language();

        let responseSpeech: IHandlerResponse = {
            speechText: t(TranslationTypes.ERROR_MSG),
            promptText: t(TranslationTypes.HELP_MSG),
            status: HandlerResponseStatus.Success
        };

        let data: IParamsApiStructure[ApiCallTypes.POI_LOCALIZED] = {
            "language": lang,
            "poitype": "1",
            "subtype": "1",
            "pagenumber": 1,
            "active": true,
            "pagesize": 99999,
        };

        // get slots
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const query = requestAttributes.slots.query;

        if (query.value !== "") {
            await RouteGenerate({
                host: ApiUrl,
                url: ApiCallTypes.POI_LOCALIZED,
                data,
                auth: true,
                onSuccess: (response: IResponseApiStructure[ApiCallTypes.POI_LOCALIZED]) => {
                    // If records exists
                    if (response.Items[0] !== null && response.Items.length) {
                        response.Items = response.Items.filter(pharmacy => {
                            if (pharmacy.Shortname !== null) {
                                return pharmacy.Shortname.toLowerCase().indexOf(query.value.toLowerCase()) !== -1;
                            }
                            return false;
                        });

                        response = removeOldPharmacySchedule(response)
                        console.log("debugt" + JSON.stringify(response))

                        if (response.Items.length > 1) {
                            responseSpeech = {
                                speechText: t(TranslationTypes.TOO_MANY_PHARMACIES_FOUND, { "count": response.Items.length }),
                                promptText: t(TranslationTypes.TOO_MANY_PHARMACIES_FOUND, { "count": response.Items.length }),
                                status: HandlerResponseStatus.Failure
                            }
                        }
                        else if (response.Items.length === 1) {
                            const pharmacy = response.Items[0];

                            if (pharmacy.ContactInfos.Address !== null && pharmacy.ContactInfos.ZipCode !== null && pharmacy.ContactInfos.City) {
                                responseSpeech.speechText = t(TranslationTypes.PHARMACY_DETAIL_LOCATION, {
                                    "pharmacy": pharmacy.Detail.Title,
                                    "address": pharmacy.ContactInfos.Address,
                                    "zipCode": pharmacy.ContactInfos.ZipCode,
                                    "city": pharmacy.ContactInfos.City
                                });
                            }

                            if (pharmacy.OperationSchedule !== null && pharmacy.OperationSchedule.length) {

                                let fromdateSpeech: string;
                                let todateSpeech: string;

                                pharmacy.OperationSchedule.forEach(schedule => {
                                    if (schedule.OpeningTimes !== undefined) {
                                        fromdateSpeech = dateFormat({
                                            date: schedule.Start,
                                            lang,
                                            format: "dddd, DD MMMM"
                                        });

                                        todateSpeech = dateFormat({
                                            date: schedule.Stop,
                                            lang,
                                            format: "dddd, DD MMMM YYYY"
                                        });

                                        responseSpeech.speechText += t(TranslationTypes.PHARMACY_DETAIL_OPENING, {
                                            "fromdate": fromdateSpeech,
                                            "todate": todateSpeech
                                        });

                                        let openingKeys = Object.keys(schedule.OpeningTimes);
                                        console.log("Response" + JSON.stringify(openingKeys))

                                        openingKeys.forEach(x => {
                                            const daysFullName: Array<string> = [];
                                            const periodsHours: Array<string> = [];

                                            // Get localized weekday names
                                            schedule.OpeningTimes[x].days.forEach(day => {
                                                const dayName = WeekDaysMapping[lang][day];
                                                if (dayName !== undefined) {
                                                    daysFullName.push(dayName);
                                                }
                                            });

                                            schedule.OpeningTimes[x].periods.forEach(period => {
                                                const from = dateFormat({
                                                    date: period.start,
                                                    lang,
                                                    format: "HH:mm"
                                                });
                                                const to = dateFormat({
                                                    date: period.end,
                                                    lang,
                                                    format: "HH:mm"
                                                });

                                                periodsHours.push(t(TranslationTypes.PHARMACY_DETAIL_OPENING_TIMES, {
                                                    from,
                                                    to
                                                }));
                                            });

                                            responseSpeech.speechText += daysFullName.join(', ');
                                            responseSpeech.speechText += periodsHours.join(', ').replace(/, ([^,]*)$/, ` ${t(TranslationTypes.AND_MSG)} $1`) + ".";
                                        });

                                    }
                                });
                            }
                            else {
                                responseSpeech.speechText += t(TranslationTypes.PHARMACY_NO_OPENING_TIMES_AVAILABLE);
                            }

                            // Clean output
                            if (responseSpeech.speechText !== undefined) {
                                responseSpeech.speechText = cleanSssmlResponseFromInvalidChars(responseSpeech.speechText, t)
                            }

                            responseSpeech.promptText = responseSpeech.speechText;
                            responseSpeech.status = HandlerResponseStatus.Success;
                        }
                        else {
                            responseSpeech = {
                                speechText: t(TranslationTypes.NO_PHARMACIES_FOUND),
                                promptText: t(TranslationTypes.NO_PHARMACIES_FOUND),
                                status: HandlerResponseStatus.Failure
                            }
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