import type { RefObject } from 'react';
import type { ValidSelection } from '../types';
export declare const getValidSelection: () => ValidSelection;
export declare const applyAttributeInEmptyRange: (editorRef: RefObject<HTMLElement>, element: HTMLElement) => Selection | undefined;
export declare const handleNewRange: (node: Node, selection: Selection, startOffset?: number) => void;
export declare const handleRangeToNext: (node: Node, selection: Selection) => void;
export declare const handleRangeInList: (list: HTMLElement, selection: Selection) => void;
export declare const preserveSelection: (selection: Selection, range: Range, operation: () => void) => void;
export declare const getTextNodes: (range: Range) => Text[];
//# sourceMappingURL=range.d.ts.map