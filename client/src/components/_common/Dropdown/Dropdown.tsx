import type { CSSObject } from '@emotion/react';
import type { ReactNode, SetStateAction } from 'react';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { DropdownContext } from './DropdownContext';
import { s_dropdown } from './Dropdown.styles';
import { useClickOutside } from '@hooks/components/useClickOutside';
import { DropdownTrigger } from './DropdownTrigger';
import { DropdownContent } from './DropdownContent';
import { DropdownItem } from './DropdownItem';
import { DropdownLabel } from './DropdownLabel';
import { DropdownGroup } from './DropdownGroup';
import { DropdownSeperator } from './DropdownSeperator';
import { DropdownSub } from './DropdownSub';
import { DropdownSubTrigger } from './DropdownSubTrigger';
import { DropdownSubContent } from './DropdownSubContent';
import type { DropdownProps } from './types';

function DropdownRoot({
    children,
    onOpenChange,
    defaultOpen,
    open: controlledOpen,
    sx,
}: DropdownProps) {
    //prop destruction
    //lib hooks
    //state, ref, querystring hooks
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen || false);
    const triggerRef = useRef<HTMLButtonElement>(null);
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
        <DropdownContext.Provider value={contextValue}>
            <div css={[s_dropdown, sx]}>{children}</div>
        </DropdownContext.Provider>
    );
}

const Dropdown = Object.assign(DropdownRoot, {
    Trigger: DropdownTrigger,
    Content: DropdownContent,
    Item: DropdownItem,
    Label: DropdownLabel,
    Group: DropdownGroup,
    Seperator: DropdownSeperator,
    Sub: DropdownSub,
    SubTrigger: DropdownSubTrigger,
    SubContent: DropdownSubContent,
});

export { Dropdown };
