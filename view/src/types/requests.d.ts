export namespace Request {
    interface LogonRequestParameters {
        method: "POST";
        headers: { "Content-Type": "application/json" };
        body: string;
    }
    
    interface LoginRequestParameters {
        method: "POST";
        headers: { "Content-Type": "application/json" };
        body: string;
    }
    
    interface FetchDataRequestParameters {
        method: "POST";
        headers: {[key: string]: string};
        body: string;
    }
    
    interface GetGroupContentRequestParameters {
        method: "POST";
        headers: {[key: string]: string};
        body: string;
    }
    
    interface ChangeColorPersonalRequestParameters {
        method: "PUT";
        headers: {[key: string]: string};
        body: string;
    }
    
    interface ChangeColorGroupRequestParameters {
        method: "PUT";
        headers: {[key: string]: string};
        body: string;
    }
    
    interface CreateGroupRequestParameters {
        method: "POST";
        headers: {[key: string]: string};
        body: string;
    }
    
    interface JoinGroupRequestParameters {
        method: "POST";
        headers: {[key: string]: string};
        body: string;
    }
    
    interface AddCardRequestParameters {
        method: "PUT";
        headers: {[key: string]: string};
        body: string;
    }

    interface DeleteCardRequestParameters {
        method: "DELETE";
        headers: {[key: string]: string};
        body: string;
    }

    interface MoveCardRequestParameters {
        method: "PUT";
        headers: {[key: string]: string};
        body: string;
    }

    interface ChangeCardContentRequestParameters {
        method: "PUT";
        headers: {[key: string]: string};
        body: string;
    }

    interface KickUserRequestParameters {
        method: "DELETE";
        headers: {[key: string]: string};
        body: string;
    }
}