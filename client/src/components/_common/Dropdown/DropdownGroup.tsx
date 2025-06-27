import type { CSSObject } from '@emotion/react';
import type { HTMLAttributes, ReactNode } from 'react';
import React from 'react';
import { s_dropdownGroup } from './Dropdown.styles';
import type { DropdownGruopProps } from './types';

function DropdownGroup({ children, sx, ...props }: DropdownGruopProps) {
    return (
        <div css={[s_dropdownGroup, sx]} {...props}>
            {children}
        </div>
    );
}

export { DropdownGroup };
