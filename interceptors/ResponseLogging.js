"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseLoggingInterceptor {
    process(handlerInput, response) {
        return new Promise((resolve, reject) => {
            console.log("Outgoing response:\n" + JSON.stringify(response));
            resolve();
        });
    }
}
exports.ResponseLoggingInterceptor = ResponseLoggingInterceptor;
