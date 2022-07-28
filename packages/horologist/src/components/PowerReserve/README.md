<p align="center">
  <img src="/assets/logo-horologist.svg" alt="Horologist Logo - Making digital time mechanical" width="500" />
</p>

# Power Reserve

The amount of time a fully wound mainspring can power a watch before the movement stops, requiring
the spring to be rewound. A mechanical power reserve indicator shows how much power remains before
the watch stops.

[Power Reserve Settings](#power-reserve-settings) | [Design Considerations](#design-considerations)
| [Power Reserve Functionality](#power-reserve-functionality)

## Power Reserve Settings

```ts
reserve: {
    id: string;
    onEmpty?: () => void;
    range: {
        empty: number;
        full: number;
    };
    rate?: number;
    windingKey?: string;
}
```

### `id` | Required

The DOM element ID of the Power Reserve hand or disc.

| Props | Required | Type   | Default | Value(s)       |
| ----- | -------- | ------ | ------- | -------------- |
| `id`  | Yes      | string | -       | DOM Element ID |

### `onEmpty`

A function to be called whenever the Power Reserve reaches its empty value, effectively powering
down the Watch.

| Props     | Required | Type       | Default | Value(s) |
| --------- | -------- | ---------- | ------- | -------- |
| `onEmpty` | No       | () => void | -       | -        |

### `range` | Required

The minimum and maximum rotational values in degrees that correspond to the `full` and `empty`
states of the Power Reserve. The Power Reserve will not be able to be wound beyond the `full` value
and will call `onEmpty()` upon reaching the `empty` rotational value, effectively shutting down the
Watch.

If the Power Reserve indicator is drawn in its `full` position, then `range.full` would be `0`.

| Props         | Required | Type   | Default | Value(s)                                                                       |
| ------------- | -------- | ------ | ------- | ------------------------------------------------------------------------------ |
| `range.empty` | Yes      | number | -       | How far the Power Reserve indicator should rotate before running out of power. |
| `range.full`  | Yes      | number | -       | How far the Power Reserve indicator can be rotated to display full power.      |

### `rate`

The rate of degrees at which the Power Reserve indicator will drain per second.

| Props  | Required | Type   | Default | Value(s)                                                                   |
| ------ | -------- | ------ | ------- | -------------------------------------------------------------------------- |
| `rate` | No       | number | 0.5     | How many degrees should the Power Reserve indicator be drained per second. |

### `windingKey`

When adding a Power Reserve to the Watch class, an event listener is added to the body to 'wind' the
Power Reserve. The `windingKey` property allows a custom key to perform this action.

| Props        | Required | Type   | Default | Value(s)                                                   |
| ------------ | -------- | ------ | ------- | ---------------------------------------------------------- |
| `windingKey` | No       | string | ArrowUp | A keyboard key value to wind the Power Reserve until full. |

## Design Considerations

When designing a Power Reserve to work with Horologist, there are a few considerations to keep in
mind.

1. The Power Reserve indicator must be positioned within the `range` values. Ideally, the indicator
   would be drawn at its `full` position, meaning `range.full` would be `0` and `range.empty` would
   be the full rotational value of the indicator.
2. If the indicator is to rotate clockwise, `range.empty` should be a positive number and greater
   than `range.full`. If the indicator is to rotate counter-clockwise, the `range.empty` value
   should be negative and smaller than `range.full`.
3. Horologist does not assign any `transition-origin` properties. These must be defined manually.

## Power Reserve Functionality

The Power Reserve will automatically set itself to its `full` position on `start()` if it's not
already set there. From this point, the reserve will increment/decrement by its `rate` until it
reaches its `range.empty` rotational value. When this happens, the parent Watch interval will be
cleared, and the Watch will no longer work until the Power Reserve is wound again.
