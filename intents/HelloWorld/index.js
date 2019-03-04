"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../lib/helpers");
const constants_1 = require("../../lib/constants");
exports.HelloWorldHandler = {
    canHandle(handlerInput) {
        return helpers_1.IsIntent(handlerInput, constants_1.RequestTypes.HelloWorld);
    },
    handle(handlerInput) {
        const { t } = helpers_1.GetRequestAttributes(handlerInput);
        const speechText = t(constants_1.TranslationTypes.GREETING_MSG);
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard("Hello World", speechText)
            .getResponse();
    }
};
