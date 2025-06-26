import type { CSSObject } from '@emotion/react';
export type tagVariant = 'primary' | 'progress' | 'end';
export interface TagProps {
    text: string;
    variant: tagVariant;
    sx?: CSSObject;
}
declare function Tag({ text, variant, sx }: TagProps): import("@emotion/react/jsx-runtime").JSX.Element;
export { Tag };
//# sourceMappingURL=Tag.d.ts.map