import React, { createContext, useContext } from 'react';
import type { SelectContextType } from './types';

export const SelectContext = createContext<SelectContextType | undefined>(undefined);

export function useSelectContext(): SelectContextType {
    const context = useContext(SelectContext);

    if (context === undefined) {
        throw new Error('useSelectContext must be use within a SelectContext.Provider');
    }

    return context;
}
