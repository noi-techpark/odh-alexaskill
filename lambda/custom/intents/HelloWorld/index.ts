import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { IsIntent, GetRequestAttributes } from "../../lib/helpers";
import { RequestTypes, TranslationTypes } from "../../lib/constants";

export const HelloWorldHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return IsIntent(handlerInput, RequestTypes.HelloWorld);
    },
    handle(handlerInput: HandlerInput): Response {
        const { t } = GetRequestAttributes(handlerInput);

        const speechText = t(TranslationTypes.GREETING_MSG);

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard("Hello World", speechText)
            .getResponse();
    }
}