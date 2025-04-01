import type React from 'react';
import { createContext, useContext } from 'react';

interface FileUpLoaderContextType {
    files: File[];
    setFiles: (files: File[]) => void;
    hasFile: boolean;
    isActive: boolean;
    setHasFile: React.Dispatch<React.SetStateAction<boolean>>;
    handleDelete: (index: number) => void;
    handleDeleteEntire: () => void;
    handleDragStart: () => void;
    handleDragEnd: () => void;
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    fileInputRef: React.RefObject<HTMLInputElement>;
    handleClickButton: () => void;
    handleChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileUpLoaderContext = createContext<FileUpLoaderContextType | undefined>(undefined);

export function useFileUpLoaderContext(): FileUpLoaderContextType {
    const context = useContext(FileUpLoaderContext);

    if (context === undefined) {
        throw new Error('useFileLoader must be use within a FileLoader.Provider');
    }
    return context;
}
