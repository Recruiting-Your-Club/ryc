import React from 'react';

import { s_tableRow } from './Table.style';
import type { TableRowProps } from './types';

function TableRow({ children, sx }: TableRowProps) {
    return <tr css={[s_tableRow, sx]}>{children}</tr>;
}

export { TableRow };
