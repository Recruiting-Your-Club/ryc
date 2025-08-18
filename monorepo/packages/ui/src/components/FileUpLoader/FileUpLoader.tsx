import React, { useCallback, useMemo, useRef, useState } from 'react';

import { useFilteredFile } from '../../hooks/useFilteredFile';
import { s_fileUpLoader } from './FileUpLoader.style';
import { FileUpLoaderBox } from './FileUpLoaderBox';
import { FileUpLoaderButton } from './FileUpLoaderButton';
import { FileUpLoaderHelperText } from './FileUpLoaderHelperText';
import { FileUpLoaderInteractionContext } from './FileUpLoaderInteractionContext';
import { FileUpLoaderStateContext } from './FileUpLoaderStateContext';
import type { FileUpLoaderProps } from './types';

function FileUpLoaderRoot({
    children,
    sx,
    disabled = false,
    files = [],
    onFilesChange,
}: FileUpLoaderProps) {
    // prop destruction
    // lib hooks
    // initial values
    const safeOnFilesChange = onFilesChange || (() => {});
    // state, ref, querystring hooks

    const [isActive, setIsActive] = useState<boolean>(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const { filterAndSetFiles } = useFilteredFile(safeOnFilesChange, files.length);

    // form hooks
    // query hooks
    // calculated values
    // handlers

    //---File upload Handler---//

    const handleClickButton = useCallback(() => {
        if (disabled) return;
        fileInputRef.current?.click();
    }, [disabled]);

    const handleChangeFile = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (disabled) return;
            const selectedFiles = e.target.files;
            if (!selectedFiles) return;
            filterAndSetFiles(selectedFiles, files);
            e.target.value = '';
        },
        [disabled, filterAndSetFiles, files],
    );

    //---File delete Handler---//

    const handleDelete = useCallback(
        (index: number) => {
            if (disabled || !onFilesChange) return;
            onFilesChange(files.filter((_, i) => i !== index));
        },
        [disabled, onFilesChange, files],
    );

    const handleDeleteEntire = useCallback(() => {
        if (disabled || !onFilesChange) return;
        onFilesChange([]);
        setIsActive(false);
    }, [disabled, onFilesChange]);

    //---Drag and Drop Handler---//

    const handleDragStart = useCallback(() => {
        if (disabled) return;
        setIsActive(true);
    }, [disabled]);

    const handleDragEnd = useCallback(() => {
        if (disabled) return;
        setIsActive(false);
    }, [disabled]);

    const handleDragOver = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            if (disabled) return;
            e.preventDefault();
            setIsActive(true);
        },
        [disabled],
    );

    const handleDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            if (disabled) return;
            e.preventDefault();
            filterAndSetFiles(e.dataTransfer.files, files);
            setIsActive(false);
        },
        [disabled, filterAndSetFiles, files],
    );

    const stateContextValue = useMemo(
        () => ({
            files,
            onFilesChange: safeOnFilesChange,
            isActive,
            setIsActive,
            disabled,
        }),
        [files, onFilesChange, isActive, disabled],
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
        [
            handleDelete,
            handleDeleteEntire,
            handleDragStart,
            handleDragEnd,
            handleDragOver,
            handleDrop,
            handleClickButton,
            handleChangeFile,
        ],
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
