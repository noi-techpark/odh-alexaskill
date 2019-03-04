import { slu, SlotConfirmationStatus } from "ask-sdk-model";

export interface IMatchedSlotValue {
    /**
     * Name of the slot.
     */
    name: string;

    /**
     * Value that the user said (unresolved).
     */
    value: string;

    /**
     * `statis.code` = "ER_SUCCESS_MATCH"
     */
    isMatch: true;

    /**
     * The first resolved value.
     */
    resolved: string;

    /**
     * The first resolved id.
     */
    id: string;

    /**
     * `True` if there are multiple resolved values.
     */
    isAmbiguous: boolean;

    /**
     * All resolved values. If there are multiple values, `isAmbiguous` will be `true`.
     */
    values: slu.entityresolution.Value[];

    /**
     * Whether the user has explicitly confirmed or denied the value of this slot.
     */
    confirmationStatus: SlotConfirmationStatus;
}