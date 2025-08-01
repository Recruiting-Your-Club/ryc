import React from 'react';

import { s_table, s_tableWrapper } from './Table.style';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import type { TableProps } from './types';

function TableRoot({ children, sxTable, sxWrapper }: TableProps) {
    return (
        <div css={[s_tableWrapper, sxWrapper]}>
            <table css={[s_table, sxTable]}>{children}</table>
        </div>
    );
}

const Table = Object.assign(TableRoot, {
    Header: TableHeader,
    Row: TableRow,
});

export { Table };
