import { Data } from "@/types/data";

export const abbreviate = (name: string): string => {
    const words = name.split(" ");
    if (name.length > 10 && words.length > 1) return `${words[0]} ${words[1].charAt(0).toUpperCase()}.`;
    return name;
}

export const formatDate = (timestamp: number): string => {
    const dateObject = new Date(timestamp);

    const rawMonth = dateObject.getMonth();
    const rawDay = dateObject.getDate();

    const month = rawMonth + 1 < 10? `0${rawMonth + 1}` : rawMonth + 1;
    const day = rawDay < 10? `0${rawDay}` : rawDay;
    const year = dateObject.getFullYear();

    return `${month}/${day}/${year}`;
}

export const getPriorityBackground = (priority: string) => {
    if (priority === "low") return "linear-gradient(to right, green, yellow)";
    else if (priority === "medium") return "linear-gradient(to right, yellow, rgb(255, 136, 0))"
    else return "linear-gradient(to right, rgb(255, 153, 0), rgb(223, 7, 7))";
}

export function getCardIndex(cards: Data.ICard[], id: string): number {
    let cardIndex = 0;
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].id === id) {
            cardIndex = i;
        }
    }
    return cardIndex;
}