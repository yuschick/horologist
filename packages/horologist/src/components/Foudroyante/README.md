<p align="center">
  <img src="/assets/horologist-repo-image.jpg" alt="Horologist Logo - Making digital time mechanical" />
</p>

# Foudroyante

Also known as a flying seconds hand, it’s a sub-dial that indicates fractions of a second.

[Foudroyante Settings](#foudroyante-settings) | [Design Considerations](#design-considerations) |
[Foudroyante Functionality](#foudroyante-functionality)

## Foudroyante Settings

```ts
foudroyante: {
    id: string;
    steps: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}
```

### `id` | Required

The DOM element ID of the Equation of Time hand or disc.

| Props | Required | Type   | Default | Value(s)       |
| ----- | -------- | ------ | ------- | -------------- |
| `id`  | Yes      | string | -       | DOM Element ID |

### `steps` | Required

By default, Horologist will rotate elements in a clockwise direction. Use the `reverse` prop to
rotate the elements counter-clockwise.

| Props   | Required | Type   | Default | Value(s)                                              |
| ------- | -------- | ------ | ------- | ----------------------------------------------------- |
| `steps` | Yes      | number | -       | The amount of steps the hand should take each second. |

## Design Considerations

When designing a Foudroyante display to work with Horologist, there are a few considerations to keep
in mind.

1. The Foudroyante indicator should be drawn at its starting position of 0 seconds.
2. Horologist does not assign any `transition-origin` properties. These must be defined manually.

## Foudroyante Functionality

A Foudroyante display rotates 360 degrees every second, broken into fractions of a second, or
`steps`.
