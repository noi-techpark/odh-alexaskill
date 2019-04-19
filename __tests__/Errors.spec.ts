import { skill, RequestWithIntent } from "./helpers";
import { IntentTypes, LocaleTypes, TranslationTypes } from "../lambda/custom/lib/constants";
import { strings } from "../lambda/custom/lib/strings";

describe("Errors", () => {
    it('check if response matches with the deposited translations', async () => {
        const currLang = LocaleTypes.deDE;
        const translations = strings[currLang].translation;

        const response = await skill(RequestWithIntent({
            name: "Intent" as IntentTypes,
            locale: currLang,
        }));
        //@ts-ignore
        expect(response).translationMatch({
            "translations": translations[TranslationTypes.ERROR_MSG]
        });
    })
});
