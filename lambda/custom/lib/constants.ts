export enum RequestTypes {
    Launch = "LaunchRequest",
    Intent = "IntentRequest",
    SessionEnded = "SessionEndedRequest",
    HelloWorld = "HelloWorldIntent",
    Event = "EventIntent",
    EventDetail = "EventDetailIntent",
    Pharmacy = "PharmacyIntent",
    PharmacyDetail = "PharmacyDetailIntent",
    GastronomyList = "GastronomyIntent",
    GastronomyDetail = "GastronomyDetailIntent",
    Shop = "ShopIntent",
    ShopDetail = "ShopDetailIntent",
    CarSharingList = "CarSharingIntent",
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
    GASTRONOMY_REPROMPT = "GASTRONOMY_REPROMPT",
    NO_GASTRONOMY_FOUND = "NO_GASTRONOMY_FOUND",
    PHARMACY_MSG_SINGLE_DATE = "PHARMACY_MSG_SINGLE_DATE",
    PHARMACY_MSG_MULTIPLE_DATES = "PHARMACY_MSG_MULTIPLE_DATES",
    PHARMACY_NO_OPENING_TIMES_AVAILABLE = "PHARMACY_NO_OPENING_TIMES_AVAILABLE",
    PHARMACY_REPROMPT = "PHARMACY_REPROMPT",
    PHARMACY_MORE_INFO = "PHARMACY_MORE_INFO",
    PHARMACY_LOCATION = "PHARMACY_LOCATION",
    GASTRONOMY_MAX_EXCEEDED = "GASTRONOMY_MAX_EXCEEDED",
    GASTRONOMY_NO_KITCHENTYPE_FOUND = "GASTRONOMY_NO_KITCHENTYPE_FOUND",
    GASTRONOMY_CEREMONY = "GASTRONOMY_CEREMONY",
    GASTRONOMY_TYPE_WITH_MUNICIPALITY = "GASTRONOMY_TYPE_WITH_MUNICIPALITY",
    GASTRONOMY_FACILITYTYPE = "GASTRONOMY_FACILITYTYPE",
    GASTRONOMY_TYPE_WITH_CEREMONY = "GASTRONOMY_TYPE_WITH_CEREMONY",
    GASTRONOMY_KITCHENTYPE = "GASTRONOMY_KITCHENTYPE",
    GASTRONOMY_TYPE_WITH_MUNICIPALITY_AND_CEREMONY = "GASTRONOMY_TYPE_WITH_MUNICIPALITY_AND_CEREMONY",
    GASTRONOMY_LOCATION = "GASTRONOMY_LOCATION",
    GASTRONOMY_MORE_INFO = "GASTRONOMY_MORE_INFO",
    PHARMACY_DETAIL_OPENING_TIMES = "PHARMACY_DETAIL_OPENING_TIMES",
    NO_PHARMACIES_FOUND = "NO_PHARMACIES_FOUND",
    NO_CARSHARING_FOUND = "NO_CARSHARING_FOUND",
    TOO_MANY_PHARMACIES_FOUND = "TOO_MANY_PHARMACIES_FOUND",
    PHARMACY_DETAIL_LOCATION = "PHARMACY_DETAIL_LOCATION",
    PHARMACY_DETAIL_OPENING = "PHARMACY_DETAIL_OPENING",
    PHARMACY_MAX_EXCEEDED = "PHARMACY_MAX_EXCEEDED",
    AND_MSG = "AND_MSG",
    HELP_MSG = "HELP_MSG",
    PHARMACY_GENERAL = "PHARMACY_GENERAL",
    GASTRONOMY_GENERAL = "GASTRONOMY_GENERAL",
    SHOP_GENERAL = "SHOP_GENERAL",
    GOODBYE_MSG = "GOODBYE_MSG",
    ERROR_INVALID_MUNICIPALITY = "ERROR_INVALID_MUNICIPALITY",
    ERROR_NO_TOPIC_FOUND = "ERROR_NO_TOPIC_FOUND",
    CARSHARING_SINGLE_AVAILABLE_VEHICLES = "CARSHARING_SINGLE_AVAILABLE_VEHICLES",
    CARSHARING_MULTIPLE_AVAILABLE_VEHICLES = "CARSHARING_MULTIPLE_AVAILABLE_VEHICLES",
    CARSHARING_NO_AVAILABLE_VEHICLES = "CARSHARING_NO_AVAILABLE_VEHICLES",
    CARSHARING_REPROMPT = "CARSHARING_REPROMPT",
    CARSHARING_GENERAL = "CARSHARING_GENERAL",
    SHOPS_REPROMPT = "SHOPS_REPROMPT",
    SHOPS_LOCATION = "SHOPS_LOCATION",
    NO_SHOPS_FOUND = "NO_SHOPS_FOUND",
    SHOP_MAX_EXCEEDED = "SHOP_MAX_EXCEEDED",
    SHOPS_SUBTYPE = "SHOPS_SUBTYPE",
    SHOPS_LOCATON_WITH_SUBTYPE = "SHOPS_LOCATON_WITH_SUBTYPE",
    SHOPS_MORE_INFO = "SHOPS_MORE_INFO",
    ERROR_NO_POITYPE_FOUND = "ERROR_NO_POITYPE_FOUND",
    ERROR_NO_DISTRICTS_FOUND = "ERROR_NO_DISTRICTS_FOUND",
    ERROR_MSG = "ERROR_MSG",
    ERROR_UNEXPECTED_MSG = "ERROR_UNEXPECTED_MSG",
}

