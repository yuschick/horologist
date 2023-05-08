import type { Space } from "./theme.types";

export type Spacing = Padding & Margin;

export type Padding = {
  padding?: SpaceOptions;
};

export type Margin = {
  margin?: SpaceOptions;
};

export type SpaceOptions = {
  block?: Space | [Space, Space];
  blockEnd?: Space;
  blockStart?: Space;
  inline?: Space | [Space, Space];
  inlineEnd?: Space;
  inlineStart?: Space;
  all?: Space | [Space, Space?, Space?, Space?];
};
