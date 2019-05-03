import { skill, CreateIntentRequest, addDays } from "./helpers";
import { LocaleTypes, RequestTypes, TranslationTypes } from "../lambda/custom/lib/constants";
import { strings } from "../lambda/custom/lib/strings";
import { ISlots } from "./helpers";
import { dateFormat } from "../lambda/custom/lib/helpers";

const getSlots = (): ISlots => {
    return {
        period: {},
        fromdate: {},
        todate: {},
        district: {}
    };
}

const currLang = LocaleTypes.deDE;
const lang = "de";
const translations = strings[currLang].translation;

describe(RequestTypes.Pharmacy, () => {
    it("check general", async () => {

        // Set slots
        let pharmacySlot = getSlots();

        const response = await skill(CreateIntentRequest({
            name: RequestTypes.Pharmacy,
            locale: LocaleTypes.deDE,
            slots: pharmacySlot
        }));

        // @ts-ignore
        expect(response).translationMatch({
            "translations": translations[TranslationTypes.PHARMACY_GENERAL],
            // Check also if at least 5 characters exist after the normal phrase, that isn't a whitespace
            "regExpression": `%t(.*\\S{5,})`
        });
    });

    it("check single date", async () => {

        // Set slots
        let pharmacySlot = getSlots();

        pharmacySlot.period = {
            "value": addDays(new Date(), 2)
        };

        const response = await skill(CreateIntentRequest({
            name: RequestTypes.Pharmacy,
            locale: LocaleTypes.deDE,
            slots: pharmacySlot
        }));

        const date = dateFormat({
            date: pharmacySlot.period.value as string,
            lang,
            format: "dddd, DD MMMM YYYY"
        });

        // @ts-ignore
        expect(response).translationMatch({
            "translations": translations[TranslationTypes.PHARMACY_MSG_SINGLE_DATE],
            "attributes": {
                date
            },
            // Check also if at least 5 characters exist after the normal phrase, that isn't a whitespace
            "regExpression": `%t(.*\\S{5,})`
        });
    });

    it("check multiple date", async () => {

        let pharmacySlot = getSlots();

        // Set slots
        pharmacySlot.fromdate = {
            "value": addDays(new Date(), 80)
        };

        pharmacySlot.todate = {
            "value": addDays(new Date(), 85)
        };

        const response = await skill(CreateIntentRequest({
            name: RequestTypes.Pharmacy,
            locale: LocaleTypes.deDE,
            slots: pharmacySlot
        }));

        const fromdate = dateFormat({
            date: pharmacySlot.fromdate.value as string,
            lang,
            format: "dddd, DD MMMM"
        });

        const todate = dateFormat({
            date: pharmacySlot.todate.value as string,
            lang,
            format: "dddd, DD MMMM YYYY"
        });

        // @ts-ignore
        expect(response).translationMatch({
            "translations": translations[TranslationTypes.PHARMACY_MSG_MULTIPLE_DATES],
            "attributes": {
                fromdate,
                todate
            },
            // Check also if at least 5 characters exist after the normal phrase, that isn't a whitespace
            "regExpression": `%t(.*\\S{5,})`
        });
    });

    it("check district", async () => {

        let pharmacySlot = getSlots();

        pharmacySlot.district = {
            value: "Olang"
        };

        const response = await skill(CreateIntentRequest({
            name: RequestTypes.Pharmacy,
            locale: LocaleTypes.deDE,
            slots: pharmacySlot
        }));

        // @ts-ignore
        expect(response).translationMatch({
            "translations": translations[TranslationTypes.PHARMACY_LOCATION],
            "attributes": {
                municipality: pharmacySlot.district.value
            },
            // Check also if at least 5 characters exist after the normal phrase, that isn't a whitespace
            "regExpression": `%t(.*\\S{5,})`
        });
    });

    it("check fromdate && todate && district", async () => {

        let pharmacySlot = getSlots();

        // Set slots
        pharmacySlot.district = {
            value: "niederolang",
            resolutions: {
                status: "ER_SUCCESS_MATCH",
                values: [
                    {
                        "name": "Olang"
                    }
                ]
            }
        };

        pharmacySlot.fromdate = {
            "value": addDays(new Date(), 10)
        };

        pharmacySlot.todate = {
            "value": addDays(new Date(), 12)
        };

        const fromdate = dateFormat({
            date: pharmacySlot.fromdate.value as string,
            lang,
            format: "dddd, DD MMMM"
        });

        const todate = dateFormat({
            date: pharmacySlot.todate.value as string,
            lang,
            format: "dddd, DD MMMM YYYY"
        });

        const response = await skill(CreateIntentRequest({
            name: RequestTypes.Pharmacy,
            locale: LocaleTypes.deDE,
            slots: pharmacySlot
        }));

        // @ts-ignore
        expect(response).translationMatch({
            "translations": translations[TranslationTypes.PHARMACY_MSG_MULTIPLE_DATES_WITH_DISTRICT],
            "attributes": {
                fromdate,
                todate,
                municipality: pharmacySlot.district
            },
            // Check also if at least 5 characters exist after the normal phrase, that isn't a whitespace
            "regExpression": `%t(.*\\S{5,})`
        });
    });
});
