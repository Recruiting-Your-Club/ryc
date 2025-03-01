import React from 'react';
import type { TYPOGRAPHY } from '@styles/theme/typography';
import type { colors } from '@styles/theme/colors';
import type { CSSProperties, PropsWithChildren } from 'react';

export type TextType = keyof typeof TYPOGRAPHY;
export type TextColor = keyof typeof colors;

interface TextProps extends PropsWithChildren {
    type: TextType;
    color?: TextColor;
}
function Text() {
    return <div>Text</div>;
}
export { Text };
