import type { SerializedStyles } from '@emotion/react';
import type { CSSProperties } from 'react';
import type { TextColor, TextType } from './Text';
export declare const textStyle: ({ type, color, textAlign, noWrap, cropped, }: {
    type: TextType;
    color: TextColor;
    textAlign: CSSProperties['textAlign'];
    noWrap: boolean;
    cropped: boolean;
}) => SerializedStyles;
export declare const highlightStyle: SerializedStyles;
//# sourceMappingURL=Text.style.d.ts.map