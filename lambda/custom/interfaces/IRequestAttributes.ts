import {ISlotValues} from "./ISlotValues";

export interface IRequestAttributes {
    /**
     * Searches for the translation of the given key, replaces the arguments
     * and returns the result.
     * 
     * @param key 
     * @param attributes 
     */
    t(key: string, attributes?: {[key: string]: string | number}): any;

    language(): string;

    /**
     * The slot values for the current request.
     */
    slots: ISlotValues;

    [key: string]: any;
}