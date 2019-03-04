import { RequestHandler, HandlerInput } from "ask-sdk-core";
import { IsType } from "../lib/helpers";
import { SessionEndedRequest } from "ask-sdk-model";
import { RequestTypes } from "../lib/constants";

export const SessionEndedHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput) {
        return IsType(handlerInput, RequestTypes.SessionEnded);
    },
    handle(handlerInput: HandlerInput) {
        const request = <SessionEndedRequest>handlerInput.requestEnvelope.request;

        console.log(`Session ended with reason: ${JSON.stringify(request)}`);

        return handlerInput.responseBuilder.getResponse();
    }
};