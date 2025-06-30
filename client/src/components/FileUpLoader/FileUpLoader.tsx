import React, { useMemo, useRef, useState, useCallback } from 'react';
import { FileUpLoaderStateContext } from './FileUpLoaderStateContext';
import { FileUpLoaderBox } from './FileUpLoaderBox';
import { FileUpLoaderButton } from './FileUpLoaderButton';
import { FileUpLoaderHelperText } from './FileUpLoaderHelperText';
import { s_fileUpLoader } from './FileUpLoader.style';
import type { FileUpLoaderProps } from './types';
import { useFilteredFile } from '@hooks/components/useFilteredFile';
import { FileUpLoaderInteractionContext } from './FileUpLoaderInteractionContext';

function FileUpLoaderRoot({ children, sx, disabled = false }: FileUpLoaderProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks

    const [files, setFiles] = useState<File[]>([]);
    const [isActive, setIsActive] = useState<boolean>(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const { filterAndSetFiles } = useFilteredFile(setFiles);

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
            filterAndSetFiles(selectedFiles);
            e.target.value = '';
        },
        [disabled, filterAndSetFiles],
    );

    //---File delete Handler---//

    const handleDelete = useCallback(
        (index: number) => {
            if (disabled) return;
            setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
        },
        [disabled],
    );

    const handleDeleteEntire = useCallback(() => {
        if (disabled) return;
        setFiles([]);
        setIsActive(false);
    }, [disabled]);

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
            filterAndSetFiles(e.dataTransfer.files);
            setIsActive(false);
        },
        [disabled, filterAndSetFiles],
    );

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
