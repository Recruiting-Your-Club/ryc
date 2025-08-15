import type { MouseEvent } from 'react';
import React, { isValidElement } from 'react';

import { Slot, Slottable } from '../Slot/Slot';
import { s_dropdownTrigger } from './Dropdown.styles';
import { useDropdownContext } from './DropdownContext';
import type { DropdownTriggerProps } from './types';

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
    const handleClick = (e: MouseEvent) => {
        e.stopPropagation();
        setOpen((prev) => !prev);
    };

    // effects
    return (
        <Comp css={[s_dropdownTrigger, sx]} {...props} forwardedRef={ref} onClick={handleClick}>
            {wrappedChildren}
        </Comp>
    );
}

export { DropdownTrigger };
