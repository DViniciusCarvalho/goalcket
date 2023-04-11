import { LogonRequestParameters } from "@/types/types";
import { LoginRequestParameters } from "@/types/types";

// Logon
export const arrangeLogonRequest = (name: string, email: string, password: string): LogonRequestParameters => {
    const dataToSend = { name: name, email: email, password: password };
    const parameters: LogonRequestParameters = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(dataToSend)
    };
    return parameters;
}

// Login
export const arrangeLoginRequest = (email: string, password: string): LoginRequestParameters => {
    const dataToSend = { email: email, password: password };
    const parameters: LoginRequestParameters = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend)
    }
    return parameters;
}