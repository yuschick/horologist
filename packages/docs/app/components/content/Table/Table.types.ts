import { HTMLAttributes } from 'react';

import { TX } from '~/types/theme/tx.types';

export interface TableProps extends Omit<HTMLAttributes<HTMLTableElement>, 'style'> {
    caption: string;
    columns: TableHeading[];
    data: TableKeys[];
    isStriped?: boolean | 'odd';
}

type TableKeys = {
    [Key: string]: any;
};

type TableHeading = TX & {
    dataKey: string;
    heading: string;
};
