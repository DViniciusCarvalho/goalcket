import { Data } from '@/types/data';


export const abbreviate = (name: string): string => {
    const words = name.split(' ');
    if (name.length > 10 && words.length > 1) return `${words[0]} ${words[1].charAt(0).toUpperCase()}.`;
    return name;
}


export const delay = (ms: number): Promise<unknown> => {
    return new Promise(resolve => {
        setTimeout(() => { resolve(null) }, ms);
    })
}


export const debounce = <T extends Function>(
    func: T, 
    wait: number, 
    immediate: boolean
) => {
    
    let timeout: ReturnType<typeof setTimeout> | null;

    return function(this: any, ...args: any) {
        const context = this;
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout!);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
};


export const formatDate = (
    timestamp: number
): string => {

    const dateObject = new Date(timestamp);

    const rawMonth = dateObject.getMonth();
    const rawDay = dateObject.getDate();

    const month = rawMonth + 1 < 10? `0${rawMonth + 1}` : rawMonth + 1;
    const day = rawDay < 10? `0${rawDay}` : rawDay;
    const year = dateObject.getFullYear();

    return `${month}/${day}/${year}`;
}


export function getCardIndex(
    cards: Data.CardData[], 
    id: string
): number {

    let cardIndex = 0;

    for (let i = 0; i < cards.length; i++) {
        if (cards[i].id === id) {
            cardIndex = i;
        }
    }

    return cardIndex;
}


export function getMemberIndex(
    members: Data.MemberData[], 
    id: string
): number {

    let memberIndex = 0;

    for (let i = 0; i < members.length; i++) {
        if (members[i].id === id) {
            memberIndex = i;
        }
    }

    return memberIndex;
}


export function getGroupOptionIndex(
    groupsList: Data.GroupOptionData[], 
    id: string
): number {

    let groupOptionIndex = 0;

    for (let i = 0; i < groupsList.length; i++) {
        if (groupsList[i].hash === id) {
            groupOptionIndex = i;
        }
    }

    return groupOptionIndex;
}

export function getAdminsNumber(
    members: Data.MemberData[]
): number {
    
    return members.filter(member => member.roles?.indexOf('admin') !== -1).length;
}