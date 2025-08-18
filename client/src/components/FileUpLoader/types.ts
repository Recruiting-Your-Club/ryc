import type { ReactNode, RefObject, ChangeEvent, DragEvent, Dispatch, SetStateAction } from 'react';
import type { CSSObject } from '@emotion/react';

export interface FileUpLoaderProps {
    children: ReactNode;
    sx?: CSSObject;
    disabled?: boolean;
    files?: File[];
    onFilesChange?: (files: File[]) => void;
    maxFileCount?: number;
}

export interface FileUpLoaderStateContextType {
    files: File[];
    onFilesChange: (files: File[]) => void;
    isActive: boolean;
    setIsActive: Dispatch<SetStateAction<boolean>>;
    disabled: boolean;
}

export interface FileUpLoaderInteractionContextType {
    handleDelete: (index: number) => void;
    handleDeleteEntire: () => void;
    handleDragStart: () => void;
    handleDragEnd: () => void;
    handleDragOver: (e: DragEvent<HTMLDivElement>) => void;
    handleDrop: (e: DragEvent<HTMLDivElement>) => void;
    handleClickButton: () => void;
    handleChangeFile: (e: ChangeEvent<HTMLInputElement>) => void;
    fileInputRef: RefObject<HTMLInputElement>;
}

export interface FileUpLoaderHelperTextProps {
    children: ReactNode;
    sx?: CSSObject;
}

export interface FileUpLoaderItemProps {
    file: File;
    index: number;
}

export interface FileUpLoaderItemCellProps {
    children: ReactNode;
    align?: Align;
    isFileNameCell?: boolean;
    isHeader?: boolean;
}
export type Align = 'left' | 'center' | 'right';
