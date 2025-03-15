import type { Dispatch, RefObject, SetStateAction } from 'react';
import React, { createContext, useContext } from 'react';

interface SelectContextType {
    open: boolean; //Select가 열려있는지 여부
    setOpen: Dispatch<SetStateAction<boolean>>; //열림/닫힘을 관리하는 함수
    value: string; // 현재 선택된 값
    setValue: (value: string) => void; //값 변경 함수
    label: string; //현재 선택된 라벨 (value에 따른 UI 값)
    setLabel: Dispatch<SetStateAction<string>>; //라벨 변경 함수
    triggerRef: RefObject<HTMLButtonElement>; // Select.Trigger의 Ref
    contentRef: RefObject<HTMLDivElement>; // Select.Content의 Ref
}

export const SelectContext = createContext<SelectContextType>({
    open: false,
    setOpen: () => {},
    value: '',
    setValue: () => {},
    label: '',
    setLabel: () => {},
    triggerRef: { current: null },
    contentRef: { current: null },
});

export function useSelectContext(): SelectContextType {
    const context = useContext(SelectContext);

    if (context === undefined) {
        throw new Error('useSelectContext must be use within a SelectContext.Provider');
    }

    return context;
}
