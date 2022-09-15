<p align="center">
  <img src="/assets/horologist-repo-image.jpg" alt="Horologist Logo - Making digital time mechanical" />
</p>

# Week Indicator

The Week Indicator rotates an element to depict the current week of the year, whether standard or
iso week. If iso, then getISODay is used where Monday is 1 and Sunday is 7. Otherwise, getDay is
used, where Sunday is 0 and Saturday is 6.

[Week Indicator Settings](#week-indicator-settings) |
[Design Considerations](#design-considerations) |
[Week Indicator Functionality](#week-indicator-functionality)

## Week Indicator Settings

```ts
week: {
    id: string;
    iso?: boolean;
    offsetDays?: boolean;
    retrograde?: {
        max: number;
    };
    reverse?: boolean;
}
```

### `id` | Required

The DOM element ID of the Week Indicator hand or disc.

| Props | Required | Type   | Default | Value(s)       |
| ----- | -------- | ------ | ------- | -------------- |
| `id`  | Yes      | string | -       | DOM Element ID |

### `iso`

When `true`, the Week Indicator can display up to 53 weeks and will use date-fns `getISODay` to
determine the `offsetDays` value. However, when `false`, the display will expect a standard 52-week
value, and use date-fns `getDay` to determine the `offsetDays` value.

| Props | Required | Type    | Default | Value(s)     |
| ----- | -------- | ------- | ------- | ------------ |
| `iso` | No       | boolean | False   | True / False |

### `offsetDays`

By default, the Week Indicator will rotate to display the current week of the year, whether a
standard 52 weeks or ISO 53 weeks. However, when `true`, the Week Indicator will be rotated an
additional amount to to indicate the current day of the week.

If `iso: true`, then date-fns `getISODay` is used where Monday is 1 and Sunday is 7. Otherwise,
date-fns `getDay` is used, where Sunday is 0 and Saturday is 6.

| Props        | Required | Type    | Default | Value(s)     |
| ------------ | -------- | ------- | ------- | ------------ |
| `offsetDays` | No       | boolean | False   | True / False |

### `retrograde`

The DOM element ID of the retrograde Week Indicator hand or disc.

| Props            | Required | Type   | Default | Value(s)                                                                                     |
| ---------------- | -------- | ------ | ------- | -------------------------------------------------------------------------------------------- |
| `retrograde.max` | Yes      | number | -       | The maximum rotation in degrees to reach the final week of the display. Often `90` or `180`. |

### `reverse`

By default, Horologist will rotate elements in a clockwise direction. Use the `reverse` prop to
rotate the elements counter-clockwise.

| Props     | Required | Type    | Default | Value(s)     |
| --------- | -------- | ------- | ------- | ------------ |
| `reverse` | No       | boolean | False   | True / False |

## Design Considerations

When designing a Week Indicator to work with Horologist, there are a few considerations to keep in
mind.

1. The Week Indicator expects to be drawn at its starting position of Week 1, which will be treated
   as 0 degrees rotation.
2. Horologist does not assign any `transition-origin` properties. These must be defined manually.

## Week Indicator Functionality

By default, the Week Indicator will rotate 360 degrees to represent an entire year, meaning each
week would result in `360 / 52 (53)` degrees of rotation. If `offsetDays` is `true`, an additional
value will be added to the indicator's rotation of `360 / 52 (53) / 7` degrees.

If the Week Indicator is a retrograde display, the same calculations are used, however, `360` will
be replaced with the value of `retrograde.max`.
