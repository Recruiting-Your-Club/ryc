import type { Dispatch, RefObject, SetStateAction } from 'react';
import React from 'react';
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
export declare const SelectContext: React.Context<SelectContextType | undefined>;
export declare function useSelectContext(): SelectContextType;
export {};
//# sourceMappingURL=SelectContext.d.ts.map