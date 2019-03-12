import { HandlerResponseStatus } from "../lib/constants";

export interface IHandlerResponse {
    "speechText"?: string,
    "promptText"?: string,
    "delegateIntent"?: string,
    "status": HandlerResponseStatus
}