import type { CSSObject } from '@emotion/react';
import type { ReactNode, SetStateAction} from 'react';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { DropdownContext } from './DropdownContext';
import { s_dropdown } from './Dropdown.styles';

interface DropdownProps {
    children: ReactNode; // 자식 노드
    onOpenChange?: (open: boolean) => void; //제어 방식 시 open 관리 함수
    defaultOpen?: boolean; //비제어 방식을 위한 상태
    open?: boolean; //외부 제어에 따른 open값
    sx?: CSSObject;
}

function DropdownRoot({
    children,
    onOpenChange,
    defaultOpen,
    open: controlledOpen,
    sx,
}: DropdownProps) {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen || false);
    const triggerRef = useRef<HTMLButtonElement>(null);

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

    const contextValue = useMemo(() => ({ open, setOpen, triggerRef }), [open]);

    return (
        <DropdownContext.Provider value={contextValue}>
            <div css={[s_dropdown, sx]}>{children}</div>
        </DropdownContext.Provider>
    );
}

const Dropdown = Object.assign(DropdownRoot, {});

export { Dropdown };
