import { Data } from "@/types/data";
import { Request } from "@/types/requests";

// Logon
export const getLogonRequestConfig = (name: string, email: string, password: string) => {

    const dataToSend = { 
        name: name, 
        email: email, 
        password: password 
    };

    const parameters: Request.LogonRequestParameters = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(dataToSend)
    };

    return parameters;
}

// Login
export const getLoginRequestConfig = (email: string, password: string) => {

    const dataToSend = { 
        email: email, 
        password: password 
    };

    const parameters: Request.LoginRequestParameters = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend)
    }

    return parameters;
}

export const getCreateGroupRequestConfig = (username: string, groupName: string, groupPassword: string) => {

    const data = {
        token: localStorage.getItem("token") ?? "",
        username: username,
        groupName: groupName,
        groupPassword: groupPassword
    };

    const parameters: Request.CreateGroupRequestParameters = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };

    return parameters;
}

export const getJoinGroupRequestConfig = (username: string, groupHash: string, groupPassword: string) => {

    const data = {
        token: localStorage.getItem("token") ?? "",
        username: username,
        groupHash: groupHash,
        groupPassword: groupPassword
    };

    const parameters: Request.JoinGroupRequestParameters = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };

    return parameters;
}

export const getAddCardPersonalRequestConfig = (name: string, destination: string, priority: string, content: string) => {

    const data = {
        token: localStorage.getItem("token") ?? "",
        username: name,
        destination: destination,
        priority: priority,
        content: content
    };

    const parameters: Request.AddCardRequestParameters = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };

    return parameters;
}

export const getAddCardGroupRequestConfig = (groupHash: string, destination: string, priority: string, content:string) => {

    const data = {
        token: localStorage.getItem("token") ?? "",
        hash: groupHash,
        destination: destination,
        priority: priority,
        content: content
    };

    const parameters: Request.AddCardRequestParameters = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };

    return parameters;
}