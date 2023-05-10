import { HTMLAttributes } from 'react';

import { TX } from '~/types/theme/tx.types';

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
    caption: string;
    columns: TableHeading[];
    data: TableKeys[];
    isStriped?: true | 'odd';
}

type TableKeys = {
    [Key: string]: any;
};

type TableHeading = TX & {
    dataKey: string;
    heading: string;
};
