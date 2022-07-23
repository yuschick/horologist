// Rotate a given HTML element the a specific degree value.
export function rotate({ element, value }: { element: HTMLElement; value: number }) {
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
) {
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
}
