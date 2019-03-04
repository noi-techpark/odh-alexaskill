"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../lib/helpers");
const constants_1 = require("../lib/constants");
/**
 * Handles unknown errors. Should be placed at the end, as it will catch
 * all errors.
 */
exports.Unknown = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
        const { t } = helpers_1.GetRequestAttributes(handlerInput);
        const speechText = t(constants_1.TranslationTypes.ERROR_MSG);
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    },
};
