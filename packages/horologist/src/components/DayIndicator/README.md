<p align="center">
  <img src="/assets/logo-horologist.svg" alt="Horologist Logo - Making digital time mechanical" width="500" />
</p>

# Day Indicator

A day complication is common in the world of watchmaking, but comes in several different variations,
such as single displays, split displays, and retrograde indicators.

[Day Indicator Settings](#day-indicator-settings) | [Design Considerations](#design-considerations)
| [Day Indicator Functionality](#day-indicator-functionality)

## Day Indicator Settings

```ts
day: {
    id: string;
    offsetHours?: boolean;
    retrograde?. {
        max: number;
    };
    reverse?: boolean;
}
```

### `id` | Required

The DOM element ID of the Day Indicator hand or disc.

| Props | Required | Type   | Default | Value(s)       |
| ----- | -------- | ------ | ------- | -------------- |
| `id`  | Yes      | string | -       | DOM Element ID |

### `offsetHours`

By default, the Day Indicator will rotate to the the appropriate day. However, when `offsetHours` is
`true`, the indicator will rotate an additional amount corresponding the current hour of the day.

| Props         | Required | Type    | Default | Value(s)     |
| ------------- | -------- | ------- | ------- | ------------ |
| `offsetHours` | No       | boolean | False   | True / False |

### `retrograde`

The DOM element ID of the retrograde Day Indicator hand or disc.

| Props            | Required | Type   | Default | Value(s)                                                                                    |
| ---------------- | -------- | ------ | ------- | ------------------------------------------------------------------------------------------- |
| `retrograde.max` | Yes      | number | -       | The maximum rotation in degrees to reach the final day of the display. Often `90` or `180`. |

### `reverse`

By default, Horologist will rotate elements in a clockwise direction. Use the `reverse` prop to
rotate the elements counter-clockwise.

| Props     | Required | Type    | Default | Value(s)     |
| --------- | -------- | ------- | ------- | ------------ |
| `reverse` | No       | boolean | False   | True / False |

## Design Considerations

When designing a Day Indicator display to work with Horologist, there are a few considerations to
keep in mind.

1. Sunday is treated as the first day of the week. Any Day Indicator should be designed with its
   starting position at Sunday.
2. Horologist does not assign any `transition-origin` properties. These must be defined manually.

## Day Indicator Functionality

### Standard Displays

When days Sunday-Saturday are shown on a single disc or with a single hand.

### Retrograde Displays

When days Sunday-Saturday are shown in a single semi-circle, often 180 or 90 degrees and indicated
with a single hand or disc.
