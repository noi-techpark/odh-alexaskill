import { RequestHandler, HandlerInput } from "ask-sdk-core";
import { IntentTypes, TranslationTypes } from "../lib/constants";
import { IsIntent, GetRequestAttributes } from "../lib/helpers";

export const StopHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput) {
        return IsIntent(handlerInput, IntentTypes.Stop, IntentTypes.Cancel);
    },
    handle(handlerInput: HandlerInput) {

        const { t } = GetRequestAttributes(handlerInput);

        const speechText = t(TranslationTypes.GOODBYE_MSG);

        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
