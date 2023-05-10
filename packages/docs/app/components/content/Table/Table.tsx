import { v4 as uuidv4 } from 'uuid';
import { TableProps } from './Table.types';

import styles from './Table.module.css';
import { TableCaption } from './TableCaption';
import { useMemo } from 'react';
import classNames from 'classnames';
import { generateThemeStyles } from '~/utils/generateThemeStyles';

export function Table({ caption, columns, data, isStriped = true, ...htmlAttributes }: TableProps) {
    const keyedColumns = useMemo(
        () => columns.map((col) => ({ ...col, key: uuidv4() })),
        [columns],
    );
    const keyedData = useMemo(() => data.map((entry) => ({ ...entry, key: uuidv4() })), [data]);

    return (
        <div className={styles['table-wrapper']}>
            <table
                className={classNames(styles.table, {
                    [styles['is-striped']]: isStriped === true,
                    [styles['is-striped-odd']]: isStriped === 'odd',
                })}
                {...htmlAttributes}
            >
                <TableCaption caption={caption} />
                <thead>
                    <tr>
                        {keyedColumns.map((col) => (
                            <th key={col.key}>{col.heading}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {keyedData.map((entry) => {
                        return (
                            <tr key={entry.key}>
                                {keyedColumns.map((col) => {
                                    const styles = col.tx
                                        ? generateThemeStyles({ tx: col.tx })
                                        : undefined;
                                    return (
                                        <td key={entry.key + col.key} style={styles}>
                                            {/* TODO: Refactor types to prevent this any */}
                                            {(entry as any)[col.dataKey]}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
