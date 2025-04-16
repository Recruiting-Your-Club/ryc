import type React from 'react';
import { createContext, useContext } from 'react';
import type { FileUpLoaderStateContextType } from './types';

export const FileUpLoaderStateContext = createContext<FileUpLoaderStateContextType | undefined>(
    undefined,
);

export function useFileUpLoaderStateContext(): FileUpLoaderStateContextType {
    const context = useContext(FileUpLoaderStateContext);

    if (context === undefined) {
        throw new Error('useFileLoader must be use within a FileLoader.Provider');
    }
    return context;
}
