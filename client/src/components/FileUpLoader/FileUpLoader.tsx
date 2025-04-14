import React, { useMemo, useRef, useState } from 'react';
import { FileUpLoaderContext } from './FileUpLoaderContext';
import { FileUpLoaderBox } from './FileUpLoaderBox';
import { FileUpLoaderButton } from './FileUpLoaderButton';
import { FileUpLoaderHelperText } from './FileUpLoaderHelperText';
import { s_fileUpLoader } from './FileUpLoader.style';
import type { FileUpLoaderProps } from './type';
import { useFilteredFile } from '@hooks/components/useFilteredFile';

function FileUpLoaderRoot({ children, sx, disabled = false }: FileUpLoaderProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [hasFile, setHasFile] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const { filterAndSetFiles } = useFilteredFile(files, setFiles, setHasFile);

    const handleClickButton = () => {
        if (disabled) return;
        fileInputRef.current?.click();
    };

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        const selectedFiles = e.target.files;
        if (!selectedFiles) return;
        filterAndSetFiles(selectedFiles);
    };

    const handleDelete = (index: number) => {
        if (disabled) return;
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
        if (newFiles.length === 0) setHasFile(false);
    };

    const handleDeleteEntire = () => {
        if (disabled) return;
        setFiles([]);
        setHasFile(false);
        setIsActive(false);
    };

    const handleDragStart = () => {
        if (disabled) return;
        setIsActive(true);
    };

    const handleDragEnd = () => {
        if (disabled) return;
        setIsActive(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        if (disabled) return;
        e.preventDefault();
        setIsActive(true);
    };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        if (disabled) return;
        e.preventDefault();
        filterAndSetFiles(e.dataTransfer.files);
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
            disabled,
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
