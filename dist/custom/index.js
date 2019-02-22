"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ask_sdk_core_1 = require("ask-sdk-core");
const i18n = require("i18next");
const sprintf = require("i18next-sprintf-postprocessor");
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === "LaunchRequest";
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speechText = requestAttributes.t("GREETING", requestAttributes.t("SKILL_NAME"));
        const repromptText = requestAttributes.t("HELP");
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(repromptText)
            .getResponse();
    },
};
const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === "IntentRequest"
            && handlerInput.requestEnvelope.request.intent.name === "HelloWorldIntent";
    },
    handle(handlerInput) {
        const speechText = "Hello World!";
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard("Hello World", speechText)
            .getResponse();
    },
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === "IntentRequest"
            && handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent";
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speechText = requestAttributes.t("HELP");
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(requestAttributes.t("SKILL_NAME"), speechText)
            .getResponse();
    },
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === "IntentRequest"
            && (handlerInput.requestEnvelope.request.intent.name === "AMAZON.CancelIntent"
                || handlerInput.requestEnvelope.request.intent.name === "AMAZON.StopIntent");
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speechText = requestAttributes.t("GOODBYE");
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    },
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === "SessionEndedRequest";
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        console.log(`Session ended with reason: ${request.reason}`);
        return handlerInput.responseBuilder.getResponse();
    },
};
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error}`);
        return handlerInput.responseBuilder
            .speak("Sorry, I can\'t understand the command. Please say again.")
            .reprompt("Sorry, I can\'t understand the command. Please say again.")
            .getResponse();
    },
};
const languageStrings = {
    "de-DE": require("./i18n/de").default
};
console.log(languageStrings);
const LocalizationInterceptor = {
    process(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const localizationClient = Object.assign({}, i18n.use(sprintf).init({
            lng: request.locale,
            fallbackLng: "de-DE",
            resources: languageStrings
        }), { localize(...args) {
                let values = [];
                for (let i = 1; i < args.length; i++) {
                    values.push(args[i]);
                }
                const value = i18n.t(args[0], {
                    returnObjects: true,
                    postProcess: "sprintf",
                    sprintf: values
                });
                if (Array.isArray(value)) {
                    return value[Math.floor(Math.random() * value.length)];
                }
                else {
                    return value;
                }
            } });
        const attributes = handlerInput.attributesManager.getRequestAttributes();
        attributes.t = (...args) => {
            return localizationClient.localize(...args);
        };
    },
};
const skillBuilder = ask_sdk_core_1.SkillBuilders.custom();
const handler = skillBuilder
    .addRequestHandlers(LaunchRequestHandler, HelloWorldIntentHandler, HelpIntentHandler, CancelAndStopIntentHandler, SessionEndedRequestHandler)
    .addRequestInterceptors(LocalizationInterceptor)
    .addErrorHandlers(ErrorHandler)
    .lambda();
exports.handler = handler;
