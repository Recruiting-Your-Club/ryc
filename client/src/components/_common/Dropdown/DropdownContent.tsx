import type { HTMLAttributes, ReactNode, Ref } from 'react';
import React from 'react';
import type { CSSObject } from '@emotion/react';
import { useDropdownContext } from './DropdownContext';
import { s_dropdownContent } from './Dropdown.styles';

interface DropdownContentProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    offsetX?: number;
    offsetY?: number;
    sx?: CSSObject;
    forwardedRef?: Ref<HTMLDivElement>;
}

function DropdownContent({
    children,
    offsetX = 0,
    offsetY = 0,
    sx,
    forwardedRef,
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
        <div role="menu" ref={ref} css={[s_dropdownContent(offsetX, offsetY, open), sx]} {...props}>
            {children}
        </div>
    );
}

export { DropdownContent };
