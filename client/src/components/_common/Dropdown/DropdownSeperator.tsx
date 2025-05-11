import type { CSSObject } from '@emotion/react';
import type { HTMLAttributes } from 'react';
import React from 'react';
import { s_dropdownSeperator } from './Dropdown.styles';

interface DropdownSeperatorProps extends HTMLAttributes<HTMLDivElement> {
    sx?: CSSObject;
}

function DropdownSeperator({ sx, ...props }: DropdownSeperatorProps) {
    return <div css={[s_dropdownSeperator, sx]} {...props} />;
}

export { DropdownSeperator };
