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
        <tr style="vertical-align:top">
            <td>durations</td>
<td style="white-space: nowrap;">

```ts
{
    seconds?: number;
    minutes?: number;
    hours?: number;
}
```

</td>
<td style="white-space: nowrap;">

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
    </tbody>
</table>

## Design Considerations

## Chronograph Functionality
