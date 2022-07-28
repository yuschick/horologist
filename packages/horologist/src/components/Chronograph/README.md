<p align="center">
  <img src="../../../../../assets/logo-horologist.svg" alt="Horologist Logo - Making digital time mechanical" width="500" />
</p>

# Chronograph

A chronograph is a specific type of clock or watch that is used as a stopwatch combined with a
display watch. With a series of hands and/or sub dials, chronographs allow the measuring of
durations down to the fractions of a second.

## Chronograph Settings

```ts
chronograph?: {
    durations?: {
        subSeconds?: number;
        seconds?: number;
        minutes?: number;
        hours?: number;
    };
    flyback?: boolean;
    hands: {
        subSeconds?: string;
        seconds: string;
        minutes: string;
        hours?: string;
        rattrapante?: {
            seconds: string;
            minutes?: string;
            hours?: string;
        }
    };
    pushers: {
        mono: string;
        dual?: string;
        tri?: string;
    }
}
```

### `durations`

The amount of seconds/minutes/hours to complete one full rotation of a chronograph sub-dial.

| Props                  | Required | Type   | Default | Value(s) |
| ---------------------- | -------- | ------ | ------- | -------- |
| `durations.subSeconds` | No       | number | 10      | 2-30     |
| `durations.seconds`    | No       | number | 60      | > 2      |
| `durations.minutes`    | No       | number | 60      | > 2      |
| `durations.hours`      | No       | number | 12      | > 2      |

---

### `flyback`

A chronograph variation in which the seconds hand can be reset to zero and immediately started again
with only one press of the pusher.

| Props     | Required | Type    | Default | Value(s)     |
| --------- | -------- | ------- | ------- | ------------ |
| `flyback` | No       | boolean | False   | True / False |

---

### `hands` | Required

The hand elements to be rotated for each of the chronograph sub-dials and variations.

| Props               | Required | Type   | Default | Value(s)       |
| ------------------- | -------- | ------ | ------- | -------------- |
| `hands.subSeconds`  | No       | string | -       | DOM Element ID |
| `hands.seconds`     | Yes      | string | -       | DOM Element ID |
| `hands.minutes`     | Yes      | string | -       | DOM Element ID |
| `hands.hours`       | No       | string | -       | DOM Element ID |
| `hands.rattrapante` | No       | { }    | -       | See Below      |

---

### `hands.rattrapante`

A chronograph with an additional seconds, minutes or hour hands (and pusher) that can time two
events simultaneously that start together, but end at different times.

| Props                 | Required | Type   | Default | Value(s)       |
| --------------------- | -------- | ------ | ------- | -------------- |
| `rattrapante.seconds` | Yes      | string | -       | DOM Element ID |
| `rattrapante.minutes` | No       | string | -       | DOM Element ID |
| `rattrapante.hours`   | No       | string | -       | DOM Element ID |

---

### `pushers` | Required

A pusher is a button or trigger on a watch case that controls the chronograph. While dual-pusher
chronographs are the most common, mono- and tri-pusher variations are also supported by Horologist.

> **Note:** Horologist will bind `click` event listeners to the pushers to handle the Chronograph
> functionality.

> **Note:** Horologist will add `pointer` cursors to the pushers.

> **Note:** When a pusher is triggered, an `.active` class will be applied to handle any potential
> CSS transitions. Additionally, the class will be removed `ontransitionend`.

| Props          | Required | Type   | Default | Value(s)       |
| -------------- | -------- | ------ | ------- | -------------- |
| `pushers.mono` | Yes      | string | -       | DOM Element ID |
| `pushers.dual` | No       | string | -       | DOM Element ID |
| `pushers.tri`  | No       | string | -       | DOM Element ID |

## Design Considerations

When designing a Chronograph to work with Horologist, there are a few considerations to keep in
mind.

1. All chronograph hands must be positioned at their 0 starting point.
2. Horologist does not assign any `transition-origin` properties. These must be defined manually.

## Chronograph Functionality

There are many different variations and configurations to the chronograph functionality and there is
no one standard way of controlling them. Horologist has applied its own patterns to how its pushers,
hands and chronograph functionality interact. To understand this functionality, some terminology
must first be explained.

| State           | Description                                                                                                                                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **READY**       | When the chronograph is not running, nor paused, and its hands are in their starting positions. The chronograph is _ready_ to be used.                                                                 |
| **ACTIVE**      | When the chronograph is actively running.                                                                                                                                                              |
| **PAUSED**      | When the chronograph has been stopped, but it and its hands have not been returned to READY STATE.                                                                                                     |
| **SPLIT SET**   | Rattrapante Chronographs can pause their rattrapante (or split) hands while the constant hands continue. When the rattrapante hands have been set, the Chronograph will be moved into SPLIT SET STATE. |
| **UNSET SPLIT** | After the rattrapante hands have been set, they can be _unset_ and caught back up to the constant hands. This unsetting moves the Chronograph from SPLIT SET STATE to ACTIVE STATE.                    |

