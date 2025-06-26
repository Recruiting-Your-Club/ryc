import type { CSSObject } from '@emotion/react';
import type { CSSProperties } from 'react';
import type { CheckboxColor, CheckboxSize, CheckboxVariant } from './CheckboxRoot';
interface Typography extends CSSObject {
    fontSize: CSSProperties['fontSize'];
    fontWeight: CSSProperties['fontWeight'];
    lineHeight: CSSProperties['lineHeight'];
}
interface Size {
    width?: CSSProperties['width'];
    height?: CSSProperties['height'];
    typography?: Typography;
}
export declare const checkboxSize: Record<CheckboxSize, Size>;
export declare const typographySize: Record<CheckboxSize, Size>;
export declare const s_size: (size?: CheckboxSize) => import("@emotion/react").SerializedStyles;
export declare const s_text: (size?: CheckboxSize, disabled?: boolean) => import("@emotion/react").SerializedStyles;
export declare const s_svgColor: (variant?: CheckboxVariant, color?: CheckboxColor, isChecked?: boolean, defaultChecked?: boolean, disabled?: boolean) => import("@emotion/react").SerializedStyles;
export declare const s_variant: (isChecked?: boolean, variant?: CheckboxVariant, color?: CheckboxColor, defaultChecked?: boolean, disabled?: boolean) => import("@emotion/react").SerializedStyles;
export declare const rootContainer: import("@emotion/react").SerializedStyles;
export declare const hiddenInputCss: import("@emotion/react").SerializedStyles;
export {};
//# sourceMappingURL=Checkbox.style.d.ts.map