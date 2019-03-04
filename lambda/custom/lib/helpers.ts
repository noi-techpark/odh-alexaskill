import { HandlerInput } from "ask-sdk-core";
import { IntentRequest, services } from "ask-sdk-model";
import { RequestTypes, ApiUrl, AuthToken } from "./constants";
import * as Interface from "./../interfaces";
import "isomorphic-fetch";

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

/*
* Make an api request to the desired route
* @param route
*/
export const RouteGenerate = async (route: Interface.IApiCall): Promise<void> => {
    try {
        let response = await fetch(`${ApiUrl}/api/${route.url}`, {
            "headers": {
                "Authorization": `Bearer ${AuthToken}`,
                "Content-Type": "application/json"
            }
        });
        response = await response.json();
        route.onSuccess(response);
    } catch (error) {
        route.onError(error);
    }
};