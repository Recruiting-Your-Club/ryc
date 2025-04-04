import type React from 'react';
import { createContext, useContext } from 'react';
import type { FileUpLoaderContextValueType } from './type';

export const FileUpLoaderContext = createContext<FileUpLoaderContextValueType | undefined>(
    undefined,
);

export function useFileUpLoaderContext(): FileUpLoaderContextValueType {
    const context = useContext(FileUpLoaderContext);

    if (context === undefined) {
        throw new Error('useFileLoader must be use within a FileLoader.Provider');
    }
    return context;
}
