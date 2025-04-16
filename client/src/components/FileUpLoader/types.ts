import type { ReactNode, RefObject, ChangeEvent, DragEvent, Dispatch, SetStateAction } from 'react';
import type { CSSObject } from '@emotion/react';

export interface FileUpLoaderProps {
    children: ReactNode;
    sx?: CSSObject;
    disabled?: boolean;
}

export interface FileUpLoaderHelperTextProps {
    helperText?: string;
    sx?: CSSObject;
}

export interface FileUpLoaderStateContextType {
    files: File[];
    setFiles: Dispatch<SetStateAction<File[]>>;
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
