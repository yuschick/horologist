<p align="center">
  <img src="assets/horologist-repo-image.jpg" alt="Horologist Logo - Making digital time mechanical" />
</p>

Horologist is a JavaScript library for animating DOM elements to represent time in the same ways as
many of the world's greatest haute horologist watchmakers. It supports and enables many of the
different watchmaking complications and variations such as chronographs, minute repeaters, multiple
time zones, perpetual calendars and more.

![Horologist License](https://img.shields.io/github/license/yuschick/horologist?style=for-the-badge)
![NPM Version](https://img.shields.io/npm/v/horologist?style=for-the-badge)

## Demos

See the Horologist library in action.

-   [A. Lange & Söhne - Datograph Perpetual Tourbillon](https://codepen.io/DanielYuschick/pen/gOemjmY)
-   [A. Lange & Söhne - Zeitwerk](https://codepen.io/DanielYuschick/pen/yYeRPm)
-   [F.P. Journe - Tourbillon](https://codepen.io/DanielYuschick/pen/QyoPoq)
-   [Kari Voutilainen - GMR](https://codepen.io/DanielYuschick/pen/wvmJMEX)
-   [Speake-Marin - Velsheda](https://codepen.io/DanielYuschick/pen/ZYLdmQ)

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
many of the handmade complications and variations. View each complication to learn more about it,
its features and settings API.

| Complication          | Documentation                                                   | Description                                                                                                                       |
| --------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Chronograph           | [Docs](./packages/horologist/src/components/Chronograph/)       | Also referred to as a “stopwatch” function, a chronograph typically uses subdials to keep track of seconds, minutes, and hours.   |
| Date Indicator        | [Docs](./packages/horologist/src/components/DateIndicator/)     | A date calendar shows the date of the month.                                                                                      |
| Day Indicator         | [Docs](./packages/horologist/src/components/DayIndicator/)      | A day calendar shows the day of the week.                                                                                         |
| Day / Night Indicator | [Docs](./packages/horologist/src/components/DayNightIndicator/) | A day/night indicator can be a two-color disc showing day or night through either light and dark coloured segments.               |
| Dial                  | [Docs](./packages/horologist/src/components/Dial/)              | A dial serves to indicate hours, minutes and seconds.                                                                             |
| Equation of Time      | [Docs](./packages/horologist/src/components/EquationOfTime/)    | The equation of time is the difference between true solar time and mean time.                                                     |
| Foudroyante           | [Docs](./packages/horologist/src/components/Foudroyante/)       | A hand that makes one rotation every second, pausing two thru ten times to indicate fractions of a second.                        |
| Leap Year Indicator   | [Docs](./packages/horologist/src/components/LeapYearIndicator/) | A mechanism to indicate the current year's relationships to the next leap year.                                                   |
| Minute Repeater       | [Docs](./packages/horologist/src/components/MinuteRepeater/)    | A highly complicated watch function that audibly strikes the time in hours, quarter hours, and/or minutes.                        |
| Month Indicator       | [Docs](./packages/horologist/src/components/MonthIndicator/)    | A month indicator displays the current month of the year.                                                                         |
| Moonphase             | [Docs](./packages/horologist/src/components/Moonphase/)         | Displays new moon, first quarter moon, full moon, and last quarter moon by means of a disk that rotates beneath a small aperture. |
| Power Reserve         | [Docs](./packages/horologist/src/components/PowerReserve/)      | A subdial or gauge used to display how much power remains before the watch stops.                                                 |
| Watch                 | [Docs](./packages/horologist/src/components/Watch/)             | The root class which controls all complications.                                                                                  |
| Week Indicator        | [Docs](./packages/horologist/src/components/WeekIndicator/)     | A week calendar displays the current week of the year in either standard or ISO formats.                                          |

## Mentions

There are a few libraries that allow Horologist to be its best, and they should be acknowledged.

-   [date-fns](https://date-fns.org/)
-   [lunarphase-js](https://github.com/jasonsturges/lunarphase-js)
-   [suntimes](https://github.com/doniseferi/suntimes)

## Contact

[@danielyuschick on Bluesky]([http://www.twitter.com/danielyuschick](https://bsky.app/profile/daniel-yuschick.bsky.social))
