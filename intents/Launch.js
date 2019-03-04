"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../lib/constants");
const helpers_1 = require("../lib/helpers");
exports.LaunchHandler = {
    canHandle(handlerInput) {
        return helpers_1.IsType(handlerInput, constants_1.RequestTypes.Launch);
    },
    handle(handlerInput) {
        const { t } = helpers_1.GetRequestAttributes(handlerInput);
        const speechText = t(constants_1.TranslationTypes.GREETING_MSG, t(constants_1.TranslationTypes.SKILL_NAME));
        const repromptText = t(constants_1.TranslationTypes.HELP_MSG);
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(repromptText)
            .getResponse();
    }
};
