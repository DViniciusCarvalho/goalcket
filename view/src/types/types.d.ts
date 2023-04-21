export interface OverlayProps {
    visibility: "invisible" | "visible";
    handlePopUpGroupState: () => void;
}

export interface HeaderProps {
    needChangeBackground: boolean;
    headerPage: string;
}

export interface MenuProps {
    headerPosition: string;
}

export interface CardProps {
    gridArea: string;
}

export interface ButtonProps {
    message: string;
    handleSubmitButtonClick: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
}

export interface PopUpProps {
    content: string;
    visibilityClass: string; 
    status: string;
}

export interface InputProps {
    margin?: string;
    changeValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

export interface InternalHeaderProps {
    name: string;
}

export interface OptionProps {
    groupName: string;
    groupHash: string;
}

export interface JoinGroupPopUpProps {
    popUpDisplay: "invisible" | "visible";
    handleJoinGroupState: () => void;
}

export interface DescriptionProps {
    area: string;
    color: string;
    isGroup: boolean;
}

export interface PersonalProps {
    toDoColor: string;
    doingColor: string; 
    doneColor: string;
}

export interface ToDoProps {
    color: string;
    cards: Card[];
    isGroup: boolean;
}

export interface DoingProps {
    color: string;
    cards: Card[];
    isGroup: boolean;
}

export interface DoneProps {
    color: string;
    cards: Card[];
    isGroup: boolean;
}

export interface CardsAreaProps {
    cards: Card[];
}

export interface KanbanCardProps {
    position: Property.Position | string;
}

export interface ErrorProps {
    getGroupRequestStatusMessage: string;
}

export interface GroupContentProps {
    name: string;
    members: IMember[];
    columns: {
        todo: ToDoProps,
        doing: DoingProps,
        done: DoneProps
    }
}


// Request interfaces
export interface LogonRequestParameters {
    method: "POST";
    headers: { "Content-Type": "application/json" };
    body: string;
}

export interface LoginRequestParameters {
    method: "POST";
    headers: { "Content-Type": "application/json" };
    body: string;
}

export interface FetchDataRequestParameters {
    method: "POST";
    headers: {[key: string]: string};
    body: string;
}

export interface GetGroupContentRequestParameters {
    method: "POST";
    headers: {[key: string]: string};
    body: string;
}

export interface ChangeColorPersonalRequestParameters {
    method: "PUT";
    headers: {[key: string]: string};
    body: string;
}

export interface ChangeColorGroupRequestParameters {
    method: "PUT";
    headers: {[key: string]: string};
    body: string;
}

export interface CreateGroupRequestParameters {
    method: "POST";
    headers: {[key: string]: string};
    body: string;
}

export interface JoinGroupRequestParameters {
    method: "POST";
    headers: {[key: string]: string};
    body: string;
}

// Response interfaces
export interface LogonResponse {
    status: number;
}

export interface LoginResponse {
    status: number;
    token: string;
}

export interface FetchDataResponse {
    status: number;
    name: string;
    rooms: {
        personal: IPersonal,
        groups: IGroup[]
    }
}

export interface CreateGroupResponse {
    status: number;
    hash: string;
}

export interface GetGroupContentResponse {
    status: number;
    group: {
        name: string;
        members: IMember[];
        columns: {
            todo: ToDoProps,
            doing: DoingProps,
            done: DoneProps
        }
    }
}

// Components patterns
export interface IMember {
    name: string;
    roles: string[]
}

export interface ICard {
    content: string;
    priority: string;
}

export interface Column {
    color: string;
    cards: ICard[]
}

export interface IGroup {
    name: string;
    hash: string;

}

export interface IPersonal {
    todo: Column;
    doing: Column;
    done: Column;
}


