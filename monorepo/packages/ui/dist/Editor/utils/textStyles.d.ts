import type { RefObject } from 'react';
import type { Format, Size, TextColor } from '../types';
export declare const applyStyleInSelectedText: (text: string, parent: HTMLElement | null, style: Format | Size | TextColor, isSpan: boolean, selectedStart: number, selectedEnd: number, isOverallStyle?: boolean, color?: string) => DocumentFragment;
export declare const splitTextAndApplyStyleAtCursor: (currentNode: Node, offset: number, parent: HTMLElement, style: Format | Size | TextColor, emptyTextNode: Text, color?: string) => void;
export declare const applyStyleInEmptyRange: (editorRef: RefObject<HTMLDivElement>, style: Format | Size | TextColor, color?: string) => void;
export declare const applyStyle: (selection: Selection, range: Range, style: Format | Size | TextColor, color?: string) => void;
//# sourceMappingURL=textStyles.d.ts.map