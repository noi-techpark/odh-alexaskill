// import { AlexaDeviceState } from "./constants";
import { NominatimJS } from "nominatim-js";
import "isomorphic-fetch";
import { HandlerResponseStatus } from "./constants";

export class AlexaDeviceAddressClient {
    deviceId: string;
    consentToken: string;
    endpoint: string;
    constructor(apiEndpoint: string, deviceId: string, consentToken: string) {
        this.deviceId = deviceId;
        this.consentToken = consentToken;
        this.endpoint = apiEndpoint.replace(/^https?:\/\//i, "");
    }

    async getFullAddress(): Promise<any> {
        const options = this.__getRequestOptions(`/v1/devices/${this.deviceId}/settings/address`);

        return await this.__handleDeviceAddressApiRequest(options);
    }

    async getCountryAndPostalCode(): Promise<any> {
        const options = this.__getRequestOptions(
            `/v1/devices/${this.deviceId}/settings/address/countryAndPostalCode`);

        return await this.__handleDeviceAddressApiRequest(options);
    }

    async __handleDeviceAddressApiRequest(requestOptions: any) {
        let response = await fetch("https://" + requestOptions.hostname + requestOptions.path, {
            "headers": {
                "Authorization": requestOptions.headers.Authorization,
                "Content-Type": "application/json"
            }
        });
        interface IResponse {
            "type": string,
            "message": string,
            "addressLine1": string | null,
            "addressLine2": null,
            "addressLine3": null,
            "districtOrCounty": null,
            "stateOrRegion": string | null,
            "city": string | null,
            "countryCode": string | null,
            "postalCode": string | null
        };
        let result: IResponse = await response.json();
        // Device address was found
        // @ts-ignore
        if (result.type !== "FORBIDDEN" && (result.addressLine1 !== null && result.city !== null && result.postalCode !== null)) {
            let geoLocation = await NominatimJS.search({
                q: `${result.addressLine1} ${result.city} ${result.postalCode}`
            });

            // Valid coordinates were found
            if (geoLocation.length) {
                return {
                    statusCode: HandlerResponseStatus.Success,
                    response: {
                        "lat": geoLocation[0].lat,
                        // @ts-ignore
                        "lng": geoLocation[0].lon
                    }
                }
            }
        }
        return {
            statusCode: HandlerResponseStatus.Failure
        }
    }

    __getRequestOptions(path: string) {
        return {
            hostname: this.endpoint,
            path: path,
            method: 'GET',
            'headers': {
                'Authorization': 'Bearer ' + this.consentToken
            }
        };
    }
}