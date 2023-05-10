import { TableProps } from './Table.types';

import { VisuallyHidden } from '~/components/typography/VisuallyHidden';

export function TableCaption({ caption }: Pick<TableProps, 'caption'>) {
    return (
        <caption>
            <VisuallyHidden>{caption}</VisuallyHidden>
        </caption>
    );
}
