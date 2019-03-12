import { HandlerInput } from "ask-sdk-core";
import { IntentRequest, services } from "ask-sdk-model";
import { RequestTypes, ApiUrl, AuthToken, TranslationTypes, ApiCallTypes, WeekDays } from "./constants";
import * as Interface from "./../interfaces";
import "isomorphic-fetch";
// @ts-ignore no types available for this module
import * as date from 'date-and-time';
import { URL, URLSearchParams } from "url";
import { IResponseApiStructure } from "./../interfaces";

/**
 * Checks if the request matches any of the given intents.
 * 
 * @param handlerInput 
 * @param intents 
 */
export function IsIntent(handlerInput: HandlerInput, ...intents: string[]): boolean {
    if (handlerInput.requestEnvelope.request.type === RequestTypes.Intent) {
        for (let i = 0; i < intents.length; i++) {
            console.log(handlerInput.requestEnvelope.request.intent.name);
            if (handlerInput.requestEnvelope.request.intent.name === intents[i]) {
                return true;
            }
        }
    }
    return false;
}

/**
 * Checks if the request matches any of the given types.
 * 
 * @param handlerInput 
 * @param types 
 */
export function IsType(handlerInput: HandlerInput, ...types: string[]): boolean {
    for (let i = 0; i < types.length; i++) {
        if (handlerInput.requestEnvelope.request.type === types[i]) {
            return true;
        }
    }
    return false;
}

/**
 * Checks if the request matches the given intent and dialogState.
 * 
 * @param handlerInput 
 * @param intent 
 * @param state 
 */
export function IsIntentWithDialogState(handlerInput: HandlerInput, intent: string, state: string): boolean {
    return handlerInput.requestEnvelope.request.type === RequestTypes.Intent
        && handlerInput.requestEnvelope.request.intent.name === intent
        && handlerInput.requestEnvelope.request.dialogState === state;
}

/**
 * Checks if the request matches the given intent with a non COMPLETED dialogState.
 * 
 * @param handlerInput 
 * @param intent 
 */
export function IsIntentWithIncompleteDialog(handlerInput: HandlerInput, intent: string): boolean {
    return handlerInput.requestEnvelope.request.type === RequestTypes.Intent
        && handlerInput.requestEnvelope.request.intent.name === intent
        && handlerInput.requestEnvelope.request.dialogState !== "COMPLETED";
}

/**
 * Checks if the request matches the given intent with the COMPLETED dialogState.
 * 
 * @param handlerInput 
 * @param intent 
 */
export function IsIntentWithCompleteDialog(handlerInput: HandlerInput, intent: string): boolean {
    return IsIntentWithDialogState(handlerInput, intent, "COMPLETED");
}

/**
 * Gets the request attributes and casts it to our custom RequestAttributes type.
 * 
 * @param handlerInput 
 */
export function GetRequestAttributes(handlerInput: HandlerInput): Interface.IRequestAttributes {
    return handlerInput.attributesManager.getRequestAttributes() as Interface.IRequestAttributes;
}

/**
 * Gets the session attributes and casts it to our custom SessionAttributes type.
 * 
 * @param handlerInput 
 */
export function GetSessionAttributes(handlerInput: HandlerInput): Interface.ISessionAttributes {
    return handlerInput.attributesManager.getSessionAttributes() as Interface.ISessionAttributes;
}

/**
 * Gets the directive service client.
 * 
 * @param handlerInput 
 */
export function GetDirectiveServiceClient(handlerInput: HandlerInput): services.directive.DirectiveServiceClient {
    return handlerInput.serviceClientFactory!.getDirectiveServiceClient();
}

/**
 * Resets the given slot value by setting it to an empty string.
 * If the intent is using the Dialog Directive, this will cause Alexa
 * to reprompt the user for that slot.
 * 
 * @param request 
 * @param slotName 
 */
export function ResetSlotValue(request: IntentRequest, slotName: string) {
    if (request.intent.slots) {
        const slot = request.intent.slots[slotName];
        if (slot) {
            slot.value = "";
        }
    }
}

