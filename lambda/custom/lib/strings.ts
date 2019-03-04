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
            HELLO_MSG: "hallo ich bin data hub",
            HELP_MSG: [
                "Frage mich nach einem Restaurant in der Nähe, der nächstgelegenen, geöffneten Apotheke oder nach Einkaufsgeschäften."
            ],
            GOODBYE_MSG: [
                "Tschüss, bis zum nächsten Mal. Dein Team von IDM Südtirol.",
                "Servus, bis zum nächsten Mal. Dein Team von IDM Südtirol."
            ],
            ERROR_MSG: "Sorry, I can't understand the command. Please say again.",
            ERROR_UNEXPECTED_MSG: "Sorry, an unexpected error has occured. Please try again later.",
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
            ERROR_MSG: "Sorry, I can't understand the command. Please say again.",
            ERROR_UNEXPECTED_MSG: "Sorry, an unexpected error has occured. Please try again later.",
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
            ERROR_MSG: "Sorry, I can't understand the command. Please say again.",
            ERROR_UNEXPECTED_MSG: "Sorry, an unexpected error has occured. Please try again later.",
        } as ITranslations,
    }
};
