import { Props } from "@/types/props";

export namespace Data {

    interface MemberData {
        name: string;
        id?: string;
        roles?: string[];
    }

    interface CardData {
        content: string;
        priority: string;
        timestamp: number;
        id: string;
        creator: MemberData;
    }

    interface Column {
        [key: string]: string;
        color: string;
        cards: CardData[];
    }

    interface PersonalData {
        [key: string]: Column;
        todo: Column;
        doing: Column;
        done: Column;
    }

    interface Columns {
        [key: string]: ToDoProps | DoingProps | DoneProps;
        todo: Props.ToDoProps;
        doing: Props.DoingProps;
        done: Props.DoneProps;
    }

    interface GroupOptionData {
        name: string;
        hash: string;
    }

    type GroupData = {
        [key: string]: string | number | MemberData[] | Columns
        name: string;
        creation: number;
        members: MemberData[];
        columns: Columns;
    }

    type GroupOptionDataList = GroupOptionData[] | null;

    type PersonalDataState = null | PersonalData;
    
    type GroupDataState = GroupData | null;

    type PopUpVisibility = "invisible" | "visible";
}