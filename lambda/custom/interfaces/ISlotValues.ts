import {IMatchedSlotValue} from "./IMatchedSlotValues";
import {IUnmatchedSlotValue} from "./IUnmatchedSlotValue"; 

export interface ISlotValues {
    [key: string]: IMatchedSlotValue | IUnmatchedSlotValue | undefined;
}