import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react';
import React, { isValidElement } from 'react';
import { useDropdownContext } from './DropdownContext';
import { Slot, Slottable } from '../Slot/Slot';
import type { CSSObject } from '@emotion/react';
import { s_dropdownTrigger } from './Dropdown.styles';

interface DropdownTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    asChild?: boolean;
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
    // prop destruction
    // lib hooks
    const { open, setOpen, triggerRef } = useDropdownContext();

    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    const ref = forwardedRef || triggerRef;

    const Comp = asChild ? Slot : 'button';

    const wrappedChildren =
        asChild && isValidElement(children) ? <Slottable>{children}</Slottable> : children;

    // handlers
    // effects
    return (
        <Comp
            css={[s_dropdownTrigger, sx]}
            {...props}
            forwardedRef={ref}
            onClick={() => {
                setOpen(!open);
            }}
        >
            {wrappedChildren}
        </Comp>
    );
}

export { DropdownTrigger };
