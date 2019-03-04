import { RequestHandler, HandlerInput } from "ask-sdk-core";
import { IntentTypes } from "../lib/constants";
import { IsIntent } from "../lib/helpers";

export const StopHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput) {
        return IsIntent(handlerInput, IntentTypes.Stop, IntentTypes.Cancel);
    },
    handle(handlerInput: HandlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

        const speechText = requestAttributes.t("GOODBYE");

        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
