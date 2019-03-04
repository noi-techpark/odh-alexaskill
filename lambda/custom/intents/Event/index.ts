import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { IsIntent } from "../../lib/helpers";
import { RequestTypes } from "../../lib/constants";

export const EventHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return IsIntent(handlerInput, RequestTypes.Event);
    },
    handle(handlerInput: HandlerInput): Response {
        const speechText = "Event action";

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard("Hello World", speechText)
            .getResponse();
    }
}