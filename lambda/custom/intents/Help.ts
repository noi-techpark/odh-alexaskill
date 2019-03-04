import { RequestHandler, HandlerInput } from "ask-sdk-core";
import { IsIntent } from "../lib/helpers";
import { IntentTypes, TranslationTypes } from "../lib/constants";
import { GetRequestAttributes } from "../lib/helpers";

export const HelpHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return IsIntent(handlerInput, IntentTypes.Help);
  },
  handle(handlerInput: HandlerInput) {
    const { t } = GetRequestAttributes(handlerInput);
    const speechText = t(TranslationTypes.HELP_MSG);

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(t(TranslationTypes.HELP_MSG), speechText)
      .getResponse();
  },
};