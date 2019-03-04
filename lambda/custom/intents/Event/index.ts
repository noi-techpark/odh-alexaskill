import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { IsIntent, RouteGenerate } from "../../lib/helpers";
import { RequestTypes, ApiCallTypes } from "../../lib/constants";
import { IResponseApiStructure } from "../../interfaces";
import * as dateformat from "dateformat";
// @ts-ignore no types available
import * as AmazonDateParser from "amazon-date-parser";

export const EventHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return IsIntent(handlerInput, RequestTypes.Event);
    },
    async handle(handlerInput: HandlerInput): Promise<Response> {
        let speechText = "Event action";
        // get slots
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const periodSlot = requestAttributes.slots.period;
        const fromdateSlot = requestAttributes.slots.fromdate;
        const todateSlot = requestAttributes.slots.todate;
        
        if (periodSlot.value !== "") {
            
            // parse the amazon date to a valid date range
            const awsDate = AmazonDateParser(periodSlot.value);
            const fromdate = dateformat(awsDate.startDate, "Y-m-d");
            const todate = dateformat(awsDate.endDate, "Y-m-d");

            await RouteGenerate({
                url: ApiCallTypes.EVENT_REDUCED,
                data: {
                    "begindate": fromdate,
                    "enddate": todate
                },
                onSuccess: (response: IResponseApiStructure[ApiCallTypes.EVENT_REDUCED]) =>{

                    // Slice the array to max 10 entries, because no pagination exists for this service
                    const events = response.map((event)=>{
                        return event.Name;
                    }).slice(0,10);
                    
                    // if from- and todate are the same
                    if(fromdate === todate){
                        speechText = `Am ${periodSlot.value} sind folgende Events ${events.join(",")}`;
                    }
                    else{
                        speechText = `Vom ${dateformat(awsDate.startDate, "dddd, d mmmm")} bis zum ${dateformat(awsDate.endDate, "dddd, d mmmm, yyyy")} sind folgende Events ${events.join(",")}`;
                    }
                    
                },
                onError: (message) =>{

                }
            });
        }
        // get the events that are in a certain period of time
        else if (fromdateSlot.value !== "" && todateSlot.value !== "") {

           await RouteGenerate({
                url: ApiCallTypes.EVENT_REDUCED,
                data: {
                    "begindate": fromdateSlot.value,
                    "enddate": todateSlot.value
                },
                onSuccess: (response: IResponseApiStructure[ApiCallTypes.EVENT_REDUCED]) =>{

                    // Slice the array to max 10 entries, because no pagination exists for this service
                    const events = response.map((event)=>{
                        return event.Name;
                    }).slice(0,10);

                    speechText = `Einige Events wären ${events.join(",")}`;
                },
                onError: (message) =>{

                }
            });
        }
        // handlerInput.requestEnvelope
        

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard("Hello World", speechText)
            .getResponse();
    }
}