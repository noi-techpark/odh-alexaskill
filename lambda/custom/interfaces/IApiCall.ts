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
        "latitude"?: number,
        "longitude"?: number,
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
        "latitude"?: number,
        "longitude"?: number,
        "radius"?: number
    }
    // https://tourism.opendatahub.bz.it/swagger/ui/index#!/Common/Common_GetDistrictLocalized
    [ApiCallTypes.DISTRICT_LOCALIZED]: {
        "language": string,
        "elements": number,
        "visibleinsearch"?: boolean,
        "latitude"?: number,
        "longitude"?: number,
        "radius"?: number
    },
    // https://tourism.opendatahub.bz.it/swagger/ui/index#!/Common/Common_GetMunicipalityReduced
    [ApiCallTypes.MUNICIPALITY_REDUCED]: {
        "language": string,
        "elements": number,
        "visibleinsearch"?: boolean,
        "latitude"?: number,
        "longitude"?: number,
        "radius"?: number
    },
    // https://tourism.opendatahub.bz.it/swagger/ui/index#!/Poi/Poi_GetPoiLocalized
    [ApiCallTypes.POI_LOCALIZED]: {
        "language": string,
        "pagenumber"?: number,
        "pagesize"?: number,
        "poitype"?: string,
        "subtype"?: string,
        "idlist"?: string,
        "locfilter"?: string,
        "areafilter"?: string,
        "highlight"?: string,
        "odhtagfilter"?: string,
        "active"?: boolean,
        "odhactive"?: boolean,
        "seed"?: number,
        "latitude"?: number,
        "longitude"?: number,
        "radius"?: number
    },
    // https://tourism.opendatahub.bz.it/swagger/ui/index#!/Gastronomy/Gastronomy_GetGastronomyListLocalized
    [ApiCallTypes.GASTRONOMY_LOCALIZED]: {
        "language": string,
        "pagenumber"?: number,
        "pagesize"?: number,
        "idlist"?: string,
        "locfilter"?: string,
        "dishcodefilter"?: string,
        "ceremonycodefilter"?: number,
        "categorycodefilter"?: number,
        "facilitycodefilter"?: number,
        "cuisinecodefilter"?: number,
        "odhtagfilter"?: string,
        "active"?: boolean,
        "odhactive"?: boolean,
        "seed"?: number,
        "latitude"?: number,
        "longitude"?: number,
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
            "DateBegin": string,
            "DateEnd": string,
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
            "Detail": {
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
    },
    [ApiCallTypes.DISTRICT_LOCALIZED]: Array<{
        "IsComune": boolean | null,
        "RegionId": string,
        "TourismvereinId": string,
        "MunicipalityId": string,
        "SiagId": string,
        "VisibleInSearch": boolean,
        "Id": string,
        "Active": boolean,
        "CustomId": string,
        "Shortname": string,
        "Gpstype": string,
        "Latitude": number,
        "Longitude": number,
        "Altitude": number,
        "AltitudeUnitofMeasure": string,
        "Detail": {
            "Header": string | null,
            "SubHeader": string | null,
            "IntroText": string | null,
            "BaseText": string | null,
            "Title": string,
            "AdditionalText": string | null,
            "MetaTitle": string | null,
            "MetaDesc": string | null,
            "GetThereText": string | null,
            "Language": string,
            "Keywords": [string] | null
        },
        "ContactInfos": {
            "Address": string | null,
            "City": string | null,
            "ZipCode": string | null,
            "CountryCode": string | null,
            "CountryName": string | null,
            "Surname": string | null,
            "Givenname": string | null,
            "NamePrefix": string | null,
            "Email": string | null,
            "Phonenumber": string | null,
            "Faxnumber": string | null,
            "Url": string | null,
            "Language": string,
            "CompanyName": string | null,
            "Vat": string | null,
            "Tax": string | null,
            "LogoUrl": string | null
        } | null,
        "SmgTags": [
            string
        ] | null,
        "SmgActive": boolean
    }>,
    [ApiCallTypes.MUNICIPALITY_REDUCED]: Array<{
        "Id": string,
        "Name": string
    }>,
    [ApiCallTypes.POI_LOCALIZED]: {
        "TotalResults": number,
        "TotalPages": number,
        "CurrentPages": number,
        "Seed": string,
        "Items": Array<{
            "Id": string,
            "Active": boolean | null,
            "Shortname": string | null,
            "SmgId": string | null,
            "Highlight": boolean | null,
            "Difficulty": string | null,
            "Type": string | null,
            "SubType": string | null,
            "FirstImport": string,
            "LastChange": string,
            "SmgActive": boolean | null,
            "TourismorganizationId": string | null,
            "AreaId": Array<string> | null,
            "AltitudeDifference": number,
            "AltitudeHighestPoint": number,
            "AltitudeLowestPoint": number,
            "AltitudeSumUp": number,
            "AltitudeSumDown": number,
            "DistanceDuration": number,
            "DistanceLength": number,
            "IsOpen": boolean | null,
            "IsPrepared": boolean | null,
            "RunToValley": boolean | null,
            "IsWithLigth": boolean | null,
            "HasRentals": boolean | null,
            "HasFreeEntrance": boolean | null,
            "LiftAvailable": boolean | null,
            "FeetClimb": boolean | null,
            "BikeTransport": boolean | null,
            "OperationSchedule": Array<{
                "Start": string,
                "Stop": string,
                "Type": string | null,
                "ClosedonPublicHolidays": boolean | null,
                // The key below will be generated on the detailpage for better reading the opening times
                "OpeningTimes": {
                    [key: string]: {
                        "periods": Array<{
                            "start": Date,
                            "end": Date
                        }>,
                        "days": Array<number>
                    }
                },
                "OperationScheduleTime": Array<{
                    "Start": string,
                    "End": string,
                    "Monday": boolean,
                    "Tuesday": boolean,
                    "Wednesday": boolean,
                    "Thuresday": boolean,
                    "Friday": boolean,
                    "Saturday": boolean,
                    "Sunday": boolean,
                    "State": number,
                    "Timecode": number
                }>
            }> | null,
            "Detail": {
                "Header": string | null,
                "SubHeader": string | null,
                "IntroText": string | null,
                "BaseText": string | null,
                "Title": string,
                "AdditionalText": string | null,
                "MetaTitle": string | null,
                "MetaDesc": string | null,
                "GetThereText": string | null,
                "Language": string | null
            },
            "ContactInfos": {
                "Address": string | null,
                "City": string | null,
                "ZipCode": string | null,
                "CountryCode": string | null,
                "CountryName": string | null,
                "Surname": string | null,
                "Givenname": string | null,
                "NamePrefix": string | null,
                "Email": string | null,
                "Phonenumber": string | null,
                "Faxnumber": string | null,
                "Url": string | null,
                "Language": string | null,
                "CompanyName": string | null,
                "Vat": string | null,
                "Tax": string | null,
                "LogoUrl": string | null
            },
            "AdditionalPoiInfos": {
                "Novelty": string | null,
                "MainType": string | null,
                "SubType": string | null,
                "PoiType": string | null,
                "Language": string | null
            },
            "Ratings": {
                "Stamina": string | null,
                "Experience": string | null,
                "Landscape": string | null,
                "Difficulty": string | null,
                "Technique": string | null
            },
            "Exposition": Array<string>,
            "SmgTags": Array<string>
        }>
    },
    [ApiCallTypes.GASTRONOMY_LOCALIZED]: {
        "TotalResults": number,
        "TotalPages": number,
        "CurrentPages": number,
        "Seed": string,
        "Items": Array<{
            "Id": string,
            "Active": boolean,
            "Shortname": string,
            "Type": string | null,
            "DistrictId": string | null,
            "FirstImport": string,
            "LastChange": string | null,
            "Gpstype": string,
            "Latitude": number,
            "Longitude": number,
            "Altitude": number,
            "AltitudeUnitofMeasure": string | null,
            "OperationSchedule": Array<{
                "OperationscheduleName": {},
                "Start": string,
                "Stop": string,
                "Type": string | null,
                "ClosedonPublicHolidays": boolean,
                "OperationScheduleTime": [
                    {
                        "Start": string,
                        "End": string,
                        "Monday": boolean,
                        "Tuesday": boolean,
                        "Wednesday": boolean,
                        "Thuresday": boolean,
                        "Friday": boolean,
                        "Saturday": boolean,
                        "Sunday": boolean,
                        "State": number,
                        "Timecode": number
                    }
                ]
            }> | null,
            "MaxSeatingCapacity": number,
            "Detail": {
                "Header": string,
                "SubHeader": string | null,
                "IntroText": string | null,
                "BaseText": string | null,
                "Title": string,
                "AdditionalText": string | null,
                "MetaTitle": string | null,
                "MetaDesc": string | null,
                "GetThereText": string | null,
                "Language": string,
                "Keywords": Array<string> | null
            },
            "ContactInfos": {
                "Address": string | null,
                "City": string | null,
                "ZipCode": string | null,
                "CountryCode": string | null,
                "CountryName": string | null,
                "Surname": string | null,
                "Givenname": string | null,
                "NamePrefix": string | null,
                "Email": string | null,
                "Phonenumber": string | null,
                "Faxnumber": string | null,
                "Url": string | null,
                "Language": string,
                "CompanyName": string | null,
                "Vat": string | null,
                "Tax": string | null,
                "LogoUrl": string | null
            },
            "CategoryCodes": Array<{
                "Id": string,
                "Shortname": string
            }> | null,
            "DishRates": Array<{
                "Id": string,
                "Shortname": string,
                "MinAmount": number,
                "MaxAmount": number,
                "CurrencyCode": string | null
            }> | null,
            "CapacityCeremony": Array<{
                "Id": string,
                "Shortname": string,
                "MaxSeatingCapacity": number
            }> | null,
            "Facilities": Array<{
                "Id": string,
                "Shortname": string
            }> | null,
            "MarketinggroupId": Array<string>,
            "LocationInfo": {
                "RegionInfo": {
                    "Id": string,
                    "Name": string
                },
                "TvInfo": {
                    "Id": string,
                    "Name": string
                },
                "MunicipalityInfo": {
                    "Id": string,
                    "Name": string
                },
                "DistrictInfo": {
                    "Id": string,
                    "Name": string
                },
                "AreaInfo": {
                    "Id": string,
                    "Name": string
                }
            },
            "AccommodationId": string,
            "SmgTags": Array<string> | null,
            "SmgActive": boolean
        }>
    },
    [ApiCallTypes.CAR_STATIONS]: Array<{
        "_t": string,
        "id": string,
        "name": string,
        "latitude": number,
        "longitude": number,
        "municipality": string,
        "company": string,
        "availableVehicles": number,
        "bookahead": boolean,
        "fixedParking": boolean,
        "spontaneously": boolean
    }>
}

export interface IApiCall {
    host: string,
    url: ApiCallTypes,
    data?: IParamsApiStructure[ApiCallTypes.EVENT_REDUCED] | IParamsApiStructure[ApiCallTypes.EVENT_LOCALIZED] | IParamsApiStructure[ApiCallTypes.DISTRICT_LOCALIZED] | IParamsApiStructure[ApiCallTypes.MUNICIPALITY_REDUCED],
    onSuccess(response: any): any,
    onError(message: string): any
};