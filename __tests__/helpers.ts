import { RequestEnvelope, ResponseEnvelope, DialogState, SlotConfirmationStatus, slu, Slot } from "ask-sdk-model";
import { handler } from "../lambda/custom";
import { RequestTypes, LocaleTypes, IntentTypes } from "../lambda/custom/lib/constants";
import { dateFormat } from "../lambda/custom/lib/helpers";

expect.extend({
    translationMatch(received, argument) {

        let translationMatches = false;
        let outputSpeech = received.response.outputSpeech.ssml.replace(/<speak>/g, "").replace(/<\/speak>/g, "");

        const attributeKeys = argument.attributes !== undefined ? Object.keys(argument.attributes) : [];

        argument.translations.forEach((translation: string) => {
            attributeKeys.forEach((attributeKey) => {
                const regex = new RegExp(`%${attributeKey}%`, "g");
                if (argument.attributes[attributeKey].resolutions) {
                    translation = translation.replace(regex, argument.attributes[attributeKey].resolutions.values[0].name);
                }
                else {
                    translation = translation.replace(regex, argument.attributes[attributeKey]);
                }
            });

            outputSpeech = stripHtmlTags(outputSpeech);

            if (argument.regExpression) {
                // Get the translation string
                const expressionString = argument.regExpression.replace("%t", translation);
                const reg = new RegExp(expressionString, "g");

                // Check if the regex matches with the desired pattern
                if (reg.test(outputSpeech)) {
                    translationMatches = true;
                }
            }
            else if (outputSpeech === translation) {
                translationMatches = true;
            }
        })

        if (translationMatches) {
            return {
                message: () => (`${this.utils.printReceived(received)} matches one of the following strings ${this.utils.printExpected(argument.translations)}`),
                pass: true
            }
        } else {
            return {
                message: () => (`expected ${this.utils.printReceived(received)} to match one of the following strings ${this.utils.printExpected(argument.translations)}`),
                pass: false
            }
        }
    }
});

export const addDays = (date: Date, days: number) : string => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return dateFormat({
        date: result,
        format: "YYYY-MM-DD"
    });
}

export const stripHtmlTags = (str: string) => {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString();
    return str.replace(/<[^>]*>/g, '');
}

export type PartialDeep<T> = {
    [P in keyof T]?: PartialDeep<T[P]>;
};

/**
 * Accepts a partial T object and returns it as T.
 * Useful when you only need a few fields of T but still want to get type
 * completions and to suppress compilation error.
 * 
 * @param value 
 */
export function partial<T>(value: PartialDeep<T>): T {
    return (value as any) as T;
}

/**
 * Calls the skill handler with the given RequestEnvelope. Returns a promise
 * with the response.
 * 
 * @param event 
 */
export function skill(event: RequestEnvelope) {
    return new Promise((fulfill, reject) => {
        return handler(event, null, (err, res) => {
            if (err) return reject(err);
            return fulfill(res);
        });
    });
}

/**
 * Returns a partial ResponseEnvelope with the given ssml pattern.
 * 
 * @param pattern 
 */
export function ssml(pattern: string | RegExp) {
    return partial<ResponseEnvelope>({
        response: {
            outputSpeech: {
                ssml: expect.stringMatching(pattern)
            }
        }
    });
}

/**
 * Returns a RequestEnvelope with the given type.
 * 
 * @param options 
 */
export function RequestWithType(options: {
    type: RequestTypes;
    locale: LocaleTypes;
}) {
    return partial<{}>({
        "context": {
            "System": {}
        },
        "request": {
            "type": options.type,
            "locale": options.locale
        }
    }) as RequestEnvelope;
}

/**
 * Returns a RequestEnvelope with the given intent.
 * 
 * @param options 
 */
export function RequestWithIntent(options: {
    name: IntentTypes;
    locale: LocaleTypes;
}) {
    return partial<RequestEnvelope>({
        "context": {
            "System": {}
        },
        "request": {
            "type": "IntentRequest",
            "locale": options.locale,
            "intent": {
                "name": options.name
            }
        }
    });
}


export interface ISlots {
    [key: string]: {
        value?: string;
        confirmationStatus?: SlotConfirmationStatus;
        resolutions?: {
            status: slu.entityresolution.StatusCode,
            values?: {
                name: string;
                id?: string;
            }[];
        }
    }
}
/**
 * Creates an intent request envelope with the given parameters.
 * 
 * @param options 
 */
export function CreateIntentRequest(options: {
    name: string;
    locale: LocaleTypes;
    dialogState?: DialogState;
    session?: {
        [key: string]: any
    },
    slots?: ISlots
}) {

    const session = options.session ? {
        attributes: options.session
    } : {};
    
    return partial<RequestEnvelope>({
        "context": {
            "System": {}
        },
        "session": session,
        "request": {
            "type": "IntentRequest",
            "locale": options.locale,
            "intent": {
                "name": options.name,
                "confirmationStatus": "NONE",
                "slots": options.slots ? (() => {
                    const slots: {
                        [key: string]: Slot;
                    } = {};

                    for (let slotName of Object.keys(options.slots)) {
                        const slot = options.slots[slotName];
                        slots[slotName] = {
                            name: slotName,
                            value: slot.value ? slot.value : "",
                            confirmationStatus: slot.confirmationStatus ? slot.confirmationStatus : "NONE",
                            resolutions: slot.resolutions ? {
                                resolutionsPerAuthority: [
                                    {
                                        authority: "",
                                        status: {
                                            code: slot.resolutions.status
                                        },
                                        values: slot.resolutions.values ? slot.resolutions.values.map((item) => {
                                            return {
                                                value: {
                                                    name: item.name,
                                                    id: item.id ? item.id : ""
                                                }
                                            };
                                        }) : []
                                    }
                                ]
                            } : undefined,
                        }
                    }
                    return slots;
                })() : undefined,
            },
            "dialogState": options.dialogState ? options.dialogState : "STARTED",
        }
    });
}
