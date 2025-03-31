import type { ReactNode } from 'react';
import React, { useRef, useState } from 'react';
import { FileUpLoaderContext } from './FileUpLoaderContext';
import { FileUpLoaderBox } from './FileUpLoaderBox';
import { FileUpLoaderButton } from './FileUpLoaderButton';
interface FileUpLoaderProps {
    children: ReactNode;
}

function FileUpLoaderRoot({ children }: FileUpLoaderProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [hasFile, setHasFile] = useState(false);
    const [isActive, setActive] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClickInput = () => {
        fileInputRef.current?.click();
    };

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (!selectedFiles) return;
        const selectedArray = Array.from(selectedFiles);
        const copyFiles = files ? [...files, ...selectedArray] : selectedArray;

        setFiles(copyFiles);
        setHasFile(true);
    };

    const handleDelete = (indexToDelete: number) => {
        const newFiles = files.filter((_, i) => i !== indexToDelete);
        setFiles(newFiles);
        if (newFiles.length === 0) setHasFile(false);
    };

    const handleDeleteEntire = () => {
        setFiles([]);
        setHasFile(false);
    };

    const handleDragStart = () => {
        return setActive(true);
    };

    const handleDragEnd = () => {
        return setActive(false);
    };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files);
        if (droppedFiles.length === 0) return;

        setFiles((prev) => [...prev, ...droppedFiles]);
        setHasFile(true);
    };

    return (
        <FileUpLoaderContext.Provider
            value={{
                files,
                setFiles,
                hasFile,
                isActive,
                setHasFile,
                handleDelete,
                handleDeleteEntire,
                handleDragStart,
                handleDragEnd,
                handleDrop,
                fileInputRef,
                handleClickInput,
                handleChangeFile,
            }}
        >
            {children}
        </FileUpLoaderContext.Provider>
    );
}
export const FileUpLoader = Object.assign(FileUpLoaderRoot, {
    Box: FileUpLoaderBox,
    Button: FileUpLoaderButton,
});
