import { skill, CreateIntentRequest } from "./helpers";
import { LocaleTypes, RequestTypes, TranslationTypes } from "../lambda/custom/lib/constants";
import { strings } from "../lambda/custom/lib/strings";
import { ISlots } from "./helpers";

const getSlots = (): ISlots => {
    return {
        period: {},
        fromdate: {},
        todate: {},
        district: {},
        poiType: {}
    };
}

const currLang = LocaleTypes.deDE;
const translations = strings[currLang].translation;

describe(RequestTypes.GastronomyList, () => {

    it("check general", async () => {

        let shopSlot = getSlots();

        const response = await skill(CreateIntentRequest({
            name: RequestTypes.Shop,
            locale: LocaleTypes.deDE,
            slots: shopSlot
        }));

        // @ts-ignore
        expect(response).translationMatch({
            "translations": translations[TranslationTypes.SHOP_GENERAL],
            // Check also if at least 5 characters exist after the normal phrase, that isn't a whitespace
            "regExpression": `%t(.*\\S{5,})`
        });
    });

    it("check poi type", async () => {

        let shopSlot = getSlots();

        // Set slots
        shopSlot.poiType = {
            value: "getränke",
            resolutions: {
                status: "ER_SUCCESS_MATCH",
                values: [
                    {
                        "name": "Getränke",
                        "id": "1"
                    }
                ]
            }
        };

        const response = await skill(CreateIntentRequest({
            name: RequestTypes.Shop,
            locale: LocaleTypes.deDE,
            slots: shopSlot
        }));

        // @ts-ignore
        expect(response).translationMatch({
            "translations": translations[TranslationTypes.SHOPS_SUBTYPE],
            "attributes": {
                type: shopSlot.poiType
            },
            // Check also if at least 5 characters exist after the normal phrase, that isn't a whitespace
            "regExpression": `%t(.*\\S{5,})`
        });
    });

    it("check district", async () => {

        let shopSlot = getSlots();

        const districts = {
            "de-DE": {
                key: "Olang",
                value: "niederolang"
            }
        }
        // Set slots
        shopSlot.district = {
            value: districts[currLang].value
        };

        const response = await skill(CreateIntentRequest({
            name: RequestTypes.Shop,
            locale: LocaleTypes.deDE,
            slots: shopSlot
        }));

        // @ts-ignore
        expect(response).translationMatch({
            "translations": translations[TranslationTypes.SHOPS_LOCATION],
            "attributes": {
                municipality: districts[currLang].key
            },
            // Check also if at least 5 characters exist after the normal phrase, that isn't a whitespace
            "regExpression": `%t(.*\\S{5,})`
        });
    });

    it("check poi type with district", async () => {

        let shopSlot = getSlots();

        const districts = {
            "de-DE": {
                key: "Olang",
                value: "niederolang"
            }
        }
        // Set slots
        shopSlot.poiType = {
            value: "laptop",
            resolutions: {
                status: "ER_SUCCESS_MATCH",
                values: [
                    {
                        "name": "Computerzubehör Technik",
                        "id": "8"
                    }
                ]
            }
        };

        shopSlot.district = {
            value: districts[currLang].value
        };

        const response = await skill(CreateIntentRequest({
            name: RequestTypes.Shop,
            locale: LocaleTypes.deDE,
            slots: shopSlot
        }));

        // @ts-ignore
        expect(response).translationMatch({
            "translations": translations[TranslationTypes.SHOPS_LOCATON_WITH_SUBTYPE],
            "attributes": {
                type: shopSlot.poiType,
                municipality: districts[currLang].key
            },
            // Check also if at least 5 characters exist after the normal phrase, that isn't a whitespace
            "regExpression": `%t(.*\\S{5,})`
        });
    });
});
