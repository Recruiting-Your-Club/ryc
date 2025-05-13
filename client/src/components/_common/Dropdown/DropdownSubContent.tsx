import type { CSSObject } from '@emotion/react';
import type { HTMLAttributes, ReactNode, Ref } from 'react';
import React from 'react';
import { useDropdownSubContext } from './DropdownContext';
import { s_dropdownSubContent } from './Dropdown.styles';

interface DropdownSubContentProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    align?: 'top' | 'center' | 'bottom';
    sx?: CSSObject;
    forwardedRef?: Ref<HTMLDivElement>;
}

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
