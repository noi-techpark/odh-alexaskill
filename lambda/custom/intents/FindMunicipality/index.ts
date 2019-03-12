import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { IsIntent, GetRequestAttributes } from "../../lib/helpers";
import { RequestTypes, TranslationTypes } from "../../lib/constants";
import { EventHandler } from "./../Event";

export const FindMunicipalityHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return IsIntent(handlerInput, RequestTypes.FindMunicipality);
    },
    async handle(handlerInput: HandlerInput): Promise<Response> {

        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const { allowedMunicipality } = handlerInput.attributesManager.getSessionAttributes();
        const { t } = GetRequestAttributes(handlerInput);

        const municipalitySlot = requestAttributes.slots.municipality;

        if (municipalitySlot.isMatch && allowedMunicipality !== undefined) {

            const checkIfMunicipalityExists = allowedMunicipality.filter((mpIdentifier: string) => {
                return mpIdentifier === municipalitySlot.id;
            });

            if (checkIfMunicipalityExists.length) {
                // Save ids of allowed municipalities
                handlerInput.attributesManager.setSessionAttributes({
                    selectedMunicipality: {
                        "Id": municipalitySlot.id,
                        "Name": municipalitySlot.resolved
                    }
                });
                //handlerInput.attributesManager.setRequestAttributes(allowedMunicipality.eventSlots);
                return EventHandler.handle(handlerInput);
            }
            else {
                return handlerInput.responseBuilder
                    .speak(t(TranslationTypes.ERROR_INVALID_MUNICIPALITY))
                    .speak(t(TranslationTypes.HELP_MSG))
                    .getResponse();
            }
        }

        return handlerInput.responseBuilder
            .speak(t(TranslationTypes.ERROR_UNEXPECTED_MSG))
            .speak(t(TranslationTypes.HELP_MSG))
            .getResponse();
    }
}