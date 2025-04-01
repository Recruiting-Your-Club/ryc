import type { ReactNode } from 'react';
import React, { useMemo, useRef, useState } from 'react';
import { FileUpLoaderContext } from './FileUpLoaderContext';
import { FileUpLoaderBox } from './FileUpLoaderBox';
import { FileUpLoaderButton } from './FileUpLoaderButton';
interface FileUpLoaderProps {
    children: ReactNode;
}

function FileUpLoaderRoot({ children }: FileUpLoaderProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [hasFile, setHasFile] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClickButton = () => {
        fileInputRef.current?.click();
    };

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (!selectedFiles) return;
        const selectedArray = Array.from(selectedFiles);
        const copyFiles = files && [...files, ...selectedArray];

        setFiles(copyFiles);
        setHasFile(true);
    };

    const handleDelete = (index: number) => {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
        if (newFiles.length === 0) setHasFile(false);
    };

    const handleDeleteEntire = () => {
        setFiles([]);
        setHasFile(false);
        setIsActive(false);
    };

    const handleDragStart = () => {
        return setIsActive(true);
    };

    const handleDragEnd = () => {
        return setIsActive(false);
    };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files);
        if (droppedFiles.length === 0) return;

        setFiles((prev) => [...prev, ...droppedFiles]);
        setHasFile(true);
    };

    //ref는 자체가 바뀌지는 않기 때문에 안넣어줘도 된다.
    const contextValue = useMemo(
        () => ({
            files,
            setFiles,
            hasFile,
            setHasFile,
            isActive,
            setIsActive,
            handleDelete,
            handleDeleteEntire,
            handleDragStart,
            handleDragEnd,
            handleDrop,
            fileInputRef,
            handleClickButton,
            handleChangeFile,
        }),
        [files, hasFile, isActive],
    );

    return (
        <FileUpLoaderContext.Provider value={contextValue}>{children}</FileUpLoaderContext.Provider>
    );
}
export const FileUpLoader = Object.assign(FileUpLoaderRoot, {
    Box: FileUpLoaderBox,
    Button: FileUpLoaderButton,
});
