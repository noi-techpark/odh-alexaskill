import { RequestInterceptor } from "ask-sdk-core";
import * as i18n from "i18next";
import * as sprintf from "i18next-sprintf-postprocessor";
import { strings } from "../lib/strings";
import * as Interfaces from "../interfaces";

/**
 * Adds translation functions to the RequestAttributes.
 */
export const LocalizationInterceptor: RequestInterceptor = {
    process(handlerInput) {
        const localizationClient = {...i18n.use(sprintf).init({
            lng: handlerInput.requestEnvelope.request.locale,
            overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
            resources: strings,
            returnObjects: true,
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

        const attributes = handlerInput.attributesManager.getRequestAttributes() as Interfaces.IRequestAttributes;
        attributes.t = function (...args: any[]) {
            return localizationClient.localize(...args);
        };
    },
};
