import type { Spacing } from './space.types';
import type { Color, FontFamily, FontSize, FontWeight } from './theme.types';

export type TX = {
    tx?: {
        color?: Color;
        family?: FontFamily;
        size?: FontSize;
        weight?: FontWeight;
    } & Spacing;
};
