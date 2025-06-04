import type { CSSObject } from '@emotion/react';
import type { HTMLAttributes, KeyboardEvent, ReactNode, Ref } from 'react';
import React from 'react';
import { useDropdownSubContext } from './DropdownContext';
import { s_dropdownSubTrigger } from './Dropdown.styles';
import RightArrow from '@assets/images/right_arrow.svg';
import type { DropdownSubTriggerProps } from './type';

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
            setOpen(!open);
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
            <RightArrow />
        </div>
    );
}

export { DropdownSubTrigger };
