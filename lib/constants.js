"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestTypes;
(function (RequestTypes) {
    RequestTypes["Launch"] = "LaunchRequest";
    RequestTypes["Intent"] = "IntentRequest";
    RequestTypes["SessionEnded"] = "SessionEndedRequest";
    RequestTypes["HelloWorld"] = "HelloWorldIntent";
    RequestTypes["Event"] = "EventIntent";
})(RequestTypes = exports.RequestTypes || (exports.RequestTypes = {}));
var IntentTypes;
(function (IntentTypes) {
    IntentTypes["Help"] = "AMAZON.HelpIntent";
    IntentTypes["Stop"] = "AMAZON.StopIntent";
    IntentTypes["Cancel"] = "AMAZON.CancelIntent";
    IntentTypes["Fallback"] = "AMAZON.FallbackIntent";
})(IntentTypes = exports.IntentTypes || (exports.IntentTypes = {}));
var ErrorTypes;
(function (ErrorTypes) {
    ErrorTypes["Unknown"] = "UnknownError";
    ErrorTypes["Unexpected"] = "UnexpectedError";
})(ErrorTypes = exports.ErrorTypes || (exports.ErrorTypes = {}));
var LocaleTypes;
(function (LocaleTypes) {
    LocaleTypes["deDE"] = "de-DE";
    LocaleTypes["itIT"] = "it-IT";
    LocaleTypes["enUS"] = "en-US";
})(LocaleTypes = exports.LocaleTypes || (exports.LocaleTypes = {}));
var TranslationTypes;
(function (TranslationTypes) {
    TranslationTypes["SKILL_NAME"] = "SKILL_NAME";
    TranslationTypes["HELLO_MSG"] = "HELLO_MSG";
    TranslationTypes["GREETING_MSG"] = "GREETING_MSG";
    TranslationTypes["HELP_MSG"] = "HELP_MSG";
    TranslationTypes["GOODBYE_MSG"] = "GOODBYE_MSG";
    TranslationTypes["ERROR_MSG"] = "ERROR_MSG";
    TranslationTypes["ERROR_UNEXPECTED_MSG"] = "ERROR_UNEXPECTED_MSG";
})(TranslationTypes = exports.TranslationTypes || (exports.TranslationTypes = {}));
