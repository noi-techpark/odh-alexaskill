export enum RequestTypes {
    Launch = "LaunchRequest",
    Intent = "IntentRequest",
    SessionEnded = "SessionEndedRequest",
    HelloWorld = "HelloWorldIntent",
    Event = "EventIntent",
    Pharmacy = "PharmacyIntent",
    LoadMore = "LoadMoreIntent",
    FindMunicipality = "FindMunicipalityIntent"
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
    GREETING_MSG = "GREETING_MSG",
    EVENT_MSG_SINGLE_DATE = "EVENT_MSG_SINGLE_DATE",
    EVENT_MSG_SINGLE_DATE_WITH_TOPIC = "EVENT_MSG_SINGLE_DATE_WITH_TOPIC",
    EVENT_MSG_MULTIPLE_DATES = "EVENT_MSG_MULTIPLE_DATES",
    EVENT_MSG_MULTIPLE_DATES_WITH_TOPIC = "EVENT_MSG_MULTIPLE_DATES_WITH_TOPIC",
    EVENT_TOPIC_WITH_MUNICIPALITY = "EVENT_TOPIC_WITH_MUNICIPALITY",
    EVENT_MUNICIPALITY_CHOOSE = "EVENT_MUNICIPALITY_CHOOSE",
    EVENT_TOPIC = "EVENT_TOPIC",
    EVENT_LOCATION = "EVENT_LOCATION",
    EVENT_REPROMPT = "EVENT_REPROMPT",
    EVENT_MORE_INFO = "EVENT_MORE_INFO",
    EVENT_MAX_EXCEEDED = "EVENT_MAX_EXCEEDED",
    NO_EVENTS_FOUND = "NO_EVENTS_FOUND",
    PHARMACY_MSG_SINGLE_DATE = "PHARMACY_MSG_SINGLE_DATE",
    PHARMACY_MSG_MULTIPLE_DATES = "PHARMACY_MSG_MULTIPLE_DATES",
    PHARMACY_REPROMPT = "PHARMACY_REPROMPT",
    PHARMACY_MORE_INFO = "PHARMACY_MORE_INFO",
    PHARMACY_LOCATION = "PHARMACY_LOCATION",
    NO_PHARMACIES_FOUND = "NO_PHARMACIES_FOUND",
    PHARMACY_MAX_EXCEEDED = "PHARMACY_MAX_EXCEEDED",
    AND_MSG = "AND_MSG",
    HELP_MSG = "HELP_MSG",
    GOODBYE_MSG = "GOODBYE_MSG",
    ERROR_INVALID_MUNICIPALITY = "ERROR_INVALID_MUNICIPALITY",
    ERROR_NO_TOPIC_FOUND = "ERROR_NO_TOPIC_FOUND",
    ERROR_NO_DISTRICTS_FOUND = "ERROR_NO_DISTRICTS_FOUND",
    ERROR_MSG = "ERROR_MSG",
    ERROR_UNEXPECTED_MSG = "ERROR_UNEXPECTED_MSG",
}

export const ApiUrl = "https://tourism.opendatahub.bz.it";
export const AuthToken = "8x0XpxnVP7B8MFyPLM64RZQjfTsAPlX1Y8NwnMA1WiXhXMZq35Y1ZMK876WYjj64xVS_kGFj7SwQT0sVf-_3qALfIUdTF1nNgSKWtPpVoQW5Y8pDjPzKOyk-h0iI0Dny4IWmsBA8NZejLDEEWtn56Vdit3N3oyBwjOP_uosE8V-DGp1DIlWFp_CfeaKVwUWGy_XhA1AgLoGvmUPy-_Gjeujfo809BKSLpr3sgFMf7sbQdYzGQPat9f-J-5dkoclu6yHii2LRWaZUtu6MQvuSCqJl_iDwGR_HfV2r-OY0nd00-e0VzPawuEgmNXyInO64rFuiRbUF9oSEH28oFt47vVZyrm4Aao7xCLlr7p-HmJR0K9yJl5WdbktSRytAJByjVb6-Gbs6atev1884bNm6CkQc7B51ZkrjVBDFpt_hMQirrcJkoj8Gk6h5Lr6qC_HLeVz9z-HSRM-YRLEhJMBQVoQ_XzdensILohv-5pMwyqyey3Yumes0lF6CGc551nHIbvl_M5OMcTyqLpk_lIdje2EJnFF3uoMq-7qQeHD-Qug";

export enum ApiCallTypes {
    EVENT_REDUCED = "EventReduced",
    EVENT_LOCALIZED = "EventLocalized",
    DISTRICT_LOCALIZED = "DistrictLocalized",
    MUNICIPALITY_REDUCED = "MunicipalityReduced",
    POI_LOCALIZED = "PoiLocalized"
}

export enum HandlerResponseStatus {
    Delegate = 2,
    Success = 1,
    Failure = 0
}

export enum WeekDays {
    MONDAY = "Monday",
    TUESDAY = "Tuesday",
    WEDNESDAY = "Wednesday",
    THURSDAY = "Thursday",
    FRIDAY = "Friday",
    SATURDAY = "Saturday",
    SUNDAY = "Sunday"
}