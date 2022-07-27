# Horologist - Making Digital Time Mechanical

Horologist is a JavaScript library for animating DOM elements to represent time in the same ways as
many of the world's greatest haute horologist watchmakers. It supports and enables many of the
different watchmaking complications and variations such as chronographs, minute repeaters, multiple
time zones, and more.

## Getting Started

To get started, first install `horologist` into your project.

```bash
npm i horologist
```

```
yarn add horologist
```

With the package installed, import the main `Watch` class, instantiate it with its settings, and
call the `start()` method.

```jsx
import { Watch } from 'horologist';

const settings = {
    id: "k0-seasons",
    dials: [{ ... }],
    moonphase: { ... },
};

const Sarpaneva = new Watch(settings);
Sarpaneva.start();
```

## Complications

Horologist aims to recreate the work of haute horology watchmaking in a digital format by emulating
the many of the handmade complications and variations. View each complication to learn more about
it, its features and settings API.

-   Calendars

    -   Date Indicator
    -   Day Indicator
    -   Month Indicator
    -   Week Indicator
    -   Year Indicator

-   Chronograph
-   Day / Night Indicator
-   Dials
-   Equation of Time
-   Foudroyante
-   Minute Repeater
-   Moonphase
-   Power Reserve

## Mentions

There are a few libraries that allow Horologist to be its best, and they should be acknowledged.

-   [date-fns](https://date-fns.org/)
-   [lunarphase-js](https://github.com/jasonsturges/lunarphase-js)
-   [suntimes](https://github.com/doniseferi/suntimes)

## Contact

[@danielyuschick on Twitter](http://www.twitter.com/danielyuschick)
