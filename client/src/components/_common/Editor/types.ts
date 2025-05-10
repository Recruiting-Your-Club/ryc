import type { CSSObject } from '@emotion/react';
import type { Dispatch, ReactNode, RefObject, SetStateAction } from 'react';

export type Size = '10px' | '12px' | '14px' | '16px' | '24px' | '36px';
export type Format = 'bold' | 'italic' | 'underline' | 'strikethrough';
export type Align = 'left' | 'center' | 'right' | 'justify' | 'inherit';
export type List = 'disc' | 'decimal';
export type Option = 'image' | 'divider';
export type TextColor = 'color' | 'background';

export interface EditorContextType {
    editorRef: RefObject<HTMLDivElement>;
    savedRange: Range | null;
    setSavedRange: Dispatch<SetStateAction<Range | null>>;
    size: Size;
    setSize: Dispatch<SetStateAction<Size>>;
    formats: Record<Format, boolean>;
    setFormats: Dispatch<SetStateAction<Record<Format, boolean>>>;
    align: Align;
    setAlign: Dispatch<SetStateAction<Align>>;
    lists: Record<List, boolean>;
    setLists: Dispatch<SetStateAction<Record<List, boolean>>>;
    options: Record<Option, boolean>;
    setOptions: Dispatch<SetStateAction<Record<Option, boolean>>>;
}

export interface EditorHandlerContextType {
    toggleFormatButton: (format: Format) => void;
    toggleAlignButton: (align: Align) => void;
    toggleListButton: (list: List) => void;
}

export interface EditorProps {
    height?: string;
    radius?: string;
    sx?: CSSObject;
}

export interface RootProps {
    children?: ReactNode;
    sx?: CSSObject;
}

export interface ToolbarProps {
    radius?: string;
    sx?: CSSObject;
}

export interface ColorPickerProps {
    onChange: (textColorType: TextColor, color: string) => void;
}
