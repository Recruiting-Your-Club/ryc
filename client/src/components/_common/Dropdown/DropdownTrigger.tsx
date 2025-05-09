import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react';
import React from 'react';
import { useDropdownContext } from './DropdownContext';
import { Slot } from '../Slot/Slot';
import type { CSSObject } from '@emotion/react';
import { s_dropdownTrigger } from './Dropdown.styles';

interface DropdownTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    asChild: boolean;
    sx?: CSSObject;
    forwardedRef?: Ref<HTMLButtonElement>;
}

function DropdownTrigger({
    children,
    asChild = false,
    forwardedRef,
    sx,
    ...props
}: DropdownTriggerProps) {
    const { open, setOpen, triggerRef } = useDropdownContext();

    const ref = forwardedRef || triggerRef;

    const Comp = asChild ? Slot : 'button';
    return (
        <Comp
            css={[s_dropdownTrigger, sx]}
            {...props}
            forwardedRef={ref}
            onClick={() => setOpen(!open)}
        >
            {children}
        </Comp>
    );
}

export { DropdownTrigger };
