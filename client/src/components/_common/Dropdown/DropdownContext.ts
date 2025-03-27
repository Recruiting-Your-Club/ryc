import type { Dispatch, RefObject, SetStateAction } from 'react';

interface DropdownContextType {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    triggerRef: RefObject<HTMLElement>;
    contentRef: RefObject<HTMLDivElement>;
}