### Mono-Pusher

A chronograph with only a single pusher.

> **Note:** Mono-pusher Chronographs cannot support `flyback` or `rattrapante` functionality.

| Current State | Pusher | Next State   | Details |
| ------------- | ------ | ------------ | ------- |
| READY STATE   | Mono   | ACTIVE STATE | -       |
| ACTIVE STATE  | Mono   | PAUSED STATE | -       |
| PAUSED STATE  | Mono   | READY STATE  | -       |

### Dual-Pusher

A chronograph with two pushers, generally at 2 and 5 o' clock on the case. Dual-pusher Chronographs
can support `flyback` and/or `rattrapante` variations.

#### Dual-Pusher - Standard

| Current State | Pusher | Next State   | Details                                      |
| ------------- | ------ | ------------ | -------------------------------------------- |
| READY STATE   | Mono   | ACTIVE STATE | -                                            |
| READY STATE   | Dual   | -            | The dual pusher has no effect in this state. |
| ACTIVE STATE  | Mono   | PAUSED STATE | -                                            |
| ACTIVE STATE  | Dual   | READY STATE  | -                                            |
| PAUSED STATE  | Mono   | ACTIVE STATE |  -                                           |
| PAUSED STATE  | Dual   | READY STATE  |  -                                           |

#### Dual-Pusher - Flyback

| Current State | Pusher | Next State   | Details                                                 |
| ------------- | ------ | ------------ | ------------------------------------------------------- |
| READY STATE   | Mono   | ACTIVE STATE | -                                                       |
| READY STATE   | Dual   | -            | The dual pusher has no effect in this state.            |
| ACTIVE STATE  | Mono   | PAUSED STATE | -                                                       |
| ACTIVE STATE  | Dual   | ACTIVE STATE | Flyback - Resets all hands to their starting positions. |
| PAUSED STATE  | Mono   | ACTIVE STATE |  -                                                      |
| PAUSED STATE  | Dual   | READY STATE  |  -                                                      |

#### Dual-Pusher - Rattrapante

| Current State            | Pusher | Next State                 | Details                                                     |
| ------------------------ | ------ | -------------------------- | ----------------------------------------------------------- |
| READY STATE              | Mono   | ACTIVE STATE               | -                                                           |
| READY STATE              | Dual   | -                          | The dual pusher has no effect in this state.                |
| ACTIVE STATE             | Mono   | PAUSED STATE               | -                                                           |
| ACTIVE STATE             | Dual   | SPLIT SET STATE            | Rattrapante - Stop all Rattrapante hands in place.          |
| SPLIT SET STATE          | Mono   | PAUSED STATE               | -                                                           |
| SPLIT SET STATE          | Dual   | UNSET SPLIT & ACTIVE STATE | Rattrapante - Rattrapante hands catch up to constant hands. |
| PAUSED STATE             | Mono   | ACTIVE STATE               |  -                                                          |
| PAUSED STATE             | Dual   | READY STATE                |  -                                                          |
| PAUSED & SPLIT SET STATE | Mono   | ACTIVE STATE               |  -                                                          |
| PAUSED & SPLIT SET STATE | Dual   | READY STATE                |  -                                                          |

#### Dual-Pusher - Flyback Rattrapante

| Current State            | Pusher | Next State                 | Details                                                                                                             |
| ------------------------ | ------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| READY STATE              | Mono   | ACTIVE STATE               | -                                                                                                                   |
| READY STATE              | Dual   | -                          | The dual pusher has no effect in this state.                                                                        |
| ACTIVE STATE             | Mono   | PAUSED STATE               | -                                                                                                                   |
| ACTIVE STATE             | Dual   | SPLIT SET STATE            | Rattrapante - Stop all Rattrapante hands in place.<br/>Flyback - Resets constant hands to their starting positions. |
| SPLIT SET STATE          | Mono   | PAUSED STATE               | -                                                                                                                   |
| SPLIT SET STATE          | Dual   | UNSET SPLIT & ACTIVE STATE | Rattrapante - Rattrapante hands catch up to constant hands.                                                         |
| PAUSED STATE             | Mono   | ACTIVE STATE               |  -                                                                                                                  |
| PAUSED STATE             | Dual   | READY STATE                |  -                                                                                                                  |
| PAUSED & SPLIT SET STATE | Mono   | ACTIVE STATE               | Reset constant hands to their starting positions.                                                                   |
| PAUSED & SPLIT SET STATE | Dual   | READY STATE                |  -                                                                                                                  |

#### Tri-Pusher - Standard

