import type React from 'react';
import { createContext, useContext } from 'react';

interface FileUpLoaderContextType {
    files: File[] | null;
    setFiles: (files: File[]) => void;
    hasFile: boolean;
    setHasFile: React.Dispatch<React.SetStateAction<boolean>>;
    handleDelete: (index: number) => void;
    handleDeleteEntire: () => void;
}

export const FileUpLoaderContext = createContext<FileUpLoaderContextType | undefined>(undefined);

export function useFileUpLoaderContext(): FileUpLoaderContextType {
    const context = useContext(FileUpLoaderContext);

    if (context === undefined) {
        throw new Error('useFileLoader must be use within a FileLoader.Provider');
    }
    return context;
}
