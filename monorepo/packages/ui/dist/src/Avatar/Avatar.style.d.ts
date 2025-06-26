import type { CSSProperties } from '@emotion/serialize';
import type { AvatarShape, AvatarSize } from './Avatar';
interface Size {
    width?: CSSProperties['width'];
    height?: CSSProperties['height'];
}
export declare const avatarSize: Record<AvatarSize, Size>;
export declare const s_size: (size: AvatarSize) => import("@emotion/react").SerializedStyles;
export declare const s_shape: (shape: AvatarShape, radius?: string) => import("@emotion/react").SerializedStyles;
export {};
//# sourceMappingURL=Avatar.style.d.ts.map