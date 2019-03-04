"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../lib/helpers");
const constants_1 = require("../lib/constants");
const helpers_2 = require("../lib/helpers");
exports.HelpHandler = {
    canHandle(handlerInput) {
        return helpers_1.IsIntent(handlerInput, constants_1.IntentTypes.Help);
    },
    handle(handlerInput) {
        const { t } = helpers_2.GetRequestAttributes(handlerInput);
        const speechText = t(constants_1.TranslationTypes.HELP_MSG);
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(t(constants_1.TranslationTypes.HELP_MSG), speechText)
            .getResponse();
    },
};
