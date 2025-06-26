import type { CSSObject } from "@emotion/react";
import type { Dispatch, ReactNode, RefObject, SetStateAction } from "react";
export type Size = "10px" | "12px" | "14px" | "16px" | "24px" | "36px";
export type Format = "bold" | "italic" | "underline" | "strikethrough";
export type Align = "left" | "center" | "right" | "justify" | "inherit";
export type List = "disc" | "decimal";
export type Option = "image" | "divider";
export type TextColor = "color" | "background";
export type ValidSelection = {
    isValid: true;
    selection: Selection;
    range: Range;
} | {
    isValid: false;
    selection: null;
    range: null;
};
export interface EditorContextType {
    editorRef: RefObject<HTMLDivElement>;
    savedRange: Range | null;
    setSavedRange: Dispatch<SetStateAction<Range | null>>;
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
//# sourceMappingURL=types.d.ts.map