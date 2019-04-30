// import { skill, CreateIntentRequest, addDays } from "./helpers";
// import { LocaleTypes, RequestTypes, TranslationTypes } from "../lambda/custom/lib/constants";
// import { strings } from "../lambda/custom/lib/strings";
// import { ISlots } from "./helpers";
// import { dateFormat } from "../lambda/custom/lib/helpers";

// const getSlots = (): ISlots => {
//     return {
//         topic: {},
//         period: {},
//         fromdate: {},
//         todate: {},
//         district: {}
//     };
// }

// const currLang = LocaleTypes.deDE;
// const lang = "de";
// const translations = strings[currLang].translation;

// describe(RequestTypes.LoadMore, () => {
//     it("load more for events", async () => {

//         // Set slots
//         let eventSlots = getSlots();

//         eventSlots.period = {
//             "value": addDays(new Date(), 120)
//         };

//         const response = await skill(CreateIntentRequest({
//             name: RequestTypes.LoadMore,
//             locale: LocaleTypes.deDE,
//             session: {
//                 event: {
//                     totalPages: 9,
//                     params: {
//                         language: "de",
//                         pagenumber: 1,
//                         active: true,
//                         pagesize: 5,
//                         latitude: 52.0237524,
//                         longitude: 25.6126304,
//                         begindate: "2019-04-30",
//                         enddate: "2019-04-30"
//                     }
//                 }
//             }
//         }));

//         const date = dateFormat({
//             date: eventSlots.period.value as string,
//             lang,
//             format: "dddd, DD MMMM YYYY"
//         });

//         // @ts-ignore
//         expect(response).translationMatch({
//             "translations": translations[TranslationTypes.EVENT_MSG_SINGLE_DATE],
//             "attributes": {
//                 date
//             },
//             // Check also if at least 5 characters exist after the normal phrase, that isn't a whitespace
//             "regExpression": `%t(.*\\S{5,})`
//         });
//     });
// });
