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
    const { open, contentRef } = useDropdownContext();

    const ref = forwardedRef || contentRef;

    return (
        <div role="menu" ref={ref} css={[s_dropdownContent(offsetX, offsetY, open), sx]} {...props}>
            {children}
        </div>
    );
}

export { DropdownContent };
