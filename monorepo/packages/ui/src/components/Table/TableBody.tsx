import React from 'react';

import { s_tableBody } from './Table.style';
import type { TableBodyProps } from './types';

function TableBody({ children, sx }: TableBodyProps) {
    return <tbody css={[s_tableBody, sx]}>{children}</tbody>;
}

export { TableBody };
