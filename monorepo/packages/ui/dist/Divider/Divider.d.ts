import type { CSSObject } from '@emotion/react';
import type { HTMLAttributes } from 'react';
export type DividerColor = 'black' | 'gray';
export type DividerWidth = '70' | '80' | '90' | 'full';
export type DividerWeight = '1' | '2' | '3';
interface DividerProps extends HTMLAttributes<HTMLHRElement> {
    width?: DividerWidth;
    color?: DividerColor;
    weight?: DividerWeight;
    sx?: CSSObject;
}
declare function Divider({ width, color, weight, sx, ...props }: DividerProps): import("@emotion/react/jsx-runtime").JSX.Element;
export { Divider };
//# sourceMappingURL=Divider.d.ts.map