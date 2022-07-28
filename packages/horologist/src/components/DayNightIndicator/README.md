<p align="center">
  <img src="/assets/logo-horologist.svg" alt="Horologist Logo - Making digital time mechanical" width="500" />
</p>

# Day / Night Indicator

Quite literally indicates whether a 12-hour cycle is day or night (similar to an AM or PM
designation). This can be particularly useful when paired to a second time zone. The indicator often
works in tandem with a moon phase complication.

[Day / Night Indicator Settings](#day--night-indicator-settings) |
[Design Considerations](#design-considerations) |
[Day / Night Indicator Functionality](#day--night-indicator-functionality)

## Day / Night Indicator Settings

```ts
dayNight?: {
    id: string;
    offsetHours?: boolean;
    reverse?: boolean;
}
```

### `id` | Required

The DOM element ID of the Day / Night Indicator hand or disc.

| Props | Required | Type   | Default | Value(s)       |
| ----- | -------- | ------ | ------- | -------------- |
| `id`  | Yes      | string | -       | DOM Element ID |

### `offsetHours`

By default, the Day / Night Indicator will rotate in 25% increments to the the appropriate 6-hour
block of the day. However, when `offsetHours` is `true`, the indicator will rotate an additional
amount corresponding the current hour.

| Props         | Required | Type    | Default | Value(s)     |
| ------------- | -------- | ------- | ------- | ------------ |
| `offsetHours` | No       | boolean | False   | True / False |

### `reverse`

By default, Horologist will rotate elements in a clockwise direction. Use the `reverse` prop to
rotate the elements counter-clockwise.

| Props     | Required | Type    | Default | Value(s)     |
| --------- | -------- | ------- | ------- | ------------ |
| `reverse` | No       | Boolean | False   | True / False |

## Design Considerations

When designing a Day / Night Indicator display to work with Horologist, there are a few
considerations to keep in mind.

1. The Day / Night Indicator disc should be designed in an all day starting position.
2. Horologist does not assign any `transition-origin` properties. These must be defined manually.

## Day / Night Indicator Functionality

A Day / Night Indicator can more appropriately be viewed as an AM / PM indicator. The display is
often shown as a disc broken into two colored segments, light and dark.

00:00-05:59 -- All Day

06:00-11:59 -- Half Day / Half Night

12:00-17:59 -- All Night

18:00-23:59 -- Half Night / Half Day
