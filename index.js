"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ask_sdk_core_1 = require("ask-sdk-core");
const Intents = require("./intents");
const Interceptor = require("./interceptors");
const Errors = require("./errors");
exports.handler = ask_sdk_core_1.SkillBuilders.custom()
    .addRequestHandlers(
//Intents.Debug,
// Default intents
Intents.LaunchHandler, Intents.HelpHandler, Intents.StopHandler, Intents.SessionEndedHandler, 
// Event intents
Intents.HelloWorldHandler)
    .addRequestInterceptors(Interceptor.LocalizationInterceptor, Interceptor.Slots)
    .addErrorHandlers(Errors.Unknown, Errors.Unexpected)
    .lambda();
