import { ApiCallTypes } from "./../lib/constants";

export interface IParamsApiStructure {
    // https://tourism.opendatahub.bz.it/swagger/ui/index#!/Event/Event_GetEventsReduced
    [ApiCallTypes.EVENT_REDUCED]: {
        "language": string,
        "locfilter"?: string,
        "rancfilter"?: number,
        "typefilter"?: number,
        "topicfilter"?: string,
        "orgfilter"?: string,
        "odhtagfilter"?: string,
        "active"?: boolean,
        "odhactive"?: boolean,
        "begindate": string,
        "enddate": string,
        "latitude"?: string,
        "longitude"?: string,
        "radius"?: number
    },
    // https://tourism.opendatahub.bz.it/swagger/ui/index#!/Event/Event_GetEventsLocalized
    [ApiCallTypes.EVENT_LOCALIZED]: {
        "language": string,
        "pagenumber"?: number,
        "pagesize"?: number,
        "idlist"?: string,
        "locfilter"?: string,
        "rancfilter"?: string,
        "typefilter"?: string,
        "topicfilter"?: string,
        "orgfilter"?: string,
        "odhtagfilter"?: string,
        "active"?: boolean,
        "odhactive"?: boolean,
        "begindate"?: string,
        "enddate"?: string,
        "seed"?: number,
        "latitude"?: string,
        "longitude"?: string,
        "radius"?: number
    }
}

export interface IResponseApiStructure {
    [ApiCallTypes.EVENT_REDUCED]: Array<{
        "Id": string,
        "Name": string
    }>,
    [ApiCallTypes.EVENT_LOCALIZED]: {
        "TotalResults": number,
        "TotalPages": number,
        "CurrentPages": number,
        "Seed": string,
        "Items": Array<{
            "Id": string,
            "Shortname": string,
            "DateBegin": Date,
            "DateEnd": Date,
            "Gpstype": string,
            "Latitude": number,
            "Longitude": number,
            "Altitude": any,
            "AltitudeUnitofMeasure": any,
            "OrgRID": string,
            "Ranc": number,
            "Ticket": string,
            "SignOn": string,
            "PayMet": string,
            "Type": string,
            "DistrictId": string,
            "DistrictIds": Array<string>,
            "Detail" : {
                "Header": string | null,
                "SubHeader": string | null,
                "IntroText": string | null,
                "BaseText": string,
                "Title": string,
                "AdditionalText": string | null
            },
            "TopicRIDs": Array<string>,
            "EventPublisher": string | null,
            "EventPrice": number | null,
            "EventDate": Array<{
                "From": Date,
                "To": Date,
                "Begin": string,
                "Entrance": string
                "MinPersons": number,
                "MaxPersons": number
            }>
        }>
    }
}

export interface IApiCall {
    url: ApiCallTypes,
    data: IParamsApiStructure[ApiCallTypes.EVENT_REDUCED] | IParamsApiStructure[ApiCallTypes.EVENT_LOCALIZED],
    onSuccess(response: any): any,
    onError(message: string): any
};