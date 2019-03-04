"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../lib/helpers");
const constants_1 = require("../../lib/constants");
exports.EventHandler = {
    canHandle(handlerInput) {
        return helpers_1.IsIntent(handlerInput, constants_1.RequestTypes.Event);
    },
    handle(handlerInput) {
        const speechText = "Event action";
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard("Hello World", speechText)
            .getResponse();
    }
};
