[![TickTock JS](http://yuschick.github.io/TickTock/screenshot.jpg)](http://yuschick.github.io/TickTock/)

[![npm version](https://badge.fury.io/js/ticktock-js.svg)](https://badge.fury.io/js/ticktock-js)

# TickTock JS - [View Docs](http://yuschick.github.io/TickTock/)
TickTock JS is a library for animating and rotating SVG elements to tell the time on a clock or watch dial. It works as a parent Watch class which builds components as needed based on the user settings. These components currently include:

- Dials
  - Dual Time Support (with Moment-Timezone)
  - Sweeping / Jumping Seconds
- Power Reserve
- Chronograph
  - Flyback
  - Split-Second (Rattrapante)
- Moonphase
- Minute Repeater
- Day/Night Indicator
- Perpetual Calendar
  - Day Indicator
    - Retrograde Display
  - Date Indicator
    - Split Display
    - Retrograde Display
  - Month Indicator
    - Retrograde Display
  - Week Indicator
  - Year Indicator
  - Equation of Time
- Foudroyante

## Getting Started
Install the ticktock-js package via the terminal.

```
yarn add ticktock-js --dev
```

```
npm install ticktock-js --save-dev
```

Include the library into your project.

```
const Watch = require('ticktock-js');
```

Then instantiate the Watch class with the `settings` object.

```js
const settings = { ... };
let demo = new Watch(settings);
```

## Documentation
Full documentation of the TickTock functionality and API along with demos and guides can be found [here](http://yuschick.github.io/TickTock/).

## Contact
[@Yuschick on Twitter](http://www.twitter.com/Yuschick)

## Sponsors
[<img src="https://spiceprogram.org/assets/img/chilicorn_sticker.svg" width="50" alt="Spice Program - Futurice">](https://spiceprogram.org/)