/**
 * Parses the slot values and returns a new object with additional information,
 * e.g. if the value was matched, or if it is ambiguous etc.
 * 
 * Example:
 *   If we have the following Drink Slot Type:
 *   {
 *     "types": [{
 *       "values": [{
 *           "id": "cocacola",
 *           "name": {
 *             "value": "Coca Cola"
 *           }
 *         },
 *         {
 *           "id": "cocacolazero",
 *           "name": {
 *             "value": "Coca Cola Zero"
 *           }
 *         }
 *       ]
 *     }]
 *   }
 * 
 *   If the user said "Cola", the following value should be generated:
 *   {
 *     "name": "drink", // slot name
 *     "value": "Cola", // what the user said
 *     "isMatch": true, // was successfuly matched with our slot type
 *     "resolved": "Coca Cola", // the first resolved value
 *     "id": "cocacola", // the first resolved id
 *     "isAmbiguous": true, // true because we matched multiple possible values
 *     "values": [{
 *         "name": "Coca Cola",
 *         "id": "cocacola"
 *       },
 *       {
 *         "name": "Coca Cola Zero",
 *         "id": "cocacolazero"
 *       }
 *     ],
 *     "confirmationStatus": "NONE"
 *   }
 * 
 * @param filledSlots 
 */
export function GetSlotValues(filledSlots?: Interface.ISlots): Interface.ISlotValues {
    const slotValues: Interface.ISlotValues = {};

    if (filledSlots) {
        Object.keys(filledSlots).forEach((item) => {
            const name = filledSlots[item].name;
            const value = filledSlots[item].value;
            const confirmationStatus = filledSlots[item].confirmationStatus;

            if (filledSlots[item] &&
                filledSlots[item].resolutions &&
                filledSlots[item].resolutions!.resolutionsPerAuthority &&
                filledSlots[item].resolutions!.resolutionsPerAuthority![0] &&
                filledSlots[item].resolutions!.resolutionsPerAuthority![0].status &&
                filledSlots[item].resolutions!.resolutionsPerAuthority![0].status.code) {
                switch (filledSlots[item].resolutions!.resolutionsPerAuthority![0].status.code) {
                    case "ER_SUCCESS_MATCH":
                        const valueWrappers = filledSlots[item].resolutions!.resolutionsPerAuthority![0].values;

                        if (valueWrappers.length > 1) {

                            slotValues[name] = {
                                name,
                                value: value || "",
                                isMatch: true,
                                resolved: valueWrappers[0].value.name,
                                id: valueWrappers[0].value.id,
                                isAmbiguous: true,
                                values: valueWrappers.map((valueWrapper) => valueWrapper.value),
                                confirmationStatus: confirmationStatus,
                            };
                            break;
                        }

                        slotValues[name] = {
                            name: name,
                            value: value || "",
                            isMatch: true,
                            resolved: valueWrappers[0].value.name,
                            id: valueWrappers[0].value.id,
                            isAmbiguous: false,
                            values: [],
                            confirmationStatus: confirmationStatus,
                        };
                        break;
                    case "ER_SUCCESS_NO_MATCH":
                        slotValues[name] = {
                            name: name,
                            value: value || "",
                            isMatch: false,
                            confirmationStatus: confirmationStatus,
                        };
                        break;
                    default:
                        break;
                }
            } else {
                slotValues[name] = {
                    name: name,
                    value: value || "",
                    isMatch: false,
                    confirmationStatus: confirmationStatus,
                };
            }
        });
    }

    return slotValues;
}

/**
* Make an api request to the desired route
* @param route object where the api endpoint and the different callbacks are defined
*/
export const RouteGenerate = async (route: Interface.IApiCall): Promise<void> => {
    try {
        const url = new URL(`${ApiUrl}/api/${route.url}`);
        //@ts-ignore
        const searchParams = new URLSearchParams(route.data)

        console.info(`API Request: ${url}?${searchParams}`)
        let response = await fetch(`${url}?${searchParams}`, {
            "headers": {
                "Authorization": `Bearer ${AuthToken}`,
                "Content-Type": "application/json"
            }
        });
        response = await response.json();
        console.info(`API Response: ${JSON.stringify(response)}`)
        route.onSuccess(response);
    } catch (error) {
        route.onError(error);
    }
};


