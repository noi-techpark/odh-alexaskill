import { skill, CreateIntentRequest } from "./helpers";
import { LocaleTypes, RequestTypes, TranslationTypes } from "../lambda/custom/lib/constants";
import { strings } from "../lambda/custom/lib/strings";
import { ISlots } from "./helpers";

const getSlots = (): ISlots => {
    return {
        city: {}
    };
}

const currLang = LocaleTypes.deDE;
const translations = strings[currLang].translation;

describe(RequestTypes.CarSharingList, () => {

    it("get car sharing locations near a specific city", async () => {

        let carSharingSlot = getSlots();


        carSharingSlot.city = {
            value: "bruneck",
            resolutions: {
                status: "ER_SUCCESS_MATCH",
                values: [
                    {
                        "name": "Bruneck"
                    }
                ]
            }
        };

        const response = await skill(CreateIntentRequest({
            name: RequestTypes.CarSharingList,
            locale: LocaleTypes.deDE,
            slots: carSharingSlot
        }));

        // @ts-ignore
        expect(response).translationMatch({
            "translations": translations[TranslationTypes.CARSHARING_GENERAL],
            // Check also if at least 5 characters exist after the normal phrase, that isn't a whitespace
            "regExpression": `%t(.*\\S{5,})`
        });
    });
});
