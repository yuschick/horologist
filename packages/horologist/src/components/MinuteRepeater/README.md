<p align="center">
  <img src="/assets/horologist-repo-image.jpg" alt="Horologist Logo - Making digital time mechanical" />
</p>

# Minute Repeater

Complication in which a hammer strikes a gong within a watch movement when a pusher is manually
pressed, audibly indicating the time by first striking the hours, then quarters and lastly minutes.

[Minute Repeater Settings](#minute-repeater-settings) |
[Design Considerations](#design-considerations) |
[Minute Repeater Functionality](#minute-repeater-functionality)

## Minute Repeater Settings

```ts
repeater: {
    chimes: {
        hours: string;
        minutes: string;
    };
    id: string;
    onEnd?: () => void;
    onPlay?: () => void;
    onStop?: () => void;
}
```

### `chimes` | Required

> **Note:** The quarter-hour chimes are played as a combination of the hour and minute chimes.

The audible chimes to be played when indicating the time.

| Props            | Required | Type   | Default | Value(s)                |
| ---------------- | -------- | ------ | ------- | ----------------------- |
| `chimes.hours`   | Yes      | string | -       | Filepath to audio file. |
| `chimes.minutes` | Yes      | string | -       | Filepath to audio file. |

### `id` | Required

The DOM element ID of the Minute Repeater Pusher.

> **Note:** Horologist will bind `click` event listeners to the pusher to handle the Minute Repeater
> functionality.

> **Note:** Horologist will add `pointer` cursors to the pusher.

> **Note:** When the pusher is triggered, an `.active` class will be applied to handle any potential
> CSS transitions. Additionally, the class will be removed `ontransitionend`.

| Props | Required | Type   | Default | Value(s)       |
| ----- | -------- | ------ | ------- | -------------- |
| `id`  | Yes      | string | -       | DOM Element ID |

### `onEnd`

A function to be called whenever the Minute Repeater completes indicating the time.

| Props   | Required | Type       | Default | Value(s) |
| ------- | -------- | ---------- | ------- | -------- |
| `onEnd` | No       | () => void | -       | -        |

### `onPlay`

A function to be called whenever the Minute Repeater is triggered to play the time.

| Props    | Required | Type       | Default | Value(s) |
| -------- | -------- | ---------- | ------- | -------- |
| `onPlay` | No       | () => void | -       | -        |

### `onStop`

A function to be called whenever the Minute Repeater is manually stopped by clicking the pusher
again during playback.

| Props    | Required | Type       | Default | Value(s) |
| -------- | -------- | ---------- | ------- | -------- |
| `onStop` | No       | () => void | -       | -        |

## Design Considerations

When designing a Minute Repeater to work with Horologist, there are a few considerations to keep in
mind.

1. When clicking the Minute Repeater pusher, an `.active` class will be applied to handle any
   possible CSS transitions.
2. Horologist does not assign any `transition-origin` properties. These must be defined manually.

## Minute Repeater Functionality

When clicking the Minute Repeater pusher, the time will begin audibly playing. If the pusher is
clicked again during the playback, playback will be stopped. Additionally, if the minute repeat is
playing at the time a the power reserve empties, the playback will also be stopped.
