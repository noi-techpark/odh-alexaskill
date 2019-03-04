import { ApiCallTypes } from "./../lib/constants";

export interface IApiCall {
    url: ApiCallTypes,
    data: {
        [key: string]: string | number
    },
    onSuccess(response: any): any,
    onError(message: string): any
};

export interface IResponseApiStructure {
    [ApiCallTypes.EVENT_REDUCED]: Array<{
        "Id": string,
        "Name": string
    }>,
    [ApiCallTypes.EVENT_LOCALIZED]: Array<{
        "TotalResults": number,
        "TotalPages": number,
        "CurrentPages": number,
        "Seed": string,
        "Items": Array<{
            "Id": string,
            "Shortname": string,
            "DateBegin": Date,
            "DateEnd": Date
        }>
    }>
}