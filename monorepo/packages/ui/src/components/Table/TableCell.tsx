import React from 'react';

import { s_tableCell } from './Table.style';
import type { TableCellProps } from './types';

function TableCell({ children, sx }: TableCellProps) {
    return <td css={[s_tableCell, sx]}>{children}</td>;
}

export { TableCell };
