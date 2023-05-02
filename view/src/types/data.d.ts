import { Props } from "./props";

export namespace Data {

    interface IMember {
        name: string;
        id?: string;
        roles?: string[];
    }

    interface ICard {
        content: string;
        priority: string;
        timestamp: number;
        id: string;
        creator: IMember;
    }

    interface Column {
        [key: string]: string;
        color: string;
        cards: ICard[];
    }

    interface IPersonal {
        [key: string]: Column;
        todo: Column;
        doing: Column;
        done: Column;
    }

    type PersonalData = null | IPersonal;

    interface Columns {
        [key: string]: ToDoProps | DoingProps | DoneProps;
        todo: Props.ToDoProps;
        doing: Props.DoingProps;
        done: Props.DoneProps;
    }

    interface IGroup {
        name: string;
        hash: string;
    }

    type GroupData = {
        [key: string]: string | IMember[] | Columns
        name: string;
        members: IMember[];
        columns: Columns;
    }

    type GroupList = null | IGroup[];

    type OverlayVisibility = "visible" | "invisible";

    type CreateJoinGroupPopUpVisibility = "visible" | "invisible";

    type AddCardPopUpVisibility = "visible" | "invisible";

    type BigCardPopUpVisibility = "visible" | "invisible";

    type GroupDataState = GroupData | null;

    type PopUpType = "join" | "create";

}