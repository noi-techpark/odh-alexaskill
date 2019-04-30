import { skill, CreateIntentRequest } from "./helpers";
import { LocaleTypes, RequestTypes, TranslationTypes } from "../lambda/custom/lib/constants";
import { strings } from "../lambda/custom/lib/strings";
import { ISlots } from "./helpers";

const getSlots = (): ISlots => {
    return {
        ceremonyType: {},
        gastronomyType: {},
        district: {}
    };
}

const currLang = LocaleTypes.deDE;
const translations = strings[currLang].translation;

describe(RequestTypes.GastronomyList, () => {
    it("check cerememony type", async () => {

        let gastronomySlot = getSlots();

        // Set slots
        gastronomySlot.ceremonyType = {
            value: "familie",
            resolutions: {
                status: "ER_SUCCESS_MATCH",
                values: [
                    {
                        "name": "Familienfeiern",
                        "id": "1"
                    }
                ]
            }
        };

        const response = await skill(CreateIntentRequest({
            name: RequestTypes.GastronomyList,
            locale: LocaleTypes.deDE,
            slots: gastronomySlot
        }));

        // @ts-ignore
        expect(response).translationMatch({
            "translations": translations[TranslationTypes.GASTRONOMY_CEREMONY],
            "attributes": {
                ceremony: gastronomySlot.ceremonyType
            },
            // Check also if at least 5 characters exist after the normal phrase, that isn't a whitespace
            "regExpression": `%t(.*\\S{5,})`
        });
    });
});
