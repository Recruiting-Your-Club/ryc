import type { CSSObject } from '@emotion/react';
import type { CSSProperties, ElementType, PropsWithChildren } from 'react';
import React from 'react';
import type theme from '@ssoc/styles';
export type TextType = keyof typeof theme.typography;
export type TextColor = 'black' | 'primary' | 'warning' | 'caption' | 'subCaption' | 'helper';
interface TextProps extends PropsWithChildren {
    type?: TextType;
    color?: TextColor;
    textAlign?: CSSProperties['textAlign'];
    noWrap?: boolean;
    cropped?: boolean;
    sx?: CSSObject;
    as?: ElementType;
}
declare function Text({ type, color, textAlign, noWrap, cropped, children, sx, as: Tag, }: TextProps): import("@emotion/react/jsx-runtime").JSX.Element;
declare namespace Text {
    var HighLight: ({ children, sx }: {
        children?: React.ReactNode;
        sx?: CSSObject | undefined;
    }) => import("@emotion/react/jsx-runtime").JSX.Element;
}
export { Text };
//# sourceMappingURL=Text.d.ts.map