/**
* Parse the date string to the desired format
*/
export const dateFormat = (input: { date: string, lang?: string, format?: string }): string => {
    const lang = input.lang || "de";
    const format = input.format || "YYYY-MM-DD";

    require("date-and-time/locale/" + lang);
    date.locale(lang);
    return date.format(new Date(input.date), format);
}

/**
 * Clean input string from invalid characters
 * @param input string that should be validated
 * @param t translation function
 */
export const cleanSssmlResponseFromInvalidChars = (input: string, t: any): string => {
    return input.replace(/&/g, t(TranslationTypes.AND_MSG))
}

export const removeUnopenedPharmacies = (records: IResponseApiStructure[ApiCallTypes.POI_LOCALIZED], fromdate: Date, todate: Date): IResponseApiStructure[ApiCallTypes.POI_LOCALIZED] => {

    records.Items = records.Items.filter(pharmacy => {
        if (pharmacy.OperationSchedule !== null) {
            // Remove inactive opening schedules
            pharmacy.OperationSchedule = pharmacy.OperationSchedule.filter(schedule => {
                const start = new Date(schedule.Start);
                const stop = new Date(schedule.Stop);

                var copyFromdate = new Date(fromdate);
                let scheduleRangeValid: boolean = false;

                // Check if current schedule range is valid
                while (copyFromdate.getTime() <= todate.getTime() && scheduleRangeValid === false) {
                    if (start.getTime() <= copyFromdate.getTime() && copyFromdate.getTime() <= stop.getTime()) {
                        scheduleRangeValid = true;
                    }

                    copyFromdate.setDate(copyFromdate.getDate() + 1);
                }
                if (scheduleRangeValid) {
                    // Check if an opening hour for this pharmacy exists
                    // TODO: Add feature where user can ask for currently opened pharmacies
                    if (schedule.OperationScheduleTime.length) {
                        schedule.OperationScheduleTime = schedule.OperationScheduleTime.filter(operationSchedule => {

                            let pharmacyOpenedForThisPeriod: boolean = false;
                            // Reset fromdate for each iteration or the next opening hours will not be crawled
                            copyFromdate = new Date(fromdate);

                            // If the pharmacy has opened on at least one day
                            while (copyFromdate.getTime() <= todate.getTime() && pharmacyOpenedForThisPeriod === false) {
                                const weekDay = copyFromdate.toLocaleString("en", { weekday: 'long' });

                                switch (weekDay) {
                                    case WeekDays.MONDAY:
                                        pharmacyOpenedForThisPeriod = operationSchedule.Monday;
                                        break;
                                    case WeekDays.TUESDAY:
                                        pharmacyOpenedForThisPeriod = operationSchedule.Tuesday;
                                        break;
                                    case WeekDays.WEDNESDAY:
                                        pharmacyOpenedForThisPeriod = operationSchedule.Wednesday;
                                        break;
                                    case WeekDays.THURSDAY:
                                        pharmacyOpenedForThisPeriod = operationSchedule.Thuresday;
                                        break;
                                    case WeekDays.FRIDAY:
                                        pharmacyOpenedForThisPeriod = operationSchedule.Friday;
                                        break;
                                    case WeekDays.SATURDAY:
                                        pharmacyOpenedForThisPeriod = operationSchedule.Saturday;
                                        break;
                                    case WeekDays.SUNDAY:
                                        pharmacyOpenedForThisPeriod = operationSchedule.Sunday;
                                        break;
                                }

                                copyFromdate.setDate(copyFromdate.getDate() + 1);
                            }

                            return pharmacyOpenedForThisPeriod;
                        });

                        return schedule.OperationScheduleTime.length > 0;
                    }
                }

                return false;
            });

            return pharmacy.OperationSchedule.length > 0;
        }

        return false;
    });
    console.log("Valid pharmacies"+ records.Items.length);
    return records;
}