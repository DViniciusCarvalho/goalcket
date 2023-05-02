import { FETCH_USER_INITIAL_DATA_ENDPOINT } from "@/lib/endpoints";
import { Request } from "@/types/requests";
import { Response } from "@/types/responses";

const requestController = new AbortController();
const { signal } = requestController;

export function fetchUserInitialData(): Promise<{ status: number, responseObject: Response.FetchDataResponse }> {
    const requestConfig = getFetchDataRequestConfig();
    const promisedResponseData = doFetchDataRequest(requestConfig);

    return promisedResponseData;
}

function getFetchDataRequestConfig(): Request.FetchDataRequestParameters {
    const token = { 
        token: localStorage.getItem("token") ?? "" 
    };

    const requestConfig: Request.FetchDataRequestParameters = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(token)
    }

    return requestConfig;
}

async function doFetchDataRequest(requestConfig: Request.FetchDataRequestParameters): 
Promise<{ status: number, responseObject: Response.FetchDataResponse }> {
    const response = await fetch(FETCH_USER_INITIAL_DATA_ENDPOINT, { ...requestConfig, signal: signal });
    const { status } = response;
    const responseObject: Response.FetchDataResponse = await response.json();

    requestController.abort();

    return { status, responseObject };
}