import { Data } from "@/types/data";

export namespace Response {

    interface LoginResponse {
        token: string;
    }
    
    interface FetchDataResponse {
        name: string;
        rooms: {
            personal: Data.PersonalData,
            groups: Data.GroupOptionData[]
        }
    }
    
    interface CreateGroupResponse {
        name: string | null;
        hash: string | null;
    }
    
    interface JoinGroupResponse {
        name: string | null;
        hash: string | null;
    }
    
    interface GetGroupContentResponse {
        group: Data.GroupData;
    }
    
    interface AddCardToPersonalResponse {
        timestamp: number;
        id: string;
    }
    
    interface AddCardToGroupResponse {
        timestamp: number;
        id: string;
    }

    interface MoveCardFromPersonalResponse {
        hash: string;
    }

    interface MoveCardFromGroupResponse {
        hash: string;
    }
}