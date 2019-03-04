import { ErrorHandler } from "ask-sdk-core";
import { GetRequestAttributes } from "../lib/helpers";
import { TranslationTypes } from "../lib/constants";

/**
 * Handles unknown errors. Should be placed at the end, as it will catch
 * all errors.
 */
export const Unknown: ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);

        const { t } = GetRequestAttributes(handlerInput);

        const speechText = t(TranslationTypes.ERROR_MSG);

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    },
};
