import { RequestHandler, ErrorHandler, SkillBuilders, RequestInterceptor } from "ask-sdk-core";
import { SessionEndedRequest, IntentRequest, LaunchRequest } from "ask-sdk-model";

import { Handler } from "aws-lambda";
import * as i18n from "i18next";
import * as sprintf from "i18next-sprintf-postprocessor";

const LaunchRequestHandler: RequestHandler = {
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

const HelloWorldIntentHandler: RequestHandler = {
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

const HelpIntentHandler: RequestHandler = {
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

const CancelAndStopIntentHandler: RequestHandler = {
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

const SessionEndedRequestHandler: RequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "SessionEndedRequest";
  },
  handle(handlerInput) {
    const request = <SessionEndedRequest>handlerInput.requestEnvelope.request;

    console.log(`Session ended with reason: ${request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler: ErrorHandler = {
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
}

const LocalizationInterceptor: RequestInterceptor = {
  process(handlerInput) {
    const request = <IntentRequest | LaunchRequest | SessionEndedRequest>handlerInput.requestEnvelope.request
    const localizationClient: i18n.i18n & { localize(...args: string[]): string } =
    {
      ...i18n.use(sprintf).init({
        lng: request.locale,
        fallbackLng: "de-DE",
        resources: languageStrings
      }),
      localize(...args: string[]) {
        let values: string[] = [];

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
        } else {
          return value;
        }
      }
    };

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = (...args: string[]) => {
      return localizationClient.localize(...args);
    };
  },
};

const skillBuilder = SkillBuilders.custom();

const handler: Handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    HelloWorldIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addRequestInterceptors(LocalizationInterceptor)
  .addErrorHandlers(ErrorHandler)
  .lambda();

export { handler }