import type { Dispatch, RefObject, SetStateAction} from 'react';
import React, { createContext, useContext } from 'react';

interface SelectContextType {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    value: string;
    setValue: (value: string) => void;
    label: string;
    setLabel: Dispatch<SetStateAction<string>>;
    triggerRef: RefObject<HTMLButtonElement>;
    contentRef: RefObject<HTMLDivElement>;
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
