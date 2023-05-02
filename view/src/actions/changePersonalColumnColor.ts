import { CHANGE_PERSONAL_COLUMN_COLOR_ENDPOINT } from "@/lib/endpoints";
import { Request } from "@/types/requests";

const requestController = new AbortController();
const { signal } = requestController;

export function changePersonalColumnColor(currentColorValue: string, column: string): Promise<number> {
    const requestConfig = getChangeColorPersonalRequestConfig(currentColorValue, column);
    const promisedResponseData = doChangeGroupColumnColorRequest(requestConfig);

    return promisedResponseData;
}

function getChangeColorPersonalRequestConfig(currentColorValue: string, column: string):
Request.ChangeColorPersonalRequestParameters {
    const data = { 
        token: localStorage.getItem("token") ?? "", 
        color: currentColorValue, 
        area: column 
    };

    const parameters: Request.ChangeColorPersonalRequestParameters = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }

    return parameters;
}

async function doChangeGroupColumnColorRequest(requestConfig: Request.ChangeColorGroupRequestParameters): Promise<number> {
    const response = await fetch(CHANGE_PERSONAL_COLUMN_COLOR_ENDPOINT, { ...requestConfig, signal: signal });
    const { status } = response;

    requestController.abort();

    return status;
}