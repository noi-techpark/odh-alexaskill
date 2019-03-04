"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../lib/helpers");
const constants_1 = require("../lib/constants");
exports.SessionEndedHandler = {
    canHandle(handlerInput) {
        return helpers_1.IsType(handlerInput, constants_1.RequestTypes.SessionEnded);
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        console.log(`Session ended with reason: ${request.reason}`);
        return handlerInput.responseBuilder.getResponse();
    }
};
