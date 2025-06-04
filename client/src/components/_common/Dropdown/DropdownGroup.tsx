import type { CSSObject } from '@emotion/react';
import type { HTMLAttributes, ReactNode } from 'react';
import React from 'react';
import { s_dropdownGroup } from './Dropdown.styles';
import type { DropdownGruopProps } from './type';

function DropdownGroup({ children, sx, ...props }: DropdownGruopProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    // handlers
    // effects
    return (
        <div css={[s_dropdownGroup, sx]} {...props}>
            {children}
        </div>
    );
}

export { DropdownGroup };
