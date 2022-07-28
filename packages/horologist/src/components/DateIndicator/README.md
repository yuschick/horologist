<p align="center">
  <img src="/assets/logo-horologist.svg" alt="Horologist Logo - Making digital time mechanical" width="500" />
</p>

# Date Indicator

A date complication is common in the world of watchmaking, but comes in several different
variations, such as single displays, split displays, and retrograde indicators.

[Date Indicator Settings](#date-indicstor-settings) |
[Design Considerations](#design-considerations) |
[Date Indicator Functionality](#date-indicator-functionality)

## Date Indicator Settings

```ts
date?: {
    id: string;
    retrograde?: {
        max: number;
    };
    reverse?: boolean;
    split?: {
        ones: string;
        tenths: string;
    };
}
```

### `id` | Required

> **Note:** An `id` prop is not compatible with `split` displays.

The DOM element ID of the date indicator hand or disc.

| Props | Required | Type   | Default | Value(s)       |
| ----- | -------- | ------ | ------- | -------------- |
| `id`  | Yes      | string | -       | DOM Element ID |

### `retrograde`

> **Note:** A `retrograde` prop is not compatible with `split` displays.

The DOM element ID of the retrograde date indicator hand or disc.

| Props            | Required | Type   | Default | Value(s)                                                                                     |
| ---------------- | -------- | ------ | ------- | -------------------------------------------------------------------------------------------- |
| `retrograde.max` | Yes      | number | -       | The maximum rotation in degrees to reach the final date of the display. Often `90` or `180`. |

### `reverse`

By default, Horologist will rotate elements in a clockwise direction. Use the `reverse` prop to
rotate the elements counter-clockwise.

| Props     | Required | Type    | Default | Value(s)     |
| --------- | -------- | ------- | ------- | ------------ |
| `reverse` | No       | Boolean | False   | True / False |

### `split` | Required

> **Note:** A `split` display is not compatible with an `id` prop.

A split display is when two discs, a ones and tenths disc, rotate independently to display the date.
Often seen as a big date display. The `ones` disc will contain values 0-9 while the `tenths` disc
would display 0-3.

| Props          | Required | Type   | Default | Value(s)       |
| -------------- | -------- | ------ | ------- | -------------- |
| `split.ones`   | Yes      | string | -       | DOM Element ID |
| `split.tenths` | Yes      | string | -       | DOM Element ID |

## Design Considerations

When designing a Date Indicator display to work with Horologist, there are a few considerations to
keep in mind.

1. When dealing with a 360 display, whether a hand or a disc, the indicator must be positioned at 1,
   the first date of the month.
2. When working with retrograde displays, the indicator must be positioned at 1, the first day of
   the month. The `max` retrograde rotation is the rotation value needed to move the indicator to
   31, the last date of the month.
3. When designing a split display, the starting position for both discs must be `00`. The `ones`
   disc must contain values 0-9 and the `tenths` disc must contain values 0-3 evenly spaced around
   360 degrees.
4. Horologist does not assign any `transition-origin` properties. These must be defined manually.

## Date Indicator Functionality

### Standard Displays

When dates 1-31 are shown on a single disc or with a single hand.

### Retrograde Displays

When dates 1-31 are shown in a single semi-circle, often 180 or 90 degrees and indicated with a
single hand or disc.

### Split Displays

When the date is displayed in two pieces, a ones (0-9) indicator and tenths (0-3) indicator, both
rotated independently to form the full date value.
