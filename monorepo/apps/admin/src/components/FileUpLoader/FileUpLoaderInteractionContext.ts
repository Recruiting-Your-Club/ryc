import { createContext, useContext } from 'react';

import type { FileUpLoaderInteractionContextType } from './types';

export const FileUpLoaderInteractionContext = createContext<
    FileUpLoaderInteractionContextType | undefined
>(undefined);

export const useFileUpLoaderInteractionContext = () => {
    const context = useContext(FileUpLoaderInteractionContext);
    if (!context) {
        throw new Error(
            'useFileUpLoaderInteraction must be used within FileUpLoaderInteractionContext.Provider',
        );
    }
    return context;
};
