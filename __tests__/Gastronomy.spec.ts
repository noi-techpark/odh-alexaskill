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

    it("check general", async () => {

        let gastronomySlot = getSlots();

        const response = await skill(CreateIntentRequest({
            name: RequestTypes.GastronomyList,
            locale: LocaleTypes.deDE,
            slots: gastronomySlot
        }));

        // @ts-ignore
        expect(response).translationMatch({
            "translations": translations[TranslationTypes.GASTRONOMY_GENERAL],
            // Check also if at least 5 characters exist after the normal phrase, that isn't a whitespace
            "regExpression": `%t(.*\\S{5,})`
        });
    });

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

    it("check district type", async () => {

        let gastronomySlot = getSlots();

        // Set slots
        gastronomySlot.district = {
            value: "Niederdorf"
        };

        const response = await skill(CreateIntentRequest({
            name: RequestTypes.GastronomyList,
            locale: LocaleTypes.deDE,
            slots: gastronomySlot
        }));

        // @ts-ignore
        expect(response).translationMatch({
            "translations": translations[TranslationTypes.GASTRONOMY_LOCATION],
            "attributes": {
                municipality: gastronomySlot.district.value
            },
            // Check also if at least 5 characters exist after the normal phrase, that isn't a whitespace
            "regExpression": `%t(.*\\S{5,})`
        });
    });

    it("check gastronomy type", async () => {

        let gastronomySlot = getSlots();

        // Set slots
        gastronomySlot.gastronomyType = {
            value: "gourmet Küche",
            resolutions: {
                status: "ER_SUCCESS_MATCH",
                values: [
                    {
                        "name": "Gourmet Küche",
                        "id": "cuisineCode_64"
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
            "translations": translations[TranslationTypes.GASTRONOMY_KITCHENTYPE],
            "attributes": {
                type: gastronomySlot.gastronomyType
            },
            // Check also if at least 5 characters exist after the normal phrase, that isn't a whitespace
            "regExpression": `%t(.*\\S{5,})`
        });
    });

    it("check gastronomy type with ceremony type", async () => {

        let gastronomySlot = getSlots();

        // Set slots
        gastronomySlot.gastronomyType = {
            value: "gourmet Küche",
            resolutions: {
                status: "ER_SUCCESS_MATCH",
                values: [
                    {
                        "name": "Gourmet Küche",
                        "id": "cuisineCode_64"
                    }
                ]
            }
        };

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
            "translations": translations[TranslationTypes.GASTRONOMY_TYPE_WITH_CEREMONY],
            "attributes": {
                type: gastronomySlot.gastronomyType,
                ceremony: gastronomySlot.ceremonyType
            },
            // Check also if at least 5 characters exist after the normal phrase, that isn't a whitespace
            "regExpression": `%t(.*\\S{5,})`
        });
    });

    it("check district with gastronomy type", async () => {

        let gastronomySlot = getSlots();

        // Set slots
        gastronomySlot.district = {
            value: "Prags"
        };

        gastronomySlot.gastronomyType = {
            value: "gourmet Küche",
            resolutions: {
                status: "ER_SUCCESS_MATCH",
                values: [
                    {
                        "name": "Gourmet Küche",
                        "id": "cuisineCode_64"
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
            "translations": translations[TranslationTypes.GASTRONOMY_TYPE_WITH_MUNICIPALITY],
            "attributes": {
                type: gastronomySlot.gastronomyType,
                municipality: gastronomySlot.district.value
            },
            // Check also if at least 5 characters exist after the normal phrase, that isn't a whitespace
            "regExpression": `%t(.*\\S{5,})`
        });
    });

    it("check district with gastronomy type and ceremony type", async () => {

        let gastronomySlot = getSlots();

        // Set slots
        gastronomySlot.district = {
            value: "Olang"
        };

        gastronomySlot.gastronomyType = {
            value: "grillspezialitäten",
            resolutions: {
                status: "ER_SUCCESS_MATCH",
                values: [
                    {
                        "name": "Grillspezialitäten",
                        "id": "cuisineCode_32768"
                    }
                ]
            }
        };

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
            "translations": translations[TranslationTypes.GASTRONOMY_TYPE_WITH_MUNICIPALITY_AND_CEREMONY],
            "attributes": {
                type: gastronomySlot.gastronomyType,
                municipality: gastronomySlot.district.value,
                ceremony: gastronomySlot.ceremonyType
            },
            // Check also if at least 5 characters exist after the normal phrase, that isn't a whitespace
            "regExpression": `%t(.*\\S{5,})`
        });
    });
});
