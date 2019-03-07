export enum RequestTypes {
    Launch = "LaunchRequest",
    Intent = "IntentRequest",
    SessionEnded = "SessionEndedRequest",
    HelloWorld = "HelloWorldIntent",
    Event = "EventIntent",
    LoadMore = "LoadMoreIntent"
}

export enum IntentTypes {
    Help = "AMAZON.HelpIntent",
    Stop = "AMAZON.StopIntent",
    Cancel = "AMAZON.CancelIntent",
    Fallback = "AMAZON.FallbackIntent"
}

export enum ErrorTypes {
    Unknown = "UnknownError",
    Unexpected = "UnexpectedError",
}

export enum LocaleTypes {
    deDE = "de-DE",
    itIT = "it-IT",
    enUS = "en-US"
}

export enum TranslationTypes {
    SKILL_NAME = "SKILL_NAME",
    HELLO_MSG = "HELLO_MSG",
    GREETING_MSG = "GREETING_MSG",
    EVENT_MSG_SINGLE_DATE = "EVENT_MSG_SINGLE_DATE",
    EVENT_MSG_MULTIPLE_DATES = "EVENT_MSG_MULTIPLE_DATES",
    EVENT_REPROMPT = "EVENT_REPROMPT",
    EVENT_MORE_INFO = "EVENT_MORE_INFO",
    EVENT_MAX_EXCEEDED = "EVENT_MAX_EXCEEDED",
    NO_EVENTS_FOUND = "NO_EVENTS_FOUND",
    AND_MSG = "AND_MSG",
    HELP_MSG = "HELP_MSG",
    GOODBYE_MSG = "GOODBYE_MSG",
    ERROR_MSG = "ERROR_MSG",
    ERROR_UNEXPECTED_MSG = "ERROR_UNEXPECTED_MSG",
}

export const ApiUrl = "https://tourism.opendatahub.bz.it";
export const AuthToken = "eXDo_Jp27wdPwPAywjflO7a-kmpT97CanNSiYHVl8_0me1sB5ra7OSbLZe8UGD7w_Wsdo546gNlZqNOL4whEnajFnIOfB5FRdUc6klhmfoQfINEURLOIHeoIS6HG7bjzhmPtWbjBC2HTMzzhF796BOzFPfluuotm1GBPJIWexCmVedqzg0NOTmq14e5z8ypdaAQmGwxxUvO-5t9zoc3U1FmOTiH13vbs23aviqtusqMyPi8xB4iIy8Bu6IzlzLkCf76uBbdOXwqmFNtN0SFUvrA_t2iBDCNMDLsd2mIn5-JkQLvTu0A2Wg9QdvrZTkoFGAe8eEsFeb40NodP9hj_99uxJn_yBwapOZUafMVt-us4iAV4OiiaZROFCbzxf1TxheWrUCp1iknx-A583u_YbeC3WHI7V0SvSBc08WZga4ZojCH1TRLI0SOh8DfCmMj5GTt1xiYqvmWM8O6TF74r1wmCpyA3w4pqr8GwNkwzDEiEGXUpPh-RYDPO2vZVNkMC6r_eHtsV6HKYkeSXn3K2aPXFXa1zgAQ2cYZkzf4DK_Y";

export enum ApiCallTypes {
    EVENT_REDUCED = "EventReduced",
    EVENT_LOCALIZED = "EventLocalized"
}

export enum HandlerResponseStatus {
    Success = 1,
    Failure = 0
}