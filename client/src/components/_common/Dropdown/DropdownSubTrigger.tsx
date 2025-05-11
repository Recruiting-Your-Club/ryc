import type { CSSObject } from '@emotion/react';
import type { HTMLAttributes, KeyboardEvent, ReactNode, Ref } from 'react';
import React from 'react';
import { useDropdownSubContext } from './DropdownContext';
import { s_dropdownSubTrigger } from './Dropdown.styles';
import RightArrow from '@assets/images/right_arrow.svg';

interface DropdownSubTriggerProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    disabled?: boolean;
    inset?: boolean;
    sx?: CSSObject;
    forwardedRef?: Ref<HTMLDivElement>;
}

function DropdownSubTrigger({
    children,
    disabled = false,
    inset = false,
    sx,
    forwardedRef,
    ...props
}: DropdownSubTriggerProps) {
    const { open, setOpen, triggerRef } = useDropdownSubContext();

    const ref = forwardedRef || triggerRef;

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

    return (
        <div
            role="menuitem"
            ref={ref}
            onClick={handleSelect}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            css={[s_dropdownSubTrigger(disabled, inset), sx]}
        >
            {children}
            <RightArrow />
        </div>
    );
}

export { DropdownSubTrigger };
