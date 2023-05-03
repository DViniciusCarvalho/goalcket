import { Data } from "@/types/data";

export namespace Props {

    interface OverlayProps {
        visibility: string;
        hideFirstLayerOverlayAndPopUps: () => void;
    }

    interface HeaderProps {
        needChangeBackground: boolean;
        headerPage: string;
    }

    interface MenuProps {
        headerPosition: string;
    }

    interface CardProps {
        gridArea: string;
    }

    interface SubmitButtonProps {
        message: string;
        handleSubmitButtonClick: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
    }
 
    interface ActionButtonProps {
        origin: string;
        message: string; 
        actionFunction: (event: MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    }

    interface ExitButtonProps {
        origin: string;
        actionFunction: (event: MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    }

    interface StatusPopUpProps {
        content: string;
        visibilityClass: string; 
        status: string;
    }

    interface InputProps {
        origin: string;
        changeValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
        value: string;
    }

    interface InternalHeaderProps {
        name: string;
    }

    interface GroupOptionProps {
        groupName: string;
        groupHash: string;
    }

    interface GroupPopUpProps {
        firstImage: StaticImageData;
        secondImage: StaticImageData;
        firstLabelMessage: string;
        secondLabelMessage: string;
        popUpType: PopUpType;
        firstInputRef: React.MutableRefObject<null>;
        secondInputRef: React.MutableRefObject<null>;
        hideFirstLayerOverlayAndPopUps: () => void;
        handleJoinClick: () => void;
        handleCreateClick: () => void;
    }

    interface DescriptionProps {
        area: string;
        color: string;
        isGroup: boolean;
    }

    interface PersonalProps {
        toDoColor: string;
        doingColor: string; 
        doneColor: string;
    }

    interface ToDoProps {
        color: string;
        cards: Data.CardData[];
        isGroup: boolean;
    }

    interface DoingProps {
        color: string;
        cards: Data.CardData[];
        isGroup: boolean;
    }

    interface DoneProps {
        color: string;
        cards: Data.CardData[];
        isGroup: boolean;
    }

    interface CardsAreaProps {
        column: string;
        cards: Data.CardData[];
    }

    interface KanbanCardProps {
        position: Property.Position | string;
    }

    interface GroupContentProps {
        name: string;
        members: Data.MemberData[];
        columns: Data.Columns;
    }

    interface ErrorProps {
        getGroupRequestStatusMessage: string;
    }

    interface FunctionalitiesProps {
        isGroup: boolean;
    }

    interface BigCardProps {
        content: string;
        priority: string;
        timestamp: number;
        id: string;
        creator: MemberData;
        column: string;
    }
}