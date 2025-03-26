import React, { createContext, useContext } from 'react';

interface FileUpLoaderContextType {
    files: File[] | null;
    setFiles: (files: File[]) => void;
}

export const FileUpLoaderContext = createContext<FileUpLoaderContextType | undefined>(undefined);

export function useFileLoader(): FileUpLoaderContextType {
    const context = useContext(FileUpLoaderContext);

    if (context === undefined) {
        throw new Error('useFileLoader must be use within a FileLoader.Provider');
    }
    return context;
}
