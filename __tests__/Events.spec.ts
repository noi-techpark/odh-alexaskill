import { skill, RequestWithType } from "./helpers";
import { LocaleTypes, RequestTypes, TranslationTypes } from "../lambda/custom/lib/constants";
import { strings } from "../lambda/custom/lib/strings";

describe("Help intent", () => {
    it("check if response matches with the deposited translations", async () => {
        const currLang = LocaleTypes.deDE;
        const translations = strings[currLang].translation;
        
        const response = await skill(RequestWithType({
            type: RequestTypes.Event,
            locale: LocaleTypes.deDE,
        }));

        // @ts-ignore
        expect(response).translationMatch({
            "translations": translations[TranslationTypes.HELP_MSG]
        });
    });
});
