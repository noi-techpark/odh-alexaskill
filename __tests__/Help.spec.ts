import { skill, RequestWithIntent } from "./helpers";
import { LocaleTypes, IntentTypes, TranslationTypes } from "../lambda/custom/lib/constants";
import { strings } from "../lambda/custom/lib/strings";

describe("Help intent", () => {
    it("check if response matches with the deposited translations", async () => {
        const currLang = LocaleTypes.deDE;
        const translations = strings[currLang].translation;
        
        const response = await skill(RequestWithIntent({
            name: IntentTypes.Help,
            locale: LocaleTypes.deDE,
        }));

        // @ts-ignore
        expect(response).translationMatch({
            "translations": translations[TranslationTypes.HELP_MSG]
        });
    });
});
