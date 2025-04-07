import React, { useMemo, useRef, useState } from 'react';
import { FileUpLoaderContext } from './FileUpLoaderContext';
import { FileUpLoaderBox } from './FileUpLoaderBox';
import { FileUpLoaderButton } from './FileUpLoaderButton';
import { FileUpLoaderHelperText } from './FileUpLoaderHelperText';
import { s_fileUpLoader } from './FileUpLoader.style';
import type { FileUpLoaderProps } from './type';

function FileUpLoaderRoot({ children, sx }: FileUpLoaderProps) {
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
        setIsActive(true);
    };

    const handleDragEnd = () => {
        setIsActive(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsActive(true);
    };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files);
        if (droppedFiles.length === 0) return;

        setFiles((prev) => [...prev, ...droppedFiles]);
        setHasFile(true);
        setIsActive(false);
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
            handleDragOver,
            handleDrop,
            fileInputRef,
            handleClickButton,
            handleChangeFile,
        }),
        [files, hasFile, isActive],
    );

    return (
        <FileUpLoaderContext.Provider value={contextValue}>
            <div css={[s_fileUpLoader, sx]}>{children}</div>
        </FileUpLoaderContext.Provider>
    );
}
export const FileUpLoader = Object.assign(FileUpLoaderRoot, {
    Box: FileUpLoaderBox,
    HelperText: FileUpLoaderHelperText,
    Button: FileUpLoaderButton,
});
