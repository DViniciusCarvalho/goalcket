import React, { useEffect, useState, createContext } from "react";
import { useRouter } from "next/router";
import InternalHeader from "@/components/internal/internal_header/InternalHeader";
import InternalMainContent from "@/components/internal/internal_main_content/InternalMainContent";
import internalStyles from "@/styles/internal/Internal.module.css";
import { FetchDataRequestParameters, FetchDataResponse, IPersonal, IGroup } from "@/types/types";

export const InternalPageContext = createContext<any>(null);

export default function Internal(){

    const router = useRouter();

    const [ name, setName ] = useState<string>("");
    const [ personal, setPersonal ] = useState<null | IPersonal>(null);
    const [ groups, setGroups ] = useState<null | IGroup[]>(null);

    const parameters = {
        name: name,
        personal: personal,
        groups: groups
    };

    let alreadyReloaded = false;

    useEffect(() => {
        if (!alreadyReloaded){ 
            alreadyReloaded = true;    
            handleClientEntry();
        }   
    }, []);

    function handleClientEntry(): void {
        const requestConfig = getFetchDataRequestConfig();
        doFetchDataRequest(requestConfig);
    }

    function getFetchDataRequestConfig(): FetchDataRequestParameters {
        const token = { token: localStorage.getItem("token") ?? "" };
        const requestConfig: FetchDataRequestParameters = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(token)
        }
        return requestConfig;
    }

    async function doFetchDataRequest(requestConfig: FetchDataRequestParameters) {
        const response = await fetch("http://localhost:3001/internal-page", requestConfig);
        const responseStringfied = await response.json();
        const responseObject: FetchDataResponse = JSON.parse(responseStringfied);
        console.log(responseObject)
        handleFetchDataResponse(responseObject);
    }

    function handleFetchDataResponse(response: FetchDataResponse): void {
        if (response.status === 200){
            setName(response.name);
            setPersonal(response.rooms.personal);
            setGroups(response.rooms.groups);
        }
        else if (response.status === 403){
            router.push("/login");
        }
    }

    return (
        <div className={internalStyles.internal__background}>
            <InternalPageContext.Provider value={parameters}>
                <InternalHeader/>
                <InternalMainContent/>
            </InternalPageContext.Provider>
        </div>
    );
}
