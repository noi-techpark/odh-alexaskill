import { skill, RequestWithIntent, RequestWithType } from "./helpers";
import { IntentTypes, LocaleTypes, TranslationTypes, RequestTypes } from "../lambda/custom/lib/constants";
import { strings } from "../lambda/custom/lib/strings";

describe("BuiltIn Intents", () => {
    it("Launch", async () => {
        const currLang = LocaleTypes.deDE;
        const translations = strings[currLang].translation;
        const skillName = translations[TranslationTypes.SKILL_NAME];
        
        const response = await skill(RequestWithType({
            type: RequestTypes.Launch,
            locale: LocaleTypes.deDE,
        }));

        // @ts-ignore
        expect(response).translationMatch({
            "translations": translations[TranslationTypes.GREETING_MSG],
            "attributes": {
                "skill": skillName
            }
        });
    });
    it("Help", async () => {
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

    it("Stop", async () => {
        const currLang = LocaleTypes.deDE;
        const translations = strings[currLang].translation;
        
        const response = await skill(RequestWithIntent({
            name: IntentTypes.Stop,
            locale: LocaleTypes.deDE,
        }));

        // @ts-ignore
        expect(response).translationMatch({
            "translations": translations[TranslationTypes.GOODBYE_MSG]
        });
    });

    // it("Cancel", async () => {
    //     const response = await skill(RequestWithIntent({
    //         name: IntentTypes.Cancel,
    //         locale: LocaleTypes.deDE,
    //     }));
    //     expect(response).toMatchObject(ssml(/Goodbye/gi));
    // });

    // it("Fallback", async () => {
    //     const response = await skill(RequestWithIntent({
    //         name: IntentTypes.Fallback,
    //         locale: LocaleTypes.deDE,
    //     }));
    //     expect(response).toMatchObject(ssml(/Entschuldigung, diesen Befehl verstehe ich leider nicht. Bitte versuchen Sie es erneut./gi));
    // });
});
