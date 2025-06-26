import type { SerializedStyles } from '@emotion/react';
import type { StarSize } from './Star';
export interface RatingProps {
    value?: number;
    size?: StarSize;
    totalStars?: number;
    type?: 'click' | 'display';
    onChange?: (rating: number) => void;
    customCSS?: SerializedStyles;
}
export declare function Rating({ value, size, totalStars, type, onChange, customCSS, }: RatingProps): import("@emotion/react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Rating.d.ts.map