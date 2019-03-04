"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Debug = {
    canHandle(handlerInput) {
        console.log(JSON.stringify(handlerInput, null, 2));
        return false;
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .getResponse();
    }
};
