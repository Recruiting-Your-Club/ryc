import type { CSSObject } from '@emotion/react';
import type { HTMLAttributes, ReactNode } from 'react';
import React from 'react';
import { s_dropdownLabel } from './Dropdown.styles';
import type { DropdownLabelProps } from './type';

function DropdownLabel({ children, inset = false, sx, ...props }: DropdownLabelProps) {
    return (
        <label css={[s_dropdownLabel(inset), sx]} {...props}>
            {children}
        </label>
    );
}

export { DropdownLabel };
