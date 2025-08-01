import React from 'react';

import { s_table } from './Table.style';
import type { TableProps } from './types';

function Table({ children, sx }: TableProps) {
    return <div css={[s_table, sx]}>{children}</div>;
}

export { Table };
