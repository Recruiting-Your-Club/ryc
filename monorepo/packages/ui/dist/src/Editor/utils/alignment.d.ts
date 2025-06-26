import type { RefObject } from 'react';
import type { Align } from '../types';
export declare const getClosestDiv: (node: Node) => HTMLDivElement | null;
export declare const getEditorRoot: (range: Range) => HTMLElement | null;
export declare const applyAlignmentInEmptyRange: (editorRef: RefObject<HTMLDivElement>, align: Align) => void;
export declare const applyAlignment: (selection: Selection, range: Range, align: Align) => void;
//# sourceMappingURL=alignment.d.ts.map