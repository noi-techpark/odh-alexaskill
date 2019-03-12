// @ts-ignore
import { Resource } from "i18next";
import { LocaleTypes } from "./constants";
import {ITranslations} from "./../interfaces/ITranslations";

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
                "Am %date% finden folgenden Events statt:",
                "Folgende Events finden am %date% statt:"
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
            PHARMACY_MSG_SINGLE_DATE: [
                "Am %date% haben folgenden Apotheken geöffnet:",
                "Folgende Apotheken haben am %date% geöffnet:"
            ],
            PHARMACY_LOCATION: [
                "In %municipality% konnte ich folgende Apotheken finden:",
                "Folgende Apotheken konnte ich in %municipality% finden:",
            ],
            PHARMACY_MSG_MULTIPLE_DATES: [
                "Vom %fromdate% bis zum %todate% haben folgenden Apotheken geöffnet:"
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
            PHARMACY_MORE_INFO: "Möchtest du mehr Informationen zu einer Apotheke bekommen?",
            NO_PHARMACIES_FOUND: [
                "Es konnten leider keine Apotheken mit diesen Suchkriterien gefunden werden."
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
            ERROR_NO_TOPIC_FOUND: "Leider konnte ich das von dir angegebene Thema nicht finden.",
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
