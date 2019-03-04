"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
/**
 * Checks if the request matches any of the given intents.
 *
 * @param handlerInput
 * @param intents
 */
function IsIntent(handlerInput, ...intents) {
    if (handlerInput.requestEnvelope.request.type === constants_1.RequestTypes.Intent) {
        for (let i = 0; i < intents.length; i++) {
            console.log(handlerInput.requestEnvelope.request.intent.name);
            if (handlerInput.requestEnvelope.request.intent.name === intents[i]) {
                return true;
            }
        }
    }
    return false;
}
exports.IsIntent = IsIntent;
/**
 * Checks if the request matches any of the given types.
 *
 * @param handlerInput
 * @param types
 */
function IsType(handlerInput, ...types) {
    for (let i = 0; i < types.length; i++) {
        if (handlerInput.requestEnvelope.request.type === types[i]) {
            return true;
        }
    }
    return false;
}
exports.IsType = IsType;
/**
 * Checks if the request matches the given intent and dialogState.
 *
 * @param handlerInput
 * @param intent
 * @param state
 */
function IsIntentWithDialogState(handlerInput, intent, state) {
    return handlerInput.requestEnvelope.request.type === constants_1.RequestTypes.Intent
        && handlerInput.requestEnvelope.request.intent.name === intent
        && handlerInput.requestEnvelope.request.dialogState === state;
}
exports.IsIntentWithDialogState = IsIntentWithDialogState;
/**
 * Checks if the request matches the given intent with a non COMPLETED dialogState.
 *
 * @param handlerInput
 * @param intent
 */
function IsIntentWithIncompleteDialog(handlerInput, intent) {
    return handlerInput.requestEnvelope.request.type === constants_1.RequestTypes.Intent
        && handlerInput.requestEnvelope.request.intent.name === intent
        && handlerInput.requestEnvelope.request.dialogState !== "COMPLETED";
}
exports.IsIntentWithIncompleteDialog = IsIntentWithIncompleteDialog;
/**
 * Checks if the request matches the given intent with the COMPLETED dialogState.
 *
 * @param handlerInput
 * @param intent
 */
function IsIntentWithCompleteDialog(handlerInput, intent) {
    return IsIntentWithDialogState(handlerInput, intent, "COMPLETED");
}
exports.IsIntentWithCompleteDialog = IsIntentWithCompleteDialog;
/**
 * Gets the request attributes and casts it to our custom RequestAttributes type.
 *
 * @param handlerInput
 */
function GetRequestAttributes(handlerInput) {
    return handlerInput.attributesManager.getRequestAttributes();
}
exports.GetRequestAttributes = GetRequestAttributes;
/**
 * Gets the session attributes and casts it to our custom SessionAttributes type.
 *
 * @param handlerInput
 */
function GetSessionAttributes(handlerInput) {
    return handlerInput.attributesManager.getSessionAttributes();
}
exports.GetSessionAttributes = GetSessionAttributes;
/**
 * Gets the directive service client.
 *
 * @param handlerInput
 */
function GetDirectiveServiceClient(handlerInput) {
    return handlerInput.serviceClientFactory.getDirectiveServiceClient();
}
exports.GetDirectiveServiceClient = GetDirectiveServiceClient;
/**
 * Resets the given slot value by setting it to an empty string.
 * If the intent is using the Dialog Directive, this will cause Alexa
 * to reprompt the user for that slot.
 *
 * @param request
 * @param slotName
 */
function ResetSlotValue(request, slotName) {
    if (request.intent.slots) {
        const slot = request.intent.slots[slotName];
        if (slot) {
            slot.value = "";
        }
    }
}
exports.ResetSlotValue = ResetSlotValue;
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
function GetSlotValues(filledSlots) {
    const slotValues = {};
    if (filledSlots) {
        Object.keys(filledSlots).forEach((item) => {
            const name = filledSlots[item].name;
            const value = filledSlots[item].value;
            const confirmationStatus = filledSlots[item].confirmationStatus;
            if (filledSlots[item] &&
                filledSlots[item].resolutions &&
                filledSlots[item].resolutions.resolutionsPerAuthority &&
                filledSlots[item].resolutions.resolutionsPerAuthority[0] &&
                filledSlots[item].resolutions.resolutionsPerAuthority[0].status &&
                filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
                switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
                    case "ER_SUCCESS_MATCH":
                        const valueWrappers = filledSlots[item].resolutions.resolutionsPerAuthority[0].values;
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
            }
            else {
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
exports.GetSlotValues = GetSlotValues;
