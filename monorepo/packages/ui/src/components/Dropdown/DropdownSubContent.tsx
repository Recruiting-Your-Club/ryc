import React from 'react';

import { s_dropdownSubContent } from './Dropdown.styles';
import { useDropdownSubContext } from './DropdownContext';
import type { DropdownSubContentProps } from './types';

function DropdownSubContent({
    children,
    align = 'bottom',
    sx,
    forwardedRef,
    ...props
}: DropdownSubContentProps) {
    //prop destruction
    //lib hooks
    const { open, contentRef } = useDropdownSubContext();

    //state, ref, querystring hooks
    //form hooks
    //query hooks
    //calculated values
    const ref = forwardedRef || contentRef;

    //handlers
    //effects
    return (
        <div ref={ref} role="menu" css={[s_dropdownSubContent(align, open), sx]} {...props}>
            {children}
        </div>
    );
}

export { DropdownSubContent };
