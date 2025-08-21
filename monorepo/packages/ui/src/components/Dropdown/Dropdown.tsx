import type { CSSObject } from '@emotion/react';
import type { ReactNode, SetStateAction } from 'react';
import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

import { useClickOutside } from '@ssoc/hooks';

import { s_dropdown } from './Dropdown.styles';
import { DropdownContent } from './DropdownContent';
import { DropdownContext } from './DropdownContext';
import { DropdownGroup } from './DropdownGroup';
import { DropdownItem } from './DropdownItem';
import { DropdownLabel } from './DropdownLabel';
import { DropdownSeperator } from './DropdownSeperator';
import { DropdownSub } from './DropdownSub';
import { DropdownSubContent } from './DropdownSubContent';
import { DropdownSubTrigger } from './DropdownSubTrigger';
import { DropdownTrigger } from './DropdownTrigger';
import type { DropdownProps } from './types';

function DropdownRoot({
    id: propId,
    children,
    onOpenChange,
    defaultOpen,
    open: controlledOpen,
    sx,
}: DropdownProps & { id?: string }) {
    //prop destruction
    //lib hooks
    const autoId = useId();
    const id = propId ?? autoId;

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

            if (newValue) {
                window.dispatchEvent(new CustomEvent('close-all-dropdowns', { detail: id }));
            }
        },
        [controlledOpen, onOpenChange, open, id],
    );

    const contextValue = useMemo(() => ({ id, open, setOpen, triggerRef, contentRef }), [id, open]);

    //effects
    useClickOutside([triggerRef, contentRef], () => setOpen(false));

    useEffect(() => {
        const handler = (event: Event) => {
            const customEvent = event as CustomEvent<string>;
            if (customEvent.detail !== id) {
                setOpen(false);
            }
        };
        window.addEventListener('close-all-dropdowns', handler);
        return () => {
            window.removeEventListener('close-all-dropdowns', handler);
        };
    }, [id, setOpen]);

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
