import type { CSSObject } from '@emotion/react';
import type {
    HTMLAttributes,
    KeyboardEvent,
    MouseEvent as ReactMouseEvent,
    ReactNode,
} from 'react';
import React from 'react';
import { useDropdownContext } from './DropdownContext';

interface DropdownItemProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    disabled?: boolean;
    inset?: boolean;
    onItemSelect?: (e: ReactMouseEvent<HTMLDivElement>) => void;
    sx?: CSSObject;
}

function DropdownItem({
    children,
    disabled = false,
    inset = false,
    onItemSelect,
    ...props
}: DropdownItemProps) {
    const { setOpen } = useDropdownContext();

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

    return (
        <div
            role="menuitem"
            onClick={handleClick}
            {...props}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={handleKeyDown}
        >
            {children}
        </div>
    );
}

export { DropdownItem };
