import {
    createContext,
    useContext,
    type Dispatch,
    type RefObject,
    type SetStateAction,
} from 'react';

interface DropdownContextType {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    triggerRef: RefObject<HTMLElement>;
}

interface DropdownSubContextType {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    triggerRef: RefObject<HTMLElement>;
}

export const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

export function useDropdownContext(): DropdownContextType {
    const context = useContext(DropdownContext);

    if (context === undefined) {
        throw new Error('useDropdownContext must be use within a DropdownContext.Provider');
    }

    return context;
}

export const DropdownSubContext = createContext<DropdownSubContextType | undefined>(undefined);

export function useDropdownSubContext(): DropdownSubContextType {
    const context = useContext(DropdownSubContext);

    if (context === undefined) {
        throw new Error('useDropdownSubContext must be use within a DropdownSubContext.Provider');
    }

    return context;
}
