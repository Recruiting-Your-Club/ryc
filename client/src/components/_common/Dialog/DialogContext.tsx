import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { DialogContextProps } from './types';

const DialogContext = createContext<DialogContextProps | undefined>(undefined);

function DialogProvider({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState<boolean>(false);

    const openDialog = () => {
        setOpen(true);
    };
    const closeDialog = () => {
        setOpen(false);
    };
    const contextValue = {
        open,
        openDialog,
        closeDialog,
    };

    return <DialogContext.Provider value={contextValue}>{children}</DialogContext.Provider>;
}
export { DialogProvider, DialogContext };
