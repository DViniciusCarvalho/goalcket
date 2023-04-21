export const debounce = <T extends Function>(func: T, wait: number, immediate: boolean) => {
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