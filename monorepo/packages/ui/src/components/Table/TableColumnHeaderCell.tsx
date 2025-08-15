import React from 'react';

import { s_tableColumnHeaderCell } from './Table.style';
import type { TableColumnHeaderCellProps } from './types';

function TableColumnHeaderCell({ children, sx }: TableColumnHeaderCellProps) {
    return <th css={[s_tableColumnHeaderCell, sx]}>{children}</th>;
}

export { TableColumnHeaderCell };
