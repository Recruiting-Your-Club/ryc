import React, { useMemo, useRef, useState } from 'react';
import { FileUpLoaderStateContext } from './FileUpLoaderStateContext';
import { FileUpLoaderBox } from './FileUpLoaderBox';
import { FileUpLoaderButton } from './FileUpLoaderButton';
import { FileUpLoaderHelperText } from './FileUpLoaderHelperText';
import { s_fileUpLoader } from './FileUpLoader.style';
import type { FileUpLoaderProps } from './types';
import { useFilteredFile } from '@hooks/components/useFilteredFile';
import { FileUpLoaderInteractionContext } from './FileUpLoaderInteractionContext';

function FileUpLoaderRoot({ children, sx, disabled = false }: FileUpLoaderProps) {
    // state, ref, querystring hooks

    const [files, setFiles] = useState<File[]>([]);
    const [isActive, setIsActive] = useState<boolean>(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const { filterAndSetFiles } = useFilteredFile(files, setFiles);

    // handler
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
    };

    const handleDeleteEntire = () => {
        if (disabled) return;
        setFiles([]);
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

    const stateContextValue = useMemo(
        () => ({
            files,
            setFiles,
            isActive,
            setIsActive,
            disabled,
        }),
        [files, isActive, disabled],
    );

    const interactionContextValue = useMemo(
        () => ({
            handleDelete,
            handleDeleteEntire,
            handleDragStart,
            handleDragEnd,
            handleDragOver,
            handleDrop,
            handleClickButton,
            handleChangeFile,
            fileInputRef,
        }),
        [],
    );

    return (
        <FileUpLoaderStateContext.Provider value={stateContextValue}>
            <FileUpLoaderInteractionContext.Provider value={interactionContextValue}>
                <div css={[s_fileUpLoader, sx]}>{children}</div>
            </FileUpLoaderInteractionContext.Provider>
        </FileUpLoaderStateContext.Provider>
    );
}
export const FileUpLoader = Object.assign(FileUpLoaderRoot, {
    Box: FileUpLoaderBox,
    HelperText: FileUpLoaderHelperText,
    Button: FileUpLoaderButton,
});
