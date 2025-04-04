import type { ReactNode, RefObject, ChangeEvent, DragEvent, Dispatch, SetStateAction } from 'react';
import type { CSSObject } from '@emotion/react';
import PdfIcon from '@assets/images/PdfIcon.svg';
import WordIcon from '@assets/images/DocIcon.svg';
import ExcelIcon from '@assets/images/XlsxIcon.svg';
import PptIcon from '@assets/images/PptIcon.svg';
import ZipIcon from '@assets/images/ZipIcon.svg';

export interface FileUpLoaderProps {
    children: ReactNode;
    sx?: CSSObject;
}

export interface FileUpLoaderBoxProps {
    sx?: CSSObject;
}

export interface FileUpLoaderHelperTextProps {
    helperText?: string;
    sx?: CSSObject;
}

export interface FileUpLoaderContextValueType {
    files: File[];
    setFiles: Dispatch<SetStateAction<File[]>>;
    hasFile: boolean;
    setHasFile: Dispatch<SetStateAction<boolean>>;
    isActive: boolean;
    setIsActive: Dispatch<SetStateAction<boolean>>;
    handleDelete: (index: number) => void;
    handleDeleteEntire: () => void;
    handleDragStart: () => void;
    handleDragEnd: () => void;
    handleDragOver: (e: DragEvent<HTMLDivElement>) => void;
    handleDrop: (e: DragEvent<HTMLDivElement>) => void;
    fileInputRef: RefObject<HTMLInputElement>;
    handleClickButton: () => void;
    handleChangeFile: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface FileUpLoaderItemProps {
    file: File;
    index: number;
}

export interface FileUpLoaderItemCellProps {
    children: ReactNode;
    align?: Align;
    isNameCell?: boolean;
    isHeader?: boolean;
}
export type Align = 'left' | 'center' | 'right';

export const fileTypeIcons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
    pdf: PdfIcon,
    docx: WordIcon,
    xlsx: ExcelIcon,
    pptx: PptIcon,
    zip: ZipIcon,
};

export enum ImageExtension {
    JPG = 'jpg',
    JPEG = 'jpeg',
    PNG = 'png',
    GIF = 'gif',
    WEBP = 'webp',
}

export const headerItems = [
    { label: '파일명', align: 'left' },
    { label: '최종 수정 일시', align: 'center' },
    { label: '크기', align: 'center' },
    { label: '파일 유형', align: 'center' },
] as const;
