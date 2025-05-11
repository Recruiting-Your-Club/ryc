import type { CSSObject } from '@emotion/react';
import type { HTMLAttributes, ReactNode } from 'react';
import React from 'react';
import { s_dropdownLabel } from './Dropdown.styles';

interface DropdownLabelProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    inset?: boolean;
    sx?: CSSObject;
}

function DropdownLabel({ children, inset = false, sx, ...props }: DropdownLabelProps) {
    return <div css={[s_dropdownLabel(inset), sx]}>{children}</div>;
}

export { DropdownLabel };
