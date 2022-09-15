<p align="center">
  <img src="/assets/horologist-repo-image.jpg" alt="Horologist Logo - Making digital time mechanical" />
</p>

# Equation of Time

Measures the variation of the lengths of days throughout a year. For example, during parts of the
year, days can fluctuate by around 20 seconds above or below 24 hours. This is caused by the Earth’s
orbit around the sun being slightly elliptical and the sun’s eastward passage throughout the year
being fastest at the solstices and slowest at the equinoxes. Clocks and watches, however, measure
time at a steady rate, known as mean time, while solar time fluctuates as mentioned above – the
equation of time is the offset between mean time and solar time.

[Equation of Time Settings](#equation-of-time-settings) |
[Design Considerations](#design-considerations) |
[Equation of Time Functionality](#equation-of-time-functionality)

## Equation of Time Settings

```ts
eq: {
    id: string;
    range: {
        max: number;
        min: number;
    }
}
```

### `id` | Required

The DOM element ID of the Equation of Time hand or disc.

| Props | Required | Type   | Default | Value(s)       |
| ----- | -------- | ------ | ------- | -------------- |
| `id`  | Yes      | string | -       | DOM Element ID |

### `range` | Required

With the Equation of Time indicator drawn at 0, define the minimum and maximum rotation values in
degrees for the indicator.

| Props       | Required | Type   | Default | Value(s)                                                                |
| ----------- | -------- | ------ | ------- | ----------------------------------------------------------------------- |
| `range.max` | Yes      | number | -       | The maximum rotation value when the equation of time value is positive. |
| `range.min` | Yes      | number | -       | The minimum rotation value when the equation of time value is negative. |

## Design Considerations

When designing an Equation of Time display to work with Horologist, there are a few considerations
to keep in mind.

1. The Equation of Time indicator should be drawn at the 0 value of the display, with a maximum
   range of 16 minutes and minimum range of 14 minutes.
2. Horologist does not assign any `transition-origin` properties. These must be defined manually.

## Equation of Time Functionality

The Equation of Time value can range between of a minimum of 14 minutes and a maximum of 16 minutes.
These values are then divided against the `range.min` and `range.max` values to determine the
rotation value to apply to the indicator.
