import type { TYPOGRAPHY } from '@styles/theme/typography';
import type { CSSProperties, ElementType, PropsWithChildren } from 'react';
import React from 'react';
import { textStyle, highlightStyle } from './Text.style';
import type { CSSObject } from '@emotion/react';

export type TextType = keyof typeof TYPOGRAPHY;
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

function HighLignt({ text, sx }: { text?: string | number; sx?: CSSObject }) {
    return <span css={[highlightStyle, sx]}>{text}</span>;
}
function Text({
    type = 'bodyRegular',
    color = 'black',
    textAlign = 'center',
    noWrap = false,
    cropped = false,
    children,
    sx,
    as: Tag = 'p',
}: TextProps) {
    return <Tag css={[textStyle({ type, color, textAlign, noWrap, cropped }), sx]}>{children}</Tag>;
}

Text.HighLignt = HighLignt;
export { Text };
