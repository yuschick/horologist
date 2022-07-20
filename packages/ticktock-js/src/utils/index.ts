// Rotate a given HTML element the a specific degree value.
export function rotate({ element, value }: { element: HTMLElement; value: number }) {
    // Append new rotate() value to existing transform string
    const transform = element.style.transform
        .split(' ')
        .filter((prop) => !prop.startsWith('rotate'));
    element.style.transform = `${transform} rotate(${value}deg)`;
}
