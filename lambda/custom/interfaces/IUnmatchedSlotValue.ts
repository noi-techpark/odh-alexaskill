import { SlotConfirmationStatus } from "ask-sdk-model";

export interface IUnmatchedSlotValue {
    /**
     * Name of the slot.
     */
    name: string;

    /**
     * Value that the user said (unresolved).
     */
    value: string;

    /**
     * `statis.code` != "ER_SUCCESS_MATCH"
     */
    isMatch: false;

    /**
     * Whether the user has explicitly confirmed or denied the value of this slot.
     */
    confirmationStatus: SlotConfirmationStatus
}