import { TranslationTypes } from "./../lib/constants";

export interface ITranslations {
    [TranslationTypes.SKILL_NAME]: string;
    [TranslationTypes.HELLO_MSG]: string;
    [TranslationTypes.GREETING_MSG]: Array<string>;
    [TranslationTypes.HELP_MSG]: Array<string>;
    [TranslationTypes.GOODBYE_MSG]: Array<string>;
    [TranslationTypes.ERROR_MSG]: string;
    [TranslationTypes.ERROR_UNEXPECTED_MSG]: string;
}