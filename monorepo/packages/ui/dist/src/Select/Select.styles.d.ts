import type { CSSProperties } from 'react';
import type { SelectSize } from './Select';
interface Size {
    width?: CSSProperties['width'];
}
export declare const selectSize: Record<SelectSize, Size>;
export declare const s_size: (size: SelectSize) => import("@emotion/react").SerializedStyles;
export declare const s_select: import("@emotion/react").SerializedStyles;
export declare const s_selectTrigger: import("@emotion/react").SerializedStyles;
export declare const s_selectContent: (open: boolean) => import("@emotion/react").SerializedStyles;
export declare const s_selectItem: () => import("@emotion/react").SerializedStyles;
export declare const s_selectLabel: import("@emotion/react").SerializedStyles;
export declare const s_selectSeperator: import("@emotion/react").SerializedStyles;
export declare const s_selectGroup: import("@emotion/react").SerializedStyles;
export declare const s_selectValue: import("@emotion/react").SerializedStyles;
export declare const s_selectPlaceholder: import("@emotion/react").SerializedStyles;
export declare const s_selectItemIndicator: import("@emotion/react").SerializedStyles;
export {};
//# sourceMappingURL=Select.styles.d.ts.map