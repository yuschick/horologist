/*
    Converts a kebab-case string to Title Case
    ex: day-night-indicator -> Day Night Indicator
*/
export function kebabToTitle(value: string): string {
    const result = value.replace(/-/g, ' ').replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    return result;
}

/*
    Converts a string to kebab case.
    ex: Day Night Indicator -> day-night-indicator
*/
export function stringToKebab(value: string): string | undefined {
    return value
        .toString()
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        ?.map((x) => x.toLowerCase())
        .join('-')
        .toLowerCase();
}
