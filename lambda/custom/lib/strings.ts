// @ts-ignore
import { Resource } from "i18next";
import { LocaleTypes } from "./constants";
import {ITranslations} from "./../interfaces/ITranslations";

export const strings: Resource = {
    [LocaleTypes.deDE]: {
        translation: {
            SKILL_NAME: "data hub",
            GREETING_MSG: [
                "Herzlich willkommen im %s Alexa Skill. Ich kann dir Informationen zu Restaurants, Events, Geschäften, Car sharing, Busfahrzeiten und Apotheken geben. Wie kann ich dir behilflich sein?",
                "Hallo, willkommen im %s Alexa Skill. Wie kann ich dir behilflich sein? Ich kann dir Informationen zu Restaurants, Events, Geschäften, Car sharing, Busfahrzeiten und Apotheken geben. Was möchtest du wissen?"
            ],
            EVENT_MSG_SINGLE_DATE: [
                "Am %s finden folgenden Events statt: %s",
                "Folgende Events finden am %s statt: %s"
            ],
            EVENT_MSG_MULTIPLE_DATES: [
                "Vom %s bis zum %s finden folgende Events statt: %s"
            ],
            EVENT_REPROMPT: [
                "Möchten Sie mehr Event Vorschläge erhalten oder mehr Informationen zu einem Event bekommen?",
                "Möchten Sie noch weitere Vorschläge oder mehr Informationen zu einem bestimmten Event bekommen?",
                "Konnten wir bereits Ihr Interesse an einem bestimmten Event wecken oder möchten sie noch weitere Vorschläge bekommen"
            ],
            EVENT_MORE_INFO: "Möchten Sie mehr Informationen zu einem Event bekommen?",
            EVENT_MAX_EXCEEDED: "Es sind leider keine weiteren Events für diesen Zeitraum verfügbar.",
            NO_EVENTS_FOUND: [
                "Es konnten leider keine Events mit diesen Suchkriterien gefunden werden."
            ],
            HELLO_MSG: "hallo ich bin data hub",
            HELP_MSG: [
                "Frage mich nach einem Restaurant in der Nähe, der nächstgelegenen, geöffneten Apotheke oder nach Einkaufsgeschäften."
            ],
            GOODBYE_MSG: [
                "Tschüss, bis zum nächsten Mal. Dein Team von IDM Südtirol.",
                "Servus, bis zum nächsten Mal. Dein Team von IDM Südtirol."
            ],
            AND_MSG: "und",
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
            HELLO_MSG: "hallo ich bin data hub",
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
            HELLO_MSG: "hallo ich bin data hub",
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
