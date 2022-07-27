<p align="center">
  <img src="../../../../../assets/logo-horologist.svg" alt="Horologist Logo - Making digital time mechanical" width="500" />
</p>

# Chronograph

A chronograph is a specific type of clock or watch that is used as a stopwatch combined with a
display watch. With a series of hands and/or sub dials, chronographs allow the measuring of
durations down to the fractions of a second.

## Chronograph Settings

<table>
    <thead>
        <th>Prop</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
    </thead>
    <tbody>
        <tr>
            <td>durations</td>
<td>

```ts
{
    seconds?: number;
    minutes?: number;
    hours?: number;
}
```

</td>
<td>

```ts
{
    seconds: 60;
    minutes: 60;
    hours: 12;
}
```

</td>
            <td>The amount of seconds/minutes/hours to complete one full rotation of a chronograph sub-dial.</td>
        </tr>
        <tr>
        <td>flyback</td>
<td>

```ts
boolean;
```

</td>
<td>
        
```ts
false
```
        
</td>
        <td>A chronograph variation in which the seconds hand can be reset to zero and immediately started again by pressing only once on the pusher.</td>
        </tr>
        <tr>
        <td>pushers</td>
<td>

```ts
{
    mono: string;
    dual?: string;
    tri?: string
}
```

</td>
        <td> Required </td>
        <td>A pusher is the button or trigger on a watch case that controls the chronograph. While the mono property is required, Horologist can optionally support tri-pusher chronographs by providing a string ID to each pusher's corresponding DOM element.</td>
        </tr>
    </tbody>
</table>

`boolean`

## Design Considerations

## Chronograph Functionality
