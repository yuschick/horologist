<p align="center">
  <img src="/assets/logo-horologist.svg" alt="Horologist Logo - Making digital time mechanical" width="500" />
</p>

# Dial

The face of a watch that displays the hands, time indicators and complications under the crystal.
Some watches, such as those that are fully skeletonized, don’t have traditional dials.

Horologist supports multiple simultaneous dials for creating dual timezone and world timer
timepieces.

[Dial Settings](#dial-settings) | [Design Considerations](#design-considerations) |
[Dial Functionality](#dial-functionality)

## Dial Settings

```ts
dials: [{
    format?: 12 | 24;
    hands: {
        seconds?: {
            id: string;
            jump?: boolean;
            retrograde?: {
                duration?: number;
                max: number;
            },
            sweep?: boolean;
        };
        minutes?: {
            id?: string;
            retrograde?: {
                 max: number;
            },
            reverse?: boolean;
            split?: {
                ones: string;
                tenths: string;
            };
        };
        hours?: {
            id?: string;
            jump?: boolean;
            retrograde?: {
                 max: number;
            },
            reverse?: boolean;
            split?: {
                ones: string;
                tenths: string;
            };
        }
    };
    id: string;
    timezone?: string;
}]
```

### `format`

Define the time format of the Dial, whether 12- or 24-hour.

| Props    | Required | Type   | Default | Value(s) |
| -------- | -------- | ------ | ------- | -------- |
| `format` | No       | number | 12      | 12 \| 24 |

### `hands` | Required

The `hands` object is required to contain at least one hand, whether that's seconds, minutes or
hours.

### `hands.seconds`

The hand to indicate the seconds value of the Dial's time.

#### Seconds Hand Transitions

There are three seconds hand movements supported by Horologist.

-   **Default**: The seconds hand completes multiple small steps between each position.
-   **Jump**: The seconds hand has no transition between each position and jumps from one position
    to the next.
-   **Sweep**: The seconds hand move smoothly and linearly around the dial

> **Note:** The `jump` and `sweep` properties cannot be combined.

| Props                 | Required | Type    | Default | Value(s)                                                                                    |
| --------------------- | -------- | ------- | ------- | ------------------------------------------------------------------------------------------- |
| `id`                  | Yes      | string  | -       | DOM Element ID                                                                              |
| `jump`                | No       | boolean | False   | Determines whether the second hand should _jump_ from position to position.                 |
| `retrograde.duration` | No       | number  | 60      | Sets the amount of seconds the retrograde displays.                                         |
| `retrograde.max`      | Yes      | number  | -       | The maximum rotation value for the seconds hand to reach the end of the retrograde display. |
| `sweep`               | No       | boolean | False   | Determines whether the second hand should move linearly from position to position.          |

### `hands.minutes`

The hand to indicate the minutes value of the Dial's time.

> **Note:** The `id` and ` retrograde` properties cannot be used with a `split` display.

| Props            | Required | Type    | Default | Value(s)                                                                                    |
| ---------------- | -------- | ------- | ------- | ------------------------------------------------------------------------------------------- |
| `id`             | Yes      | string  | -       | DOM Element ID                                                                              |
| `retrograde.max` | Yes      | number  | -       | The maximum rotation value for the minutes hand to reach the end of the retrograde display. |
| `reverse`        | No       | boolean | False   | True / False                                                                                |
| `split.ones`     | Yes      | string  | -       | DOM Element ID                                                                              |
| `split.tenths`   | Yes      | string  | -       | DOM Element ID                                                                              |

### `hands.hours`

The hand to indicate the hours value of the Dial's time.

By default, the hours hand will be rotated to account for the elapsed minutes. To avoid this
functionality, pass `jump: true` to force the hours indicator to jump from one position to the next
without offsetting the minutes. **Note:** This is the default behavior for split displays.

> **Note:** The `id` and ` retrograde` properties cannot be used with a `split` display.

| Props            | Required | Type    | Default | Value(s)                                                                                    |
| ---------------- | -------- | ------- | ------- | ------------------------------------------------------------------------------------------- |
| `id`             | Yes      | string  | -       | DOM Element ID                                                                              |
| `jump`           | No       | boolean | False   | Determines whether the hour indicator should _jump_ from one position to the next.          |
| `retrograde.max` | Yes      | number  | -       | The maximum rotation value for the minutes hand to reach the end of the retrograde display. |
| `reverse`        | No       | boolean | False   | True / False                                                                                |
| `split.ones`     | Yes      | string  | -       | DOM Element ID                                                                              |
| `split.tenths`   | Yes      | string  | -       | DOM Element ID                                                                              |

### `id` | Required

An ID to associate with each Dial for references between complications.

| Props | Required | Type   | Default | Value(s) |
| ----- | -------- | ------ | ------- | -------- |
| `id`  | Yes      | string | -       | -        |

### `timezone`

By default, the Dial will show the current location's time. However, this can be adjusted by passing
an IANA `timezone` string, like `Europe/Helsinki` to force the dial into a specific timezone.

| Props      | Required | Type   | Default | Value(s)                                                                      |
| ---------- | -------- | ------ | ------- | ----------------------------------------------------------------------------- |
| `timezone` | No       | string | -       | [IANA timezone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) |

## Design Considerations

When designing a Dial to work with Horologist, there are a few considerations to keep in mind.

1. For traditional displays, Horologist expects all Dial hands to be drawn at the 12:00 position.
2. For retrograde displays, Horologist expects the displays the begin at 1 and for the hands to be
   drawn in that position.
3. For split displays, Horologist expects each of the discs to be drawn at the 00 position.
4. Horologist does not assign any `transition-origin` properties. These must be defined manually.

## Dial Functionality

Coming Soon.
