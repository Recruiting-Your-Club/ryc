import type { CSSObject } from '@emotion/react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import type { Align, Format, List, Option } from './EditorToolbar';

export interface EditorContextType {
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
