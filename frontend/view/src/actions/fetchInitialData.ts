import { FETCH_USER_INITIAL_DATA_ENDPOINT } from "@/lib/endpoints";
import { Request } from "@/types/requests";
import { Response } from "@/types/responses";


export function fetchUserInitialData(): Promise<{ 
    status: number, 
    responseObject: Response.FetchInitialDataResponse 
}> {

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
    };

    return requestConfig;
}


async function doFetchDataRequest(
    requestConfig: Request.FetchDataRequestParameters
): Promise<{ 
    status: number, 
    responseObject: Response.FetchInitialDataResponse 
}> {

    const response = await fetch(FETCH_USER_INITIAL_DATA_ENDPOINT, requestConfig);
    const { status } = response;
    const responseObject: Response.FetchInitialDataResponse = await response.json();

    return { 
        status, 
        responseObject 
    };
}