"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequestLoggingInterceptor {
    process(handlerInput) {
        return new Promise((resolve, reject) => {
            console.log("Incoming request:\n" + JSON.stringify(handlerInput.requestEnvelope.request));
            resolve();
        });
    }
}
exports.RequestLoggingInterceptor = RequestLoggingInterceptor;
