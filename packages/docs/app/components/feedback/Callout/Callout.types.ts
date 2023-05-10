import { HTMLAttributes } from 'react';

export interface CalloutProps extends Omit<HTMLAttributes<HTMLDivElement>, 'style'> {
    message: string;
    type: 'alert' | 'neutral' | 'success' | 'warning';
}
