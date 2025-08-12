import React, { useCallback, useMemo, useRef, useState } from 'react';

import { useFileUpLoader } from '../../hooks/useFileUpLoader';
import { useToast } from '../../hooks/useToast';
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
    maxFileCount = 20,
}: FileUpLoaderProps) {
    // prop destruction
    // lib hooks
    const { toast } = useToast();
    // initial values
    const safeOnFilesChange = onFilesChange || (() => {});
    // state, ref, querystring hooks
    const [isActive, setIsActive] = useState<boolean>(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const { filterAndSetFiles, getErrorMessageByFileCount, getErrorMessageByFileType } =
        useFileUpLoader(safeOnFilesChange);

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
            const fileList = e.target.files;
            if (!fileList) return;
            const selected = Array.from(fileList);

            const errorMessageByFileType = getErrorMessageByFileType(selected);
            if (errorMessageByFileType) {
                toast.error(errorMessageByFileType, {
                    duration: 2000,
                    sx: {
                        minWidth: '35rem',
                    },
                });
                e.target.value = '';
                return;
            }

            const errorMessageByFileCount = getErrorMessageByFileCount(
                files.length,
                selected.length,
                maxFileCount,
            );
            if (errorMessageByFileCount) {
                toast.error(errorMessageByFileCount, {
                    duration: 2000,
                    sx: {
                        minWidth: '35rem',
                    },
                });
                e.target.value = '';
                return;
            }

            filterAndSetFiles(selected, files);
            e.target.value = '';
        },
        [
            disabled,
            filterAndSetFiles,
            files,
            toast,
            maxFileCount,
            getErrorMessageByFileType,
            getErrorMessageByFileCount,
        ],
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
            setIsActive(false);
            const dropped = Array.from(e.dataTransfer.files);
            const errorMessageByFileType = getErrorMessageByFileType(dropped);
            if (errorMessageByFileType) {
                toast.error(errorMessageByFileType, {
                    duration: 2000,
                    sx: {
                        minWidth: '35rem',
                    },
                });
                return;
            }
            const errorMessageByFileCount = getErrorMessageByFileCount(
                files.length,
                dropped.length,
                maxFileCount,
            );
            if (errorMessageByFileCount) {
                toast.error(errorMessageByFileCount, {
                    duration: 2000,
                    sx: {
                        minWidth: '35rem',
                    },
                });
                return;
            }
            filterAndSetFiles(dropped, files);
        },
        [
            disabled,
            files,
            toast,
            maxFileCount,
            filterAndSetFiles,
            getErrorMessageByFileType,
            getErrorMessageByFileCount,
        ],
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
