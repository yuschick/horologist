# TickTock JS
TickTock JS is a library for animating and rotating SVG elements to tell the time on a clock or watch dial. There are various options and settings for sweeping hands, single-hand watches, GMT offsets, and manual time adjustments.

This library includes and relies heavily upon a couple libraries from [Zachary Johnson](www.zachstronaut.com). Thanks, Zach!

## Examples
[Demo on CodePen](http://codepen.io/Yuschick/pen/gayLQp)  
[Sarpaneva Northern Lights](http://codepen.io/Yuschick/pen/gbJgde)  
[Speake-Marin Velsheda](http://codepen.io/Yuschick/pen/ZYLdmQ)  
[A Lange & Sohne Zeitwerk](http://codepen.io/Yuschick/pen/yYeRPm)

## Get Started
Download TickTock and include it in your project after jQuery. Once included, call the library for use:
```javascript
var ticktock = ticktock(theSVGContainer, theComponents, theOptions);
```
Then call the init() function to start the time.
```javascript
ticktock.init();
```

## Documentation
**Note:** Transform origin points of components should be set via CSS. There is currently no support for automatic detection or passing the values into ticktock.

**Note:** If using the Single Hand feature, set the single hand element as theHourHand.

**theSVGContainer** - $(jQuery Object)  
The ID or identifying class of the parent SVG element that is to be animated.
```javascript
var theSVGContainer = $("#the-clock");
```

**theComponents** - {Object}  
A JavaScript object containing jQuery objects for the individual clock elements such as hands, crown, and reset button.
```javascript
var theComponents = {
  theSecondsHand: $(".seconds-hand"),
  theMinuteHand: $(".minute-hand"),
  theHourHand: $(".hour-hand"),
  theCrown: $(".the-crown"),
  theResetButton: $(".reset-button")
};
```

**theComponents.theSecondsHand** - $(jQuery Object)  
A jQuery object of the SVG element to use as the seconds hand.
```javascript
var theComponents = {
  theSecondsHand: $(".seconds-hand"),
  ...
};
```

**theComponents.theMinuteHand** - $(jQuery Object)  
A jQuery object of the SVG element to use as the minute hand.
```javascript
var theComponents = {
  theMinuteHand: $(".minute-hand"),
  ...
};
```

**theComponents.theHourHand** - $(jQuery Object)  
A jQuery object of the SVG element to use as the hour hand.
```javascript
var theComponents = {
  theHourHand: $(".hour-hand"),
  ...
};
```

**theComponents.theCrown** - $(jQuery Object)  
A jQuery object of the SVG element to use as the crown. If defined, the crown will be binded with the ability to be clicked to let the user manually scroll to adjust the time.
```javascript
var theComponents = {
  theCrown: $(".the-crown"),
  ...
};
```

**theComponents.theResetButton** - $(jQuery Object)  
A jQuery object of the SVG element to use as the reset button. This will be used in conjunction with the crown and manually setting the time. If a user manually adjusts the time, the reset button will be shown to allow the user to reset the watch back to the current time.
```javascript
var theComponents = {
  theResetButton: $(".reset-button"),
  ...
};
```

**theOptions** - {Object}  
A JavaScript object which sends any settings or options to ticktock to customize the functionality.
```javascript
var theOptions = {
  gmtOffset: Number,
  singleHand: Boolean,
  singleHandTarget: String,
  startSecondsAtZero: Boolean,
  sweep: Object {
    all: Boolean,
    onSet: Boolean,
    seconds: Boolean,
    minutes: Boolean,
    hours: Boolean,
    duration: Number
  },
  crown: Object {
    fillTarget: $(jQuery Object),
    fillClasses: [Array],
    speed: Number,
    activeClass: String
  }
};
```

**theOptions.gmtOffset** - Number  
*Default: null*  
Pass a number, negative or positive, to serve as a GMT offset when determining the time. For example, to show the time in New York the GMT offset would be -5.
```javascript
var theOptions = {
  gmtOffset: -5,
  ...
};
```

**theOptions.singleHand** - Boolean  
*Default: false*  
If true, the calculations for rotating the hand changes to acommodate a single hand watch.
```javascript
var theOptions = {
  singleHand: true,
  ...
};
```

**theOptions.startSecondsAtZero** - Boolean  
*Default: false*  
Determine whether the seconds hand should start at 0 or with the current time.
```javascript
var theOptions = {
  startSecondsAtZero: true,
  ...
};
```

**theOptions.sweep** - {Object}    
By defaut, all the hands will sweep/animate as they rotate. However, to achieve a ticking effect, pass some specific options into the sweep object to customize the individual hand behaviors.
```javascript
var theOptions = {
  sweep: {
    all: Boolean,
    onSet: Boolean,
    seconds: Boolean,
    minutes: Boolean,
    hours: Boolean,
    duration: Number
  }
  ...
};
```

**theOptions.sweep.all** - Boolean  
*Default: true*  
To quickly sweep or tick every hand, pass in the appropriate boolean value.
```javascript
var theOptions = {
  sweep: {
    all: false
  }
  ...
};
```

**theOptions.sweep.onSet** - Boolean  
*Default: true*  
Determine whether the hands should sweep to their **initial** position or rotate without any animation.
```javascript
var theOptions = {
  sweep: {
    onSet: false
  }
  ...
};
```

**theOptions.sweep.seconds** - Boolean  
*Default: true*  
Determine whether the seconds hand should sweep or tick.
```javascript
var theOptions = {
  sweep: {
    seconds: false
  }
  ...
};
```

**theOptions.sweep.minutes** - Boolean  
*Default: true*  
Determine whether the minute hand should sweep or tick.
```javascript
var theOptions = {
  sweep: {
    minutes: false
  }
  ...
};
```

**theOptions.sweep.hours** - Boolean  
*Default: true*  
Determine whether the hour hand should sweep or tick.
```javascript
var theOptions = {
  sweep: {
    hours: false
  }
  ...
};
```

**theOptions.sweep.duration** - Number  
*Default: 500*  
Determine the speed at which hands animate in milliseconds.
```javascript
var theOptions = {
  sweep: {
    duration: 150
  }
  ...
};
```

**theOptions.crown** - {Object}    
If a crown is present, customize its behavior with these options relating to active classes and styles. These options can be used to simuate the appearance of the crown rotating while the user manually sets the time.
```javascript
var theOptions = {
  crown: {
    fillTarget: $(jQuery Object),
    fillClasses: [Array],
    speed: Number,
    activeClass: String
  }
  ...
};
```

**theOptions.crown.fillTarget** - $(jQuery Object)   
*Default: null*  
Pass in a jQuery object to define which elements will be targeted to update with any classes provided later.
```javascript
var theOptions = {
  crown: {
    fillTarget: $(".fill-target"),
    ...
  }
  ...
};
```

**theOptions.crown.fillClasses** - [Array]   
*Default: null*  
Pass in an array of CSS class names that will be randomized and assigned to the specified fill target element(s).
```javascript
var theOptions = {
  crown: {
    fillTarget: $(".fill-target"),
    fillClasses: ['fill-1', 'fill-2', 'fill-3'],
    ...
  }
  ...
};
```

**theOptions.crown.speed** - Number   
*Default: 20*  
Define how quickly the fill classes are assigned to the fill target(s). The lower the number, the quicker the function is triggered.
```javascript
var theOptions = {
  crown: {
    fillTarget: $(".fill-target"),
    fillClasses: ['fill-1', 'fill-2', 'fill-3'],
    speed: 25,
    ...
  }
  ...
};
```

**theOptions.crown.activeClass** - String   
*Default: 'active'*  
When clicking on the crown to initiate manual time entry, an active class is assined to the crown for any possible positioning or styling changes. Pass in the active class that is to be assigned to the crown when it is triggered.
```javascript
var theOptions = {
  crown: {
    activeClass: 'crown-in-use',
    ...
  }
  ...
};
```

## Contact
[@Yuschick on Twitter](http://www.twitter.com/Yuschick)
