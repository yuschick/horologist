# TickTock JS
TickTock JS is a library for animating and rotating SVG elements to tell the time on a clock or watch dial. It works as a parent Watch class which builds components as needed based on the user settings. These components currently include:  

- Dials (with dual time support)
- Power Reserve
- Crown and Manual Time Functionality
- Moonphase
- Minute Repeater
- Day/Night Indicator

## Examples
[Voutilainen GMR](http://yuschick.github.io/TickTock/)

[![Voutilainen GMR Screenshot](https://raw.githubusercontent.com/yuschick/voutilainen-gmr/master/screenshot.jpg)](http://yuschick.github.io/TickTock/)

## Get Started
Clone the repository and run `yarn` to install the package file.

Run `yarn watch` during development

Require the `Watch` class in your primary JS file.

Instantiate the class with the required settings.

Run `yarn build` to compile all files

## Documentation
#### Example Settings

```js
const settings = {
  dials: [
    {
      name: 'local-time',
      hands: {
        hour: 'primary-hours-hand',
        minute: 'primary-minutes-hand'
      },
      offset: '+3'
    }, {
      name: 'home-time',
      hands: {
        hour: 'secondary-hours-hand',
        second: 'secondary-minutes-hand'
      },
      offset: '-4',
      format: 24,
      sweep: true
    }
  ],
  reserve: {
    id: 'power-reserve-hand',
    range: [-90, 90]
  },
  crown: {
    id: 'crown',
    blackout: [
      {
        selector: '.blackout',
        className: 'active'
      }, {
        selector: '.main_dial',
        className: 'faded'
      }
    ]
  },
  moonphase: {
    id: 'moonphase-dial',
    invert: true
  },
  repeater: {
    id: 'repeater-btn',
    chimes: {
      hour: './dist/sounds/chime-01.mp4',
      fiveMinute: './dist/sounds/chime-02.mp4',
      minute: './dist/sounds/chime-03.mp4'
    },
    dial: 1
  },
  dayNightIndicator: {
    id: 'day-night-disc',
    invert: true,
    dial: 1
  }
};

let VoutilainenGMR = new Watch(settings);
```

#### dials [Array]  
- **name** (*String*): A name to identify the specific dial
- **hands** (*Object*):
  - **hour** (*String*): The id of the hour hand SVG element
  - **minute** (*String*): The id of the minute hand SVG element
  - **second** (*String*): The id of the second hand SVG element
- **offset** (*String*): *Default: 0* Use the offset value to define a GMT timezone (eg: '+2', '-4.5')
- **format** (*Number*): *Default: 12* Specify `12` or `24` to define if the dial should run as 12 or 24 hour time
- **sweep** (*Boolean*): *Default: False* If true, the second hand will sweep as oppose to tick

#### reserve {Object}
- **id** (*String*): The id of the power reserve hand SVG element
- **range** (*Array*): Accepts two values to define the min and max rotation angle for the reserve hand

#### crown {Object}
- **id** (*String*): The id of the crown SVG element
- **blackout** [*Array*]: Useful with dual time watches. When setting the time of the second dial, black out the first to increase focus.
 - **selector** (*String*): The element selector for an element related to the blackout functionality (eg. '.blackout', '#coverall')
 - **className** (*String*): The class name which should be toggled when activating and deactivating the blackout mode

#### moonphase {Object}
- **id** (*String*): The id of the moonphase dial SVG element
- **invert** (*Boolean*): *Default: false* If false the dial will rotate clockwise. Set this property to *true* if it should rotate counterclockwise.

#### repeater {Object}
- **id** (*String*): The id of the element that is to trigger playing the minute repeater on click. Clicking this element a second time will toggle the repeater off. The repeater will play back the time of the first dial passed into the dials array.
- **chimes** {*Object*}:
  - **hour** (*String*): File path to the audio file to be played for every hour
  - **fiveMinute** (*String*): File path to the audio file to be played for every five minute increment
  - **minute** (*String*): File path to the audio file to be played for every remaining minute
- **dial** (*Number*): *Default: 0* Specify an index from the dials array to define which dial will be read and played by the repeater.

#### dayNightIndicator {Object}
- **id** (*String*): The id of the day night indicator dial SVG element
- **invert** (*Boolean*): *Default: false* If false the dial will rotate clockwise. Set this property to *true* if it should rotate counterclockwise.
- **dial** (*Number*): *Default: 0* Specify an index from the dials array to define which dial will be read by the indicator.


## ToDo
- [ ] Create a more simplistic (design) demo to showcase the library and its components
- [ ] Create a TickTock site to host proper documentation and demos
- [ ] Allow passing an ID into the master Watch class in case multiple watches are on one page
- [ ] Provide perpetual calendar support
  - [ ] Day indicator
  - [ ] Date indicator
  - [ ] Month indicator
  - [ ] Year indicator
- [ ] Provide basic chronograph support
  - Likely an array of dials, again, with custom properties to determine their rate of movement
- [ ] Let the right arrow cycle through dials to adjust time zones, dates, days, etc....
- [x] Add a day/night indicator
- [x] Provide minute repeater support

## Contact
[@Yuschick on Twitter](http://www.twitter.com/Yuschick)
