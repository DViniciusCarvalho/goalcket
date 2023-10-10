import { CHANGE_GROUP_COLUMN_COLOR_ENDPOINT } from "@/lib/endpoints";
import { Request } from "@/types/requests";


export function changeGroupColumnColor(
    currentColorValue: string, 
    currentGroupId: string, 
    column: string
): Promise<number> {

    const requestConfig = getChangeColorGroupRequestConfig(
        currentColorValue, 
        currentGroupId, 
        column
    );

    const promisedResponseData = doChangeGroupColumnColorRequest(requestConfig);

    return promisedResponseData;
}


function getChangeColorGroupRequestConfig(
    currentColorValue: string, 
    currentGroupId: string, 
    column: string
): Request.ChangeColorGroupRequestParameters {

    const data = { 
        token: localStorage.getItem("token") ?? "", 
        color: currentColorValue, 
        hash: currentGroupId, 
        area: column 
    };

    const parameters: Request.ChangeColorGroupRequestParameters = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }

    return parameters;
}


async function doChangeGroupColumnColorRequest(
    requestConfig: Request.ChangeColorGroupRequestParameters
): Promise<number> {
    
    const response = await fetch(CHANGE_GROUP_COLUMN_COLOR_ENDPOINT, requestConfig);
    const { status } = response;

    return status;
}