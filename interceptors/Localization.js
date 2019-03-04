"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const i18n = require("i18next");
const sprintf = require("i18next-sprintf-postprocessor");
const strings_1 = require("../lib/strings");
/**
 * Adds translation functions to the RequestAttributes.
 */
exports.LocalizationInterceptor = {
    process(handlerInput) {
        const localizationClient = Object.assign({}, i18n.use(sprintf).init({
            lng: handlerInput.requestEnvelope.request.locale,
            overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
            resources: strings_1.strings,
            returnObjects: true,
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
        attributes.t = function (...args) {
            return localizationClient.localize(...args);
        };
    },
};
