import { RequestInterceptor } from "ask-sdk-core";
import * as i18n from "i18next";
import * as sprintf from "i18next-sprintf-postprocessor";
import { strings } from "../lib/strings";
import * as Interfaces from "../interfaces";
// @ts-ignore no types available for this module
import * as date from 'date-and-time';

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
        localize(key: string, attributes?: {[key: string]: string | number}) {
            let value = i18n.t(key, {
              returnObjects: true
            });
    
            value = Array.isArray(value) ? value[Math.floor(Math.random() * value.length)] : value;

            if(attributes !== undefined){
                Object.keys(attributes).forEach(attr =>{
                  const reg = new RegExp(`%${attr}%`,"g");
                  value = value.replace(reg, attributes[attr]);
                });
            }
              return value;
          }
        };

        const attributes = handlerInput.attributesManager.getRequestAttributes() as Interfaces.IRequestAttributes;
        attributes.t = (key: string, attributes?: {[key: string]: string | number}) => {
            return localizationClient.localize(key, attributes);
        };
        attributes.language = () => {
          let language = "de";
          if(handlerInput.requestEnvelope.request.locale !== undefined){
            // split the alexa language format de-DE to de
            language = handlerInput.requestEnvelope.request.locale.split("-")[0];
          }

          return language;
        }
    },
};
