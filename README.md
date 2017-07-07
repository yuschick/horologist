# TickTock JS
TickTock JS is a library for animating and rotating SVG elements to tell the time on a clock or watch dial. It works as a parent Watch class which builds components as needed based on the user settings. These components currently include:  

- Dials (with dual time support)
- Power Reserve
- Crown and Manual Time Functionality
- Moonphase

## Examples
[Voutilainen GMR](https://yuschick.github.io/voutilainen-gmr/)

[![Voutilainen GMR Screenshot](https://raw.githubusercontent.com/yuschick/voutilainen-gmr/master/screenshot.jpg)](https://yuschick.github.io/voutilainen-gmr/)

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
      id: 'local-time',
      hands: {
        hour: 'primary-hours-hand',
        minute: 'primary-minutes-hand'
      },
      offset: '+3'
    }, {
      id: 'home-time',
      hands: {
        hour: 'secondary-hours-hand',
        second: 'secondary-minutes-hand'
      },
      offset: '-4',
      format: 24
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
  }
};

let VoutilainenGMR = new Watch(settings);
```

#### dials [Array]  
- **id** (*String*): A name to identify the specific dial
- **hands** (*Object*):
 - **hour** (*String*): The id of the hour hand SVG element
 - **minute** (*String*): The id of the minute hand SVG element
 - **second** (*String*): The id of the second hand SVG element
- **offset** (*String*): *Default: 0* Use the offset value to define a GMT timezone (eg: '+2', '-4.5')
- **format** (*Number*): *Default: 12* Specify `12` or `24` to define if the dial should run as 12 or 24 hour time

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


## Contact
[@Yuschick on Twitter](http://www.twitter.com/Yuschick)
