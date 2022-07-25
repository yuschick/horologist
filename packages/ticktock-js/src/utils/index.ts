import content from '../content';

// Rotate a given HTML element the a specific degree value.
export function rotate({ element, value }: { element: HTMLElement; value: number }): void {
    // Append new rotate() value to existing transform string
    const transform = element.style.transform
        .split(' ')
        .filter((prop) => !prop.startsWith('rotate'));
    element.style.transform = `${transform} rotate(${value}deg)`.trim();
}

// Event setup for trigger elements, like chronograph buttons.
export function setupTriggerEvents(
    options: { activeClass?: string; element: HTMLElement },
    callback: () => void,
): void {
    const activeClass = options.activeClass || 'active';

    // Setup the initial click event handler to run the callback
    // and add the active class for any styling effects
    options.element.addEventListener('click', () => {
        callback();

        if (!options.element.classList.contains(activeClass)) {
            options.element.classList.add(activeClass);
        }
    });

    // It's expected that any active states will include a transition
    // So by default, the transitionend event is also added to remove active states
    options.element.addEventListener('transitionend', () => {
        options.element.classList.remove(activeClass);
    });

    // Setup cursor pointer for the trigger
    options.element.style.cursor = 'pointer';

    // Setup button role for the trigger
    options.element.setAttribute('role', 'button');
}

// Receive a DOM element and return its current transform: rotate() number value
export function getDOMElementRotateValue(element: HTMLElement): number {
    const transform = element.style.transform;
    const transformArr = transform.split(' ');
    const rotateTransform = transformArr.find((transform) => transform.startsWith('rotate'));
    const rotateValue = rotateTransform
        ? rotateTransform.replace('rotate(', '').replace('deg)', '')
        : 0;

    return Number(rotateValue);
}

// Repeat a function a specific number of times
export function repeatAction(count: number, action: () => unknown) {
    for (let i = 1; i <= count; i++) {
        action();
    }
}