| Current State | Pusher | Next State   | Details                                      |
| ------------- | ------ | ------------ | -------------------------------------------- |
| READY STATE   | Mono   | ACTIVE STATE | -                                            |
| READY STATE   | Dual   | -            | The dual pusher has no effect in this state. |
| READY STATE   | Tri    | -            | The tri pusher has no effect in this state.  |
| ACTIVE STATE  | Mono   | PAUSED STATE | -                                            |
| ACTIVE STATE  | Dual   | READY STATE  | -                                            |
| ACTIVE STATE  | Tri    | -            | The tri pusher has no effect in this state.  |
| PAUSED STATE  | Mono   | ACTIVE STATE |  -                                           |
| PAUSED STATE  | Dual   | READY STATE  |  -                                           |
| PAUSED STATE  | Tri    | -            |  The tri pusher has no effect in this state. |

#### Tri-Pusher - Flyback

| Current State | Pusher | Next State   | Details                                                 |
| ------------- | ------ | ------------ | ------------------------------------------------------- |
| READY STATE   | Mono   | ACTIVE STATE | -                                                       |
| READY STATE   | Dual   | -            | The dual pusher has no effect in this state.            |
| READY STATE   | Tri    | -            | The tri pusher has no effect in this state.             |
| ACTIVE STATE  | Mono   | PAUSED STATE | -                                                       |
| ACTIVE STATE  | Dual   | ACTIVE STATE | Flyback - Resets all hands to their starting positions. |
| ACTIVE STATE  | Tri    | READY STATE  |  -                                                      |
| PAUSED STATE  | Mono   | ACTIVE STATE |  -                                                      |
| PAUSED STATE  | Dual   | READY STATE  |  -                                                      |
| PAUSED STATE  | Tri    | READY STATE  |  -                                                      |

#### Tri-Pusher - Rattrapante

| Current State            | Pusher | Next State                 | Details                                                     |
| ------------------------ | ------ | -------------------------- | ----------------------------------------------------------- |
| READY STATE              | Mono   | ACTIVE STATE               | -                                                           |
| READY STATE              | Dual   | -                          | The dual pusher has no effect in this state.                |
| READY STATE              | Tri    | -                          | The tri pusher has no effect in this state.                 |
| ACTIVE STATE             | Mono   | PAUSED STATE               | -                                                           |
| ACTIVE STATE             | Dual   | SPLIT SET STATE            | Rattrapante - Stop all Rattrapante hands in place.          |
| ACTIVE STATE             | Tri    | READY STATE                | -                                                           |
| SPLIT SET STATE          | Mono   | PAUSED STATE               | -                                                           |
| SPLIT SET STATE          | Dual   | UNSET SPLIT & ACTIVE STATE | Rattrapante - Rattrapante hands catch up to constant hands. |
| SPLIT SET STATE          | Tri    | -                          | The tri pusher has no effect in this state.                 |
| PAUSED STATE             | Mono   | ACTIVE STATE               | -                                                           |
| PAUSED STATE             | Dual   | -                          | The dual pusher has no effect in this state.                |
| PAUSED STATE             | Tri    | READY STATE                | -                                                           |
| PAUSED & SPLIT SET STATE | Mono   | ACTIVE STATE               | -                                                           |
| PAUSED & SPLIT SET STATE | Dual   | -                          | The dual pusher has no effect in this state.                |
| PAUSED & SPLIT SET STATE | Tri    | READY STATE                | -                                                           |

#### Tri-Pusher - Flyback Rattrapante

| Current State            | Pusher | Next State                 | Details                                                     |
| ------------------------ | ------ | -------------------------- | ----------------------------------------------------------- |
| READY STATE              | Mono   | ACTIVE STATE               | -                                                           |
| READY STATE              | Dual   | -                          | The dual pusher has no effect in this state.                |
| READY STATE              | Tri    | -                          | The tri pusher has no effect in this state.                 |
| ACTIVE STATE             | Mono   | PAUSED STATE               | -                                                           |
| ACTIVE STATE             | Dual   | SPLIT SET STATE            | Rattrapante - Stop all Rattrapante hands in place.          |
| ACTIVE STATE             | Tri    | ACTIVE STATE               | Flyback - Resets all hands to their starting positions.     |
| SPLIT SET STATE          | Mono   | PAUSED STATE               | -                                                           |
| SPLIT SET STATE          | Dual   | UNSET SPLIT & ACTIVE STATE | Rattrapante - Rattrapante hands catch up to constant hands. |
| SPLIT SET STATE          | Tri    | UNSET SPLIT & ACTIVE STATE | FLyback - Resets all hands to their starting positions.     |
| PAUSED STATE             | Mono   | ACTIVE STATE               | -                                                           |
| PAUSED STATE             | Dual   | -                          | The dual pusher has no effect in this state.                |
| PAUSED STATE             | Tri    | READY STATE                | -                                                           |
| PAUSED & SPLIT SET STATE | Mono   | ACTIVE STATE               | -                                                           |
| PAUSED & SPLIT SET STATE | Dual   | PAUSED STATE               | Rattrapante - Rattrapante hands catch up to constant hands. |
| PAUSED & SPLIT SET STATE | Tri    | READY STATE                | -                                                           |
