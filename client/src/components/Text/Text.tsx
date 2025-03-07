import React from 'react';
import type { TYPOGRAPHY } from '@styles/theme/typography';
import type { CSSProperties, PropsWithChildren, ElementType } from 'react';
import { textStyle } from './Text.style';
import type { CSSObject } from '@emotion/react';

export type TextType = keyof typeof TYPOGRAPHY;
export type TextColor = 'black' | 'primary' | 'warning' | 'caption';

interface TextProps extends PropsWithChildren {
    type?: TextType;
    color?: TextColor;
    textAlign?: CSSProperties['textAlign'];
    noWrap?: boolean;
    cropped?: boolean;
    sx?: CSSObject;
    as?: ElementType;
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
    return <Tag css={[sx, textStyle({ type, color, textAlign, noWrap, cropped })]}>{children}</Tag>;
}
export { Text };
