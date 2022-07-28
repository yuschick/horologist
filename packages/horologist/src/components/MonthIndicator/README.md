<p align="center">
  <img src="/assets/logo-horologist.svg" alt="Horologist Logo - Making digital time mechanical" width="500" />
</p>

# Month Indicator

A month complication is common in the world of watchmaking often found with perpetual calendar
displays, to indicate the current month of the year.

[Month Indicator Settings](#month-indicator-settings) |
[Design Considerations](#design-considerations) |
[Month Indicator Functionality](#month-indicator-functionality)

## Month Indicator Settings

```ts
month: {
    id: string;
    offsetDate?: boolean;
    retrograde?: {
        max: number;
    };
    reverse?: boolean;
}
```

### `id` | Required

The DOM element ID of the Month Indicator hand or disc.

| Props | Required | Type   | Default | Value(s)       |
| ----- | -------- | ------ | ------- | -------------- |
| `id`  | Yes      | string | -       | DOM Element ID |

### `offsetDate`

By default, the Month Indicator will be rotated to the exact month of the year. However, when
`offsetDate` is `true`, the indicator will be rotated an additional amount to relate to the current
date of the month.

| Props        | Required | Type    | Default | Value(s)     |
| ------------ | -------- | ------- | ------- | ------------ |
| `offsetDate` | No       | boolean | False   | True / False |

### `retrograde`

The DOM element ID of the retrograde month indicator hand or disc.

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

When designing a Month Indicator to work with Horologist, there are a few considerations to keep in
mind.

1. The Month Indicator should be drawn at its starting position of the first month.
2. Horologist does not assign any `transition-origin` properties. These must be defined manually.

## Month Indicator Functionality

The Month Indicator will rotate 360 / 12 degrees each month, unless shown as a `retrograde` display.
In which case, the Month Indicator will rotate 360 / `retrograde.max` degrees for each month.