export const ApiUrl = "https://tourism.opendatahub.bz.it/api/";
export const AuthToken = "8x0XpxnVP7B8MFyPLM64RZQjfTsAPlX1Y8NwnMA1WiXhXMZq35Y1ZMK876WYjj64xVS_kGFj7SwQT0sVf-_3qALfIUdTF1nNgSKWtPpVoQW5Y8pDjPzKOyk-h0iI0Dny4IWmsBA8NZejLDEEWtn56Vdit3N3oyBwjOP_uosE8V-DGp1DIlWFp_CfeaKVwUWGy_XhA1AgLoGvmUPy-_Gjeujfo809BKSLpr3sgFMf7sbQdYzGQPat9f-J-5dkoclu6yHii2LRWaZUtu6MQvuSCqJl_iDwGR_HfV2r-OY0nd00-e0VzPawuEgmNXyInO64rFuiRbUF9oSEH28oFt47vVZyrm4Aao7xCLlr7p-HmJR0K9yJl5WdbktSRytAJByjVb6-Gbs6atev1884bNm6CkQc7B51ZkrjVBDFpt_hMQirrcJkoj8Gk6h5Lr6qC_HLeVz9z-HSRM-YRLEhJMBQVoQ_XzdensILohv-5pMwyqyey3Yumes0lF6CGc551nHIbvl_M5OMcTyqLpk_lIdje2EJnFF3uoMq-7qQeHD-Qug";

export const ApiUrlChannel = "http://ipchannels.integreen-life.bz.it";

export enum ApiCallTypes {
    EVENT_REDUCED = "EventReduced",
    EVENT_LOCALIZED = "EventLocalized",
    DISTRICT_LOCALIZED = "DistrictLocalized",
    MUNICIPALITY_REDUCED = "MunicipalityReduced",
    POI_LOCALIZED = "PoiLocalized",
    GASTRONOMY_LOCALIZED = "GastronomyLocalized",
    CAR_STATIONS = "/carsharing/rest/get-station-details"
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

export enum WeekDaysNumber {
    MONDAY = 1,
    TUESDAY = 2,
    WEDNESDAY = 3,
    THURSDAY = 4,
    FRIDAY = 5,
    SATURDAY = 6,
    SUNDAY = 0
}

export const WeekDaysMapping = {
    "de": [
        "Sonntag",
        "Montag",
        "Dienstag",
        "Mittwoch",
        "Donnerstag",
        "Freitag",
        "Samstag"
    ],
    "it": [
        "domenica",
        "lunedì",
        "martedì",
        "mercoledì",
        "giovedì",
        "venerdì",
        "sabato"
    ],
    "en": [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday"
    ]
}

export enum GastronomyType {
    FACILITY_CODE = "facilityCode",
    CUISINE_CODE = "cuisineCode"
}