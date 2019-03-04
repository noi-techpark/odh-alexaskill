"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../lib/constants");
const helpers_1 = require("../lib/helpers");
exports.StopHandler = {
    canHandle(handlerInput) {
        return helpers_1.IsIntent(handlerInput, constants_1.IntentTypes.Stop, constants_1.IntentTypes.Cancel);
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speechText = requestAttributes.t("GOODBYE");
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
