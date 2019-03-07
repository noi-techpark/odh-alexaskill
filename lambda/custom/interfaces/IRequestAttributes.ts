import {ISlotValues} from "./ISlotValues";

export interface IRequestAttributes {
    /**
     * Searches for the translation of the given key, replaces the arguments
     * and returns the result.
     * 
     * @param key 
     * @param args 
     */
    t(key: string, ...args: any[]): any;

    language(): string;

    /**
     * The slot values for the current request.
     */
    slots: ISlotValues;

    [key: string]: any;
}