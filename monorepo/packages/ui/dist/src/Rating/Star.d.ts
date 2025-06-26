import type { SerializedStyles } from '@emotion/react';
export type StarSize = 'xs' | 's' | 'md' | 'lg' | 'xl';
interface StarProps {
    filled: boolean;
    partialFill?: number;
    size: StarSize;
    customCSS?: SerializedStyles;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}
export declare function Star({ filled, partialFill, size, customCSS, onClick, onMouseEnter, onMouseLeave, }: StarProps): import("@emotion/react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Star.d.ts.map