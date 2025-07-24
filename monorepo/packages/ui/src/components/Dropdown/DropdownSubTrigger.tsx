import React from 'react';
import type { KeyboardEvent } from 'react';

import RightArrow from '@ssoc/assets/images/right_arrow.svg';

import { s_dropdownSubTrigger, s_dropdownSubTriggerArrow } from './Dropdown.styles';
import { useDropdownSubContext } from './DropdownContext';
import type { DropdownSubTriggerProps } from './types';

function DropdownSubTrigger({
    children,
    disabled = false,
    inset = false,
    sx,
    forwardedRef,
    ...props
}: DropdownSubTriggerProps) {
    // prop destruction
    // lib hooks
    const { open, setOpen, triggerRef } = useDropdownSubContext();

    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    const ref = forwardedRef || triggerRef;

    //handlers
    const handleSelect = () => {
        if (!disabled) {
            setOpen((prev) => !prev);
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (!disabled && (event.key === 'Enter' || event.key === ' ')) {
            handleSelect();
        }
    };

    //effects
    return (
        <div
            role="menuitem"
            ref={ref}
            onClick={handleSelect}
            onKeyDown={handleKeyDown}
            tabIndex={disabled ? 0 : -1}
            css={[s_dropdownSubTrigger(disabled, inset), sx]}
        >
            {children}
            <RightArrow css={[s_dropdownSubTriggerArrow]} />
        </div>
    );
}

export { DropdownSubTrigger };
