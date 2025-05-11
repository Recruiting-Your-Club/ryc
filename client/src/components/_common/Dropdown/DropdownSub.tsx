import { CSSObject } from '@emotion/react';
import { useClickOutside } from '@hooks/components/useClickOutside';
import type { ReactNode, SetStateAction} from 'react';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { DropdownSubContext } from './DropdownContext';

interface DropdownSubProps {
    children: ReactNode;
    onOpenChange?: (open: boolean) => void;
    defaultOpen?: boolean;
    open?: boolean;
}

function DropdownSub({
    children,
    onOpenChange,
    defaultOpen,
    open: controlledOpen,
}: DropdownSubProps) {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen || false);
    const triggerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const open = controlledOpen ?? uncontrolledOpen;

    const setOpen = useCallback(
        (value: SetStateAction<boolean>) => {
            const newValue = typeof value === 'function' ? value(open) : value; //상태관리에 함수가 들어올 경우 생각
            if (controlledOpen === undefined) {
                setUncontrolledOpen(newValue);
            }
            //일단 상태 변경 값은 무조건 적용해야 할 것 같아서 if-else문 밖에 적용
            onOpenChange?.(newValue);
        },
        [controlledOpen, onOpenChange, open],
    );

    useClickOutside([triggerRef, contentRef], () => setOpen(false));

    const contextValue = useMemo(() => ({ open, setOpen, triggerRef, contentRef }), [open]);

    return (
        <DropdownSubContext.Provider value={contextValue}>{children}</DropdownSubContext.Provider>
    );
}

export { DropdownSub };
