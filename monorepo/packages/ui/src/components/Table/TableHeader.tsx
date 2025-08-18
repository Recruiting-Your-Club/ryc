import React from 'react';

import { s_tableHeader } from './Table.style';
import type { TableHeaderProps } from './types';

function TableHeader({ children, sx }: TableHeaderProps) {
    return <thead css={[s_tableHeader, sx]}>{children}</thead>;
}

export { TableHeader };
