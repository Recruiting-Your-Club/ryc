import React from 'react';

import { s_dropdownSeperator } from './Dropdown.styles';
import type { DropdownSeperatorProps } from './types';

function DropdownSeperator({ sx, ...props }: DropdownSeperatorProps) {
    return <div css={[s_dropdownSeperator, sx]} {...props} />;
}

export { DropdownSeperator };
