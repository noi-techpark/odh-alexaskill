import { skill, CreateIntentRequest, addDays } from "./helpers";
import { LocaleTypes, RequestTypes, TranslationTypes } from "../lambda/custom/lib/constants";
import { strings } from "../lambda/custom/lib/strings";
import { ISlots } from "./helpers";
import { dateFormat } from "../lambda/custom/lib/helpers";

const getSlots = (): ISlots => {
    return {
        topic: {},
        period: {},
        fromdate: {},
        todate: {},
        district: {}
    };
}

jest.setTimeout(30000);

const currLang = LocaleTypes.deDE;
const lang = "de";
const translations = strings[currLang].translation;

describe(RequestTypes.Event, () => {
    it("check single date", async () => {

        // Set slots
        let eventSlots = getSlots();

        eventSlots.period = {
            "value": addDays(new Date(), 120)
        };

        const response = await skill(CreateIntentRequest({
            name: RequestTypes.Event,
            locale: LocaleTypes.deDE,
            slots: eventSlots
        }));

        const date = dateFormat({
            date: eventSlots.period.value as string,
            lang,
            format: "dddd, DD MMMM YYYY"
        });

        // @ts-ignore
        expect(response).translationMatch({
            "translations": translations[TranslationTypes.EVENT_MSG_SINGLE_DATE],
            "attributes": {
                date
            },
            // Check also if at least 5 characters exist after the normal phrase, that isn't a whitespace
            "regExpression": `%t(.*\\S{5,})`
        });
    });

    it("check multiple date", async () => {

        let eventSlots = getSlots();

        // Set slots
        eventSlots.fromdate = {
            "value": addDays(new Date(), 80)
        };

        eventSlots.todate = {
            "value": addDays(new Date(), 82)
        };

        const response = await skill(CreateIntentRequest({
            name: RequestTypes.Event,
            locale: LocaleTypes.deDE,
            slots: eventSlots
        }));

        const fromdate = dateFormat({
            date: eventSlots.fromdate.value as string,
            lang,
            format: "dddd, DD MMMM"
        });

        const todate = dateFormat({
            date: eventSlots.todate.value as string,
            lang: "de",
            format: "dddd, DD MMMM YYYY"
        });

        // @ts-ignore
        expect(response).translationMatch({
            "translations": translations[TranslationTypes.EVENT_MSG_MULTIPLE_DATES],
            "attributes": {
                fromdate,
                todate
            },
            // Check also if at least 5 characters exist after the normal phrase, that isn't a whitespace
            "regExpression": `%t(.*\\S{5,})`
        });
    });

    it("check single date with topic", async () => {

        let eventSlots = getSlots();

        // Set slots
        eventSlots.period = {
            "value": "2019-04-20"
        };

        eventSlots.topic = {
            value: "sport",
            resolutions: {
                status: "ER_SUCCESS_MATCH",
                values: [
                    {
                        "name": "Sport",
                        "id": "2"
                    }
                ]
            }
        };

        const response = await skill(CreateIntentRequest({
            name: RequestTypes.Event,
            locale: LocaleTypes.deDE,
            slots: eventSlots
        }));

        const date = dateFormat({
            date: eventSlots.period.value as string,
            lang,
            format: "dddd, DD MMMM YYYY"
        });

        // @ts-ignore
        expect(response).translationMatch({
            "translations": translations[TranslationTypes.EVENT_MSG_SINGLE_DATE_WITH_TOPIC],
            "attributes": {
                date,
                topic: eventSlots.topic
            },
            // Check also if at least 5 characters exist after the normal phrase, that isn't a whitespace
            "regExpression": `%t(.*\\S{5,})`
        });
    });

    it("check multiple date with topic", async () => {

        let eventSlots = getSlots();

        // Set slots
        eventSlots.fromdate = {
            "value": addDays(new Date(), 15)
        };

        eventSlots.todate = {
            "value": addDays(new Date(), 30)
        };

        eventSlots.topic = {
            value: "sport",
            resolutions: {
                status: "ER_SUCCESS_MATCH",
                values: [
                    {
                        "name": "Sport",
                        "id": "2"
                    }
                ]
            }
        };

        const response = await skill(CreateIntentRequest({
            name: RequestTypes.Event,
            locale: LocaleTypes.deDE,
            slots: eventSlots
        }));

        const fromdate = dateFormat({
            date: eventSlots.fromdate.value as string,
            lang,
            format: "dddd, DD MMMM"
        });

        const todate = dateFormat({
            date: eventSlots.todate.value as string,
            lang,
            format: "dddd, DD MMMM YYYY"
        });

        // @ts-ignore
        expect(response).translationMatch({
            "translations": translations[TranslationTypes.EVENT_MSG_MULTIPLE_DATES_WITH_TOPIC],
            "attributes": {
                fromdate,
                todate,
                topic: eventSlots.topic
            },
            // Check also if at least 5 characters exist after the normal phrase, that isn't a whitespace
            "regExpression": `%t(.*\\S{5,})`
        });
    });

    it("check district", async () => {

        let eventSlots = getSlots();

        eventSlots.district = {
            value: "Niederdorf"
        };

        const response = await skill(CreateIntentRequest({
            name: RequestTypes.Event,
            locale: LocaleTypes.deDE,
            slots: eventSlots
        }));

        // @ts-ignore
        expect(response).translationMatch({
            "translations": translations[TranslationTypes.EVENT_LOCATION],
            "attributes": {
                municipality: eventSlots.district.value
            },
            // Check also if at least 5 characters exist after the normal phrase, that isn't a whitespace
            "regExpression": `%t(.*\\S{5,})`
        });
    });

    it("check topic with district", async () => {

        let eventSlots = getSlots();

        eventSlots.district = {
            value: "Niederdorf"
        };

        eventSlots.topic = {
            value: "Theater",
            resolutions: {
                status: "ER_SUCCESS_MATCH",
                values: [
                    {
                        "name": "Theater",
                        "id": "32"
                    }
                ]
            }
        };

        const response = await skill(CreateIntentRequest({
            name: RequestTypes.Event,
            locale: LocaleTypes.deDE,
            slots: eventSlots
        }));

        // @ts-ignore
        expect(response).translationMatch({
            "translations": translations[TranslationTypes.EVENT_TOPIC_WITH_MUNICIPALITY],
            "attributes": {
                municipality: eventSlots.district.value,
                topic: eventSlots.topic
            },
            // Check also if at least 5 characters exist after the normal phrase, that isn't a whitespace
            "regExpression": `%t(.*\\S{5,})`
        });
    });
});
