import type { CSSObject } from '@emotion/react';
import type { CSSProperties } from 'react';
import type { ButtonSize } from './Button';
import type { ButtonVariant } from './Button';
interface Typography extends CSSObject {
    fontSize: CSSProperties['fontSize'];
    fontWeight: CSSProperties['fontWeight'];
    lineHeight: CSSProperties['lineHeight'];
}
interface Size {
    width?: CSSProperties['width'];
    height?: CSSProperties['height'];
    padding: CSSProperties['padding'];
    typography: Typography;
}
export declare const buttonSize: Record<ButtonSize, Size>;
export declare const s_size: (size?: ButtonSize) => import("@emotion/react").SerializedStyles;
export declare const s_variant: (variant: ButtonVariant) => import("@emotion/react").SerializedStyles;
export declare const s_base: (borderRadius?: string, zIndex?: number) => import("@emotion/react").SerializedStyles;
export {};
//# sourceMappingURL=Button.style.d.ts.map