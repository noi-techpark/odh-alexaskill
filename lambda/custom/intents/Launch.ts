import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { RequestTypes, TranslationTypes } from "../lib/constants";
import { GetRequestAttributes, IsType } from "../lib/helpers";

export const LaunchHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return IsType(handlerInput, RequestTypes.Launch);
    },
    handle(handlerInput: HandlerInput): Response {
        const { t } = GetRequestAttributes(handlerInput);

        const speechText = t(TranslationTypes.GREETING_MSG, {"skill": t(TranslationTypes.SKILL_NAME)});
        const repromptText = t(TranslationTypes.HELP_MSG);

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(repromptText)
            .getResponse();
    }
}