"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../lib/constants");
const helpers_1 = require("../lib/helpers");
/**
 * Parses and adds the slot values to the RequestAttributes.
 */
exports.Slots = {
    process(handlerInput) {
        const attributes = handlerInput.attributesManager.getRequestAttributes();
        if (handlerInput.requestEnvelope.request.type === constants_1.RequestTypes.Intent) {
            attributes.slots = helpers_1.GetSlotValues(handlerInput.requestEnvelope.request.intent.slots);
        }
        else {
            attributes.slots = {};
        }
    },
};
