import type { SetStateAction } from 'react';
import React, { useCallback, useMemo, useRef, useState } from 'react';

import { useClickOutside } from '@ssoc/hooks';

import { DropdownSubContext } from './DropdownContext';
import type { DropdownSubProps } from './types';

function DropdownSub({
    children,
    onOpenChange,
    defaultOpen,
    open: controlledOpen,
}: DropdownSubProps) {
    //prop destruction
    //lib hooks
    //state, ref, querystring hooks
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen || false);
    const triggerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    //form hooks
    //query hooks
    //calculated values
    const open = controlledOpen ?? uncontrolledOpen;

    //handlers
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

    const contextValue = useMemo(() => ({ open, setOpen, triggerRef, contentRef }), [open]);

    //effects
    useClickOutside([triggerRef, contentRef], () => setOpen(false));

    return (
        <DropdownSubContext.Provider value={contextValue}>
            <div css={{ position: 'relative' }}>{children}</div>
        </DropdownSubContext.Provider>
    );
}

export { DropdownSub };
