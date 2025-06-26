import type { CSSProperties } from 'react';
export type TextAreaSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type TextAreaVariant = 'outline' | 'subtle' | 'flushed';
interface TextAreaSizeConfig {
    height: string;
    padding: CSSProperties['padding'];
}
export declare const textAreaSize: Record<TextAreaSize, TextAreaSizeConfig>;
export declare const s_textAreaVariant: (variant?: TextAreaVariant) => import("@emotion/react").SerializedStyles;
export declare const s_textAreaSize: (size?: TextAreaSize) => import("@emotion/react").SerializedStyles;
export declare const s_textAreaWrapper: (width: string) => import("@emotion/react").SerializedStyles;
export declare const s_textArea: (size: TextAreaSize, variant: TextAreaVariant, error?: boolean, disabled?: boolean) => import("@emotion/react").SerializedStyles;
export declare const s_textAreaInfoWrapper: (align: 'left' | 'right') => import("@emotion/react").SerializedStyles;
export {};
//# sourceMappingURL=TextArea.style.d.ts.map