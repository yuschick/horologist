<p align="center">
  <img src="/assets/horologist-repo-image.jpg" alt="Horologist Logo - Making digital time mechanical" />
</p>

# Leap Year Indicator

A date anomaly occurring once every four years when an extra day is added to February (29th). It
ensures that the Gregorian calendar is in synch with Earth’s revolutions around the sun, which is
almost 6 hours longer than 365 days. The Leap Year Indicator displays the current year's proximity
to the next (or current) leap year.

[Leap Year Indicator Settings](#leap-year-indicator-settings) |
[Design Considerations](#design-considerations) |
[Leap Year Indicator Functionality](#leap-year-indicator-functionality)

## Leap Year Indicator Settings

```ts
leapYear: {
    id: string;
    offsetMonths?: boolean;
    retrograde?: {
        max: number;
    };
    reverse?: boolean;
}
```

### `id` | Required

The DOM element ID of the Leap Year Indicator hand or disc.

| Props | Required | Type   | Default | Value(s)       |
| ----- | -------- | ------ | ------- | -------------- |
| `id`  | Yes      | string | -       | DOM Element ID |

### `offsetMonths`

By default, the Leap Year Indicator will rotate in 25% increments to the the appropriate year
position within a 4-year cycle. However, when `offsetMonths` is `true`, the indicator will rotate an
additional amount corresponding the current month of the year.

| Props          | Required | Type    | Default | Value(s)     |
| -------------- | -------- | ------- | ------- | ------------ |
| `offsetMonths` | No       | boolean | False   | True / False |

### `retrograde`

The DOM element ID of the retrograde Leap Year Indicator hand or disc.

| Props            | Required | Type   | Default | Value(s)                                                                                      |
| ---------------- | -------- | ------ | ------- | --------------------------------------------------------------------------------------------- |
| `retrograde.max` | Yes      | number | -       | The maximum rotation in degrees to reach the fourth year of the display. Often `90` or `180`. |

### `reverse`

By default, Horologist will rotate elements in a clockwise direction. Use the `reverse` prop to
rotate the elements counter-clockwise.

| Props     | Required | Type    | Default | Value(s)     |
| --------- | -------- | ------- | ------- | ------------ |
| `reverse` | No       | boolean | False   | True / False |

## Design Considerations

When designing a Leap Year Indicator to work with Horologist, there are a few considerations to keep
in mind.

1. The Leap Year Indicator should be drawn at its starting position of Year 1.
2. Horologist does not assign any `transition-origin` properties. These must be defined manually.

## Leap Year Indicator Functionality

When including a Leap Year Indicator, the current year will be shown as year a particular year
within a four-year cycle. Years 1, 2, 3 and 4, which is the leap year.
