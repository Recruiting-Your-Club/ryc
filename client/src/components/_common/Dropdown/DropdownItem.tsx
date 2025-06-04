import type { CSSObject } from '@emotion/react';
import type {
    HTMLAttributes,
    KeyboardEvent,
    MouseEvent as ReactMouseEvent,
    ReactNode,
} from 'react';
import React from 'react';
import { useDropdownContext } from './DropdownContext';
import { s_dropdownItem } from './Dropdown.styles';
import type { DropdownItemProps } from './type';

function DropdownItem({
    children,
    disabled = false,
    inset = false,
    onItemSelect,
    sx,
    ...props
}: DropdownItemProps) {
    // prop destruction
    // lib hooks
    const { setOpen } = useDropdownContext();

    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    // handlers
    const handleClick = (e: ReactMouseEvent<HTMLDivElement>) => {
        if (!disabled) {
            onItemSelect?.(e);
            setOpen(false);
        }
    };

    //div에 onClick 달려면 필요
    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            onItemSelect?.(e as unknown as ReactMouseEvent<HTMLDivElement>);
        }
    };

    // effects
    return (
        <div
            role="menuitem"
            onClick={handleClick}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={handleKeyDown}
            css={[s_dropdownItem(disabled, inset), sx]}
            {...props}
        >
            {children}
        </div>
    );
}

export { DropdownItem };
