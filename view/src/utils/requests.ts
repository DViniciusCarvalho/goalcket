import { LogonRequestParameters } from "@/types/types";
import { LoginRequestParameters } from "@/types/types";
import { FetchDataRequestParameters } from "@/types/types";
import { GetGroupContentRequestParameters } from "@/types/types";
import { ChangeColorPersonalRequestParameters } from "@/types/types";
import { ChangeColorGroupRequestParameters } from "@/types/types";
import { CreateGroupRequestParameters } from "@/types/types";

// Logon
export const getLogonRequestConfig = (name: string, email: string, password: string): LogonRequestParameters => {
    const dataToSend = { name: name, email: email, password: password };
    const parameters: LogonRequestParameters = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(dataToSend)
    };
    return parameters;
}

// Login
export const getLoginRequestConfig = (email: string, password: string): LoginRequestParameters => {
    const dataToSend = { email: email, password: password };
    const parameters: LoginRequestParameters = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend)
    }
    return parameters;
}

// Fetch data
export const getFetchDataRequestConfig = (): FetchDataRequestParameters => {
    const token = { token: localStorage.getItem("token") ?? "" };
    const requestConfig: FetchDataRequestParameters = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(token)
    }
    return requestConfig;
}

// Get group data
export const getGroupContentRequestConfig = (roomId: string): GetGroupContentRequestParameters => {
    const parameters = {
        token: localStorage.getItem("token") ?? "",
        roomId: roomId
    };
    const requestConfig: GetGroupContentRequestParameters = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parameters)
    }
    return requestConfig;

}

export const getChangeColorPersonalRequestConfig = (userToken: string, currentColorValue: string, area: string): ChangeColorPersonalRequestParameters => {
    const data = { token: userToken, color: currentColorValue, area: area };
    const parameters: ChangeColorPersonalRequestParameters = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }
    return parameters;
}

export const getChangeColorGroupRequestConfig = (userToken: string, currentColorValue: string, currentGroupId: string, area: string): ChangeColorGroupRequestParameters => {
    const data = { token: userToken, color: currentColorValue, hash: currentGroupId, area: area };
    const parameters: ChangeColorGroupRequestParameters = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }
    return parameters;
}

export const getCreateGroupRequestConfig = (username: string, groupName: string, groupPassword: string): CreateGroupRequestParameters => {
    const data = {
        token: localStorage.getItem("token") ?? "",
        username: username,
        groupName: groupName,
        groupPassword: groupPassword
    };
    const parameters: CreateGroupRequestParameters = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };
    return parameters;
}

export const getJoinGroupRequestConfig = (username: string, groupName: string, groupPassword: string) => {
    const data = {
        username: username,
        groupName: groupName,
        groupPassword: groupPassword
    };
    const parameters = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };
    return parameters;
}
