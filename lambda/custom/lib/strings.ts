// @ts-ignore
import { Resource } from "i18next";
import { LocaleTypes } from "./constants";
import { ITranslations } from "./../interfaces/ITranslations";

export const strings: Resource = {
    [LocaleTypes.deDE]: {
        translation: {
            SKILL_NAME: "data hub",
            GREETING_MSG: [
                "Herzlich willkommen im %skill% Alexa Skill. Ich kann dir Informationen zu Restaurants, Events, Geschäften und Apotheken geben. Wie kann ich dir behilflich sein?",
                "Hallo, willkommen im %skill% Alexa Skill. Wie kann ich dir behilflich sein? Ich kann dir Informationen zu Restaurants, Events, Geschäften und Apotheken geben. Was möchtest du wissen?"
            ],
            EVENT_TOPIC: [
                "Zum Thema %topic% konnte ich folgende Einträge finden:",
            ],
            EVENT_TOPIC_WITH_MUNICIPALITY: [
                "In %municipality% konnte ich zum Thema %topic% folgende Einträge finden:",
                "Folgende Veranstaltungen konnte ich in %municipality% zum Thema %topic% finden:",
                "In %municipality% konnte ich folgende Events zum Thema %topic% finden:",
            ],
            EVENT_LOCATION: [
                "In %municipality% konnte ich folgende Einträge finden:",
                "In %municipality% konnte ich folgende Events finden:",
                "In %municipality% konnte ich folgende Veranstaltungen finden:",
                "Folgende Veranstaltungen konnte ich in %municipality% finden:",
            ],
            EVENT_MSG_SINGLE_DATE: [
                "Am %date% finden folgenden Veranstaltungen statt:",
                "Folgende Events finden am %date% statt:"
            ],
            EVENT_MSG_SINGLE_DATE_WITH_TOPIC: [
                "Am %date% finden folgenden Events zum Thema %topic% statt:",
                "Folgende Events finden am %date% zum Thema %topic% statt:"
            ],
            EVENT_MSG_MULTIPLE_DATES: [
                "Vom %fromdate% bis zum %todate% finden folgende Events statt:"
            ],
            EVENT_MSG_MULTIPLE_DATES_WITH_TOPIC: [
                "Vom %fromdate% bis zum %todate% finden folgende Events zum Thema %topic% statt:"
            ],
            EVENT_REPROMPT: [
                "Möchtest du mehr Event Vorschläge erhalten oder mehr Informationen zu einem Event bekommen?",
                "Möchtest du noch weitere Vorschläge oder mehr Informationen zu einer bestimmten Veranstaltungen bekommen?",
                "Konnte ich bereits dein Interesse für ein bestimmtes Event wecken oder möchtest du noch weitere Vorschläge bekommen?"
            ],
            EVENT_MORE_INFO: [
                "Möchtest du mehr Informationen zu einem Event bekommen?",
                "Möchten du mehr Informationen zu einer Veranstaltungen bekommen?"
            ],
            EVENT_MUNICIPALITY_CHOOSE: "Meinten Sie Percha oder Algund?",
            EVENT_MAX_EXCEEDED: [
                "Es sind leider keine weiteren Events mit diesen Kriterien verfügbar.",
                "Es sind leider keine weiteren Events mit diesen Suchkriterien verfügbar.",
                "Zu diesen Suchkriterien konnte ich leider keine weiteren Events finden."
            ],
            NO_EVENTS_FOUND: [
                "Es konnten leider keine Events mit diesen Suchkriterien gefunden werden."
            ],
            SHOPS_REPROMPT: [
                "Möchtest du mehr Vorschläge zu Shops erhalten oder mehr Informationen zu einem Geschäft bekommen?",
                "Möchtest du noch weitere Vorschläge oder mehr Informationen zu einem bestimmten Shop bekommen?",
                "Konnte ich bereits dein Interesse für ein bestimmtes Geschäft wecken oder möchtest du noch weitere Vorschläge bekommen?"
            ],
            SHOPS_MORE_INFO: [
                "Möchtest du mehr Informationen zu einem Shop bekommen?",
                "Möchten du mehr Informationen zu einem Geschäft bekommen?"
            ],
            NO_SHOPS_FOUND: [
                "Es konnten leider keine Shops mit diesen Suchkriterien gefunden werden.",
                "Es konnten leider keine Geschäfte mit diesen Suchkriterien gefunden werden."
            ],
            EVENTS_GENERAL: [
                "Folgende Einträge konnte ich finden: ",
                "Folgende Events konnte ich finden: "
            ],
            PHARMACY_GENERAL: [
                "Folgende Einträge konnte ich finden: ",
                "Folgende Apotheken konnte ich finden: "
            ],
            GASTRONOMY_GENERAL: [
                "Folgende Einträge konnte ich finden: ",
                "Folgende Restaurants konnte ich finden: "
            ],
            CARSHARING_GENERAL: [
                "Folgende Einträge konnte ich finden: ",
                "Folgende Car Sharing Angebote konnte ich finden: "
            ],
            SHOP_GENERAL: [
                "Folgende Einträge konnte ich finden: ",
                "Folgende Shops konnte ich finden: "
            ],
            PHARMACY_MSG_SINGLE_DATE_WITH_DISTRICT: [
                "Am %date% haben folgenden Apotheken in %municipality% geöffnet:",
                "Folgende Apotheken haben am %date% in %municipality% geöffnet:"
            ],
            PHARMACY_MSG_SINGLE_DATE: [
                "Am %date% haben folgenden Apotheken geöffnet:",
                "Folgende Apotheken haben am %date% geöffnet:"
            ],
            PHARMACY_LOCATION: [
                "In %municipality% konnte ich folgende Apotheken finden:",
                "Folgende Apotheken konnte ich in %municipality% finden:",
            ],
            PHARMACY_MSG_MULTIPLE_DATES: [
                "Vom %fromdate% bis zum %todate% haben folgende Apotheke geöffnet:"
            ],
            PHARMACY_MSG_MULTIPLE_DATES_WITH_DISTRICT: [
                "Vom %fromdate% bis zum %todate% haben folgende Apotheke in %municipality% geöffnet:"
            ],
            PHARMACY_MAX_EXCEEDED: [
                "Es sind leider keine weiteren Apotheken mit diesen Kriterien verfügbar.",
                "Es sind leider keine weiteren Apotheken mit diesen Suchkriterien verfügbar.",
                "Zu diesen Suchkriterien konnte ich leider keine weiteren Apotheken finden."
            ],
            PHARMACY_REPROMPT: [
                "Möchtest du mehr Vorschläge zu Apotheken erhalten oder mehr Informationen zu einer Apotheke bekommen?",
                "Möchtest du noch weitere Vorschläge oder mehr Informationen zu einer bestimmten Apotheke bekommen?"
            ],
            PHARMACY_DETAIL_LOCATION: [
                "%pharmacy% befindet sich in %address%, %zipCode% %city%."
            ],
            PHARMACY_NO_OPENING_TIMES_AVAILABLE: "Derzeit liegen mir keine Öffnungszeiten für diese Apotheke vor.",
            PHARMACY_DETAIL_OPENING: "Vom %fromdate% bis zum %todate% sind die Öffnungszeiten: ",
            PHARMACY_DETAIL_OPENING_TIMES: " von %from% bis %to%",
            PHARMACY_DETAIL: [
                "%pharmacy% befindet sich in %address%, %zipCode% %city%."
            ],
            GASTRONOMY_KITCHENTYPE: [
                "Mit %type% konnte ich folgende Einträge finden: ",
                "Folgende Restaurants konnte ich mit %type% finden: ",
            ],
            GASTRONOMY_CEREMONY: [
                "Für %ceremony% konnte ich folgende Einträge finden: ",
                "Folgende Restaurants konnte ich für %ceremony% finden: ",
            ],
            GASTRONOMY_LOCATION: [
                "In %municipality% konnte ich folgende Restaurants finden: ",
                "Folgende Restaurants konnte ich in %municipality% finden: ",
            ],
            GASTRONOMY_MORE_INFO: [
                "Möchtest du mehr Informationen zu einem Restaurant bekommen?"
            ],
            GASTRONOMY_TYPE_WITH_MUNICIPALITY: [
                "In %municipality% konnte ich mit %type% folgende Einträge finden: ",
                "Folgende Restaurants konnte ich in %municipality% mit %type% finden: ",
                "In %municipality% konnte ich folgende Restaurants mit %type% finden: ",
            ],
            GASTRONOMY_TYPE_WITH_MUNICIPALITY_AND_CEREMONY: [
                "In %municipality% konnte ich mit %type% für %ceremony% folgende Einträge finden: ",
                "Folgende Restaurants konnte ich in %municipality% mit %type% für %ceremony% finden: ",
                "In %municipality% konnte ich folgende Restaurants mit %type% für %ceremony% finden: ",
            ],
            GASTRONOMY_TYPE_WITH_CEREMONY: [
                "Mit %type% konnte ich folgende Restaurants für %ceremony% finden: ",
                "Folgende Restaurants mit %type% konnte ich für %ceremony%% finden: "
            ],
            GASTRONOMY_MAX_EXCEEDED: [
                "Es sind leider keine weiteren Restaurants mit diesen Kriterien verfügbar.",
                "Es sind leider keine weiteren Restaurants mit diesen Suchkriterien verfügbar.",
                "Zu diesen Suchkriterien konnte ich leider keine weiteren Restaurants finden."
            ],
            GASTRONOMY_REPROMPT: [
                "Möchtest du mehr Restaurant Vorschläge erhalten oder mehr Informationen zu einem Restaurant bekommen?",
                "Möchtest du noch weitere Vorschläge oder mehr Informationen zu einem bestimmten Restaurant bekommen?",
                "Konnte ich bereits dein Interesse für ein bestimmtes Restaurant wecken oder möchtest du noch weitere Vorschläge bekommen?"
            ],
            NO_GASTRONOMY_FOUND: [
                "Es konnten leider keine Restaurants mit diesen Suchkriterien gefunden werden."
            ],
            PHARMACY_MORE_INFO: "Möchtest du mehr Informationen zu einer Apotheke bekommen?",
            TOO_MANY_PHARMACIES_FOUND: [
                "Wir konnten %count% weitere Apotheken mit diesen Suchkriterien finden. Bitte frag genauer nach.",
                "%count% weitere Apotheken konnten ich mit diesen Suchkriterien finden. Bitte frag genauer nach.",
            ],
            SHOPS_LOCATION: [
                "In %municipality% konnte ich folgende Geschäfte finden: ",
                "In %municipality% konnte ich folgende Shops finden: ",
                "Folgende Shops konnte ich in %municipality% finden: ",
            ],
            SHOP_MAX_EXCEEDED: [
                "Es sind leider keine weiteren Shops mit diesen Kriterien verfügbar.",
                "Es sind leider keine weiteren Geschäfte mit diesen Suchkriterien verfügbar.",
                "Zu diesen Suchkriterien konnte ich leider keine weiteren Shops finden."
            ],
            SHOPS_SUBTYPE: [
                "Zu den Shops mit der Kategorie %type% konnte ich folgende Einträge finden: "
            ],
            SHOPS_LOCATON_WITH_SUBTYPE: [
                "In %municipality% konnte ich folgende Geschäfte mit der Kategorie %type% finden: ",
                "In %municipality% konnte ich folgende Shops mit der Kategorie %type% finden: ",
                "Folgende Shops konnte ich mit der Kategorie %type% in %municipality% finden: ",
            ],
            CARSHARING_SINGLE_AVAILABLE_VEHICLES: [
                "%name% %municipality% hat %availableVehicels% Fahrzeug verfügbar. "
            ],
            CARSHARING_MULTIPLE_AVAILABLE_VEHICLES: [
                "%name% %municipality% hat %availableVehicels% Fahrzeuge verfügbar. "
            ],
            CARSHARING_NO_AVAILABLE_VEHICLES: [
                "%name% %municipality% ist kein Fahrzeug verfügbar. "
            ],
            CARSHARING_REPROMPT: [
                "Möchtest du mehr Car Sharing Angebote erhalten?",
                "Möchtest du noch weitere Vorschläge bekommen?"
            ],
            NO_PHARMACIES_FOUND: [
                "Es konnten leider keine Apotheken mit diesen Suchkriterien gefunden werden."
            ],
            NO_CARSHARING_FOUND: [
                "Es konnten leider keine Car Sharing Angebote mit diesen Suchkriterien gefunden werden."
            ],
            HELP_MSG: [
                "Frage mich nach einem Restaurant in der Nähe, der nächstgelegenen, geöffneten Apotheke oder nach Einkaufsgeschäften."
            ],
            GOODBYE_MSG: [
                "Tschüss, bis zum nächsten Mal. Dein Team von IDM Südtirol.",
                "Servus, bis zum nächsten Mal. Dein Team von IDM Südtirol."
            ],
            AND_MSG: "und",
            ERROR_INVALID_MUNICIPALITY: "Leider ist der von dir angegebene Ort nicht gültig.",
            ERROR_NO_POITYPE_FOUND: "Leider konnte ich die von dir angegebene Shop Kategorie nicht finden.",
            ERROR_NO_TOPIC_FOUND: "Leider konnte ich das von dir angegebene Thema nicht finden.",
            GASTRONOMY_NO_KITCHENTYPE_FOUND: "Leider konnte ich den von dir angegebenen Restaurant Typ nicht finden.",
            ERROR_NO_DISTRICTS_FOUND: "Leider konnte ich den von dir angegebenen Ort nicht finden.",
            ERROR_MSG: [
                "Entschuldigung, diesen Befehl verstehe ich leider nicht. Bitte versuchen Sie es erneut.",
                "Leider verstehe ich diesen Befehl nicht. Versuchen Sie es gerne erneut."
            ],
            ERROR_UNEXPECTED_MSG: "Entschuldigung, es ist leider ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es später erneut."
        } as ITranslations,
    },
    [LocaleTypes.itIT]: {
        translation: {
            SKILL_NAME: "data hub",
            GREETING_MSG: [
                "Herzlich willkommen im %s Alexa Skill. Ich kann dir Informationen zu Restaurants, Events, Geschäften, Car sharing, Busfahrzeiten und Apotheken geben. Wie kann ich dir behilflich sein?",
                "Hallo, willkommen im %s Alexa Skill. Wie kann ich dir behilflich sein? Ich kann dir Informationen zu Restaurants, Events, Geschäften, Car sharing, Busfahrzeiten und Apotheken geben. Was möchtest du wissen?"
            ],
            HELP_MSG: [
                "Frage mich nach einem Restaurant in der Nähe, der nächstgelegenen, geöffneten Apotheke oder nach Einkaufsgeschäften."
            ],
            GOODBYE_MSG: [
                "Tschüss, bis zum nächsten Mal.",
                "Servus, bis zum nächsten Mal"
            ],
            ERROR_MSG: [
                "Entschuldigung, diesen Befehl verstehe ich leider nicht. Bitte versuchen Sie es erneut."
            ],
            ERROR_UNEXPECTED_MSG: "Entschuldigung, es ist leider ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es später erneut."
        } as ITranslations,
    },
    [LocaleTypes.enUS]: {
        translation: {
            SKILL_NAME: "data hub",
            GREETING_MSG: [
                "Herzlich willkommen im %s Alexa Skill. Ich kann dir Informationen zu Restaurants, Events, Geschäften, Car sharing, Busfahrzeiten und Apotheken geben. Wie kann ich dir behilflich sein?",
                "Hallo, willkommen im %s Alexa Skill. Wie kann ich dir behilflich sein? Ich kann dir Informationen zu Restaurants, Events, Geschäften, Car sharing, Busfahrzeiten und Apotheken geben. Was möchtest du wissen?"
            ],
            HELP_MSG: [
                "Frage mich nach einem Restaurant in der Nähe, der nächstgelegenen, geöffneten Apotheke oder nach Einkaufsgeschäften."
            ],
            GOODBYE_MSG: [
                "Tschüss, bis zum nächsten Mal.",
                "Servus, bis zum nächsten Mal"
            ],
            ERROR_MSG: [
                "Entschuldigung, diesen Befehl verstehe ich leider nicht. Bitte versuchen Sie es erneut."
            ],
            ERROR_UNEXPECTED_MSG: "Entschuldigung, es ist leider ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es später erneut."
        } as ITranslations,
    }
};
