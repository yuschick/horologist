<p align="center">
  <img src="/assets/logo-horologist.svg" alt="Horologist Logo - Making digital time mechanical" width="500" />
</p>

# Watch

The Watch is the primary class which controls all child complications and functionality. It contains
the top-level interval which is used by complications to keep all Watch elements aligned.

[Watch Settings](#watch-settings) | [Design Considerations](#design-considerations) |
[Watch Functionality](#watch-functionality)

## Watch Settings

```ts
new Watch({
    chronograph?: ChronographOptions;
    date?: DateIndicatorOptions;
    day?: DayIndicatorOptions;
    dayNight?: DayNightIndicatorOptions;
    dials?: DialOptions[];
    eq?: EquationOfTimeOptions;
    foudroyante?: FoudroyanteOptions;
    leapYear?: LeapYearIndicatorOptions;
    month?: MonthIndicatorOptions;
    moonphase?: MoonphaseOptions;
    repeater?: MinuteRepeaterOptions;
    reserve?: PowerReserveOptions;
    week?: WeekIndicatorOptions;
});
```

### `chronograph` - [View Chronograph Documentation](../Chronograph/)

### `date` - [View Date Indicator Documentation](../DateIndicator/)

### `day` - [View Day Indicator Documentation](../DayIndicator/)

### `dayNight` - [View Day / Night Indicator Documentation](../DayNightIndicator/)

### `dials` - [View Dials Documentation](../Dial/)

### `eq` - [View Equation of Time Documentation](../EquationOfTime/)

### `foudroyante` - [View Foudroyante Documentation](../Foudroyante/)

### `leapYear` - [View Leap Year Documentation](../LeapYearIndicator/)

### `month` - [View Month Indicator Documentation](../MonthIndicator/)

### `moonphase` - [View Moonphase Documentation](../Moonphase/)

### `repeater` - [View Minute Repeater Documentation](../MinuteRepeater/)

### `reserve` - [View Power Reserve Documentation](../PowerReserve/)

### `week` - [View Week Indicator Documentation](../WeekIndicator/)

## Design Considerations

1. Horologist does not assign any `transition-origin` properties. These must be defined manually.

## Watch Functionality

### Power Reserves

A Power Reserve and Indicator show how much power or energy the Watch has before it dies. If a Power
Reserve is added to the Watch, upon emptying, the global Watch class interval which animates all
child complications will be cleared. The interval will be restarted upon winding the Power Reserve.

-   Default, the Power Reserve will bind a `keydown` event to the document to wind the power
    reserve.

### Pushers

All pusher elements, whether Chronograph or Minute Repeater will:

-   Have `click` events bound to them to trigger their functionality.
-   Will add an `.active` class to the element to support any CSS transitions. The class is then
    removed `ontransitionend`
-   A `pointer` cursor is applied to the element.
-   A `role` of `button` is applied to the element.
