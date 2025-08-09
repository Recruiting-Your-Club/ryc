import React from 'react';

import { s_dropdownContent } from './Dropdown.styles';
import { useDropdownContext } from './DropdownContext';
import type { DropdownContentProps } from './types';

function DropdownContent({
    children,
    offsetX = 0,
    offsetY = 0,
    sx,
    forwardedRef,
    placement = 'bottom',
    ...props
}: DropdownContentProps) {
    //prop destruction
    //lib hooks
    const { open, contentRef } = useDropdownContext();

    //state, ref, querystring hooks
    //form hooks
    //query hooks
    //calculated values
    const ref = forwardedRef || contentRef;

    //handlers
    //effects
    return (
        <div
            role="menu"
            ref={ref}
            css={[s_dropdownContent(offsetX, offsetY, open, placement), sx]}
            {...props}
        >
            {children}
        </div>
    );
}

export { DropdownContent };
