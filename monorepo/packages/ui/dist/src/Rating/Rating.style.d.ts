import type { CSSProperties } from 'react';
import type { StarSize } from './Star';
interface Size {
    width?: CSSProperties['width'];
    height?: CSSProperties['height'];
}
export declare const starSize: Record<StarSize, Size>;
export declare const s_size: (size: StarSize) => import("@emotion/react").SerializedStyles;
export declare const s_star: (filled: boolean) => import("@emotion/react").SerializedStyles;
export declare const s_halfStar: (percentage: number) => import("@emotion/react").SerializedStyles;
export declare const ratingContainer: () => import("@emotion/react").SerializedStyles;
export {};
//# sourceMappingURL=Rating.style.d.ts.map