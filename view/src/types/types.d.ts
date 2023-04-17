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

export interface DescriptionProps {
    area: string;
    color: string;
}

export interface PersonalProps {
    toDoColor: string;
    doingColor: string; 
    doneColor: string;
}

export interface ToDoProps {
    color: string;
    cards: Card[];
}

export interface DoingProps {
    color: string;
    cards: Card[];
}

export interface DoneProps {
    color: string;
    cards: Card[];
}

export interface CardsAreaProps {
    cards: Card[];
}

export interface KanbanCardProps {
    position: Property.Position | string;
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

// Response interfaces
export interface LogonResponse {
    status: number;
}

export interface LoginResponse {
    status: number;
    token: string;
}

interface Card {

}

interface Column {
    color: string;
    cards: Card[]
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

export interface FetchDataResponse {
    status: number;
    name: string;
    rooms: {
        personal: IPersonal,
        groups: IGroup[]
    }
}


