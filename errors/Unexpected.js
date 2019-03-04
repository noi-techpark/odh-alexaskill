"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../lib/helpers");
const constants_1 = require("../lib/constants");
/**
 * Handles ErrorTypes.Unexpected errors which should be thrown when something
 * unexpected happens.
 */
exports.Unexpected = {
    canHandle(_, error) {
        return error.name === constants_1.ErrorTypes.Unexpected;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
        const { t } = helpers_1.GetRequestAttributes(handlerInput);
        return handlerInput.responseBuilder
            .speak(t(constants_1.TranslationTypes.ERROR_UNEXPECTED_MSG))
            .getResponse();
    },
};
