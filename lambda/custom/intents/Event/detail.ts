// import { HandlerInput, RequestHandler } from "ask-sdk-core";
// import { Response } from "ask-sdk-model";
// import { IsIntent, GetRequestAttributes } from "../../lib/helpers";
// import { RequestTypes, TranslationTypes, HandlerResponseStatus} from "../../lib/constants";
// import { IHandlerResponse } from "../../interfaces";

// export const EventDetailHandler: RequestHandler = {
//     canHandle(handlerInput: HandlerInput): boolean {
//         return IsIntent(handlerInput, RequestTypes.EventDetail);
//     },
//     async handle(handlerInput: HandlerInput): Promise<Response> {

//         const { t, language } = GetRequestAttributes(handlerInput);


//         let responseSpeech: IHandlerResponse = {
//             speechText: t(TranslationTypes.ERROR_MSG),
//             promptText: t(TranslationTypes.HELP_MSG),
//             status: HandlerResponseStatus.Success
//         };

//         // get slots
//         const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
//         const query = requestAttributes.slots.query;

//         if (query.value !== "") {

//         }
       

//        console.log("Detail"+ JSON.stringify(query));
       
//         let response = handlerInput.responseBuilder;

//         if (responseSpeech.speechText) {
//             response.speak(responseSpeech.speechText);
//         }
//         // Return also a prompt text if necessary
//         if (responseSpeech.promptText) {
//             response.reprompt(responseSpeech.promptText);
//         }

//         // Return the message to alexa
//         return response.getResponse();
//     }
// }