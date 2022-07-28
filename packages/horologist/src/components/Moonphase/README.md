<p align="center">
  <img src="/assets/logo-horologist.svg" alt="Horologist Logo - Making digital time mechanical" width="500" />
</p>

# Moonphase

A complication that shows the phases of the moon via a rotating disc through an aperture in the
dial. The four moon phases are new moon, first quarter, full moon, last quarter.

[Moonphase Settings](#moonphase-settings) | [Design Considerations](#design-considerations) |
[Moonphase Functionality](#moonphase-functionality)

## Moonphase Settings

```ts
moonphase: {
    id: string;
    reverse?: boolean;
}
```

### `id` | Required

The DOM element ID of the Moonphase hand or disc.

| Props | Required | Type   | Default | Value(s)       |
| ----- | -------- | ------ | ------- | -------------- |
| `id`  | Yes      | string | -       | DOM Element ID |

### `reverse`

By default, Horologist will rotate elements in a clockwise direction. Use the `reverse` prop to
rotate the elements counter-clockwise.

| Props     | Required | Type    | Default | Value(s)     |
| --------- | -------- | ------- | ------- | ------------ |
| `reverse` | No       | boolean | False   | True / False |

## Design Considerations

When designing a Moonphase to work with Horologist, there are a few considerations to keep in mind.

1. The Moonphase should be drawn at its starting position of a New Moon.
2. Horologist does not assign any `transition-origin` properties. These must be defined manually.

## Moonphase Functionality

The Moonphase display will be rotated relative to the current moon's position:
`'New' | 'Waxing Crescent' | 'First Quarter' | 'Waxing Gibbous' | 'Full' | 'Waning Gibbous' | 'Last Quarter' | 'Waning Crescent';`
