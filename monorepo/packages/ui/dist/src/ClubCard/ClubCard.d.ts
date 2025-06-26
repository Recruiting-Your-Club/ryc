import type { AvatarShape, AvatarSize } from '../Avatar';
import type { tagVariant } from '../Tag';
interface ClubCardProps {
    width?: string;
    radius?: string;
    hover?: boolean;
    avatarShape?: AvatarShape;
    avatarSize?: AvatarSize;
    avatarRadius?: string;
    titlePartPaddingLeft?: string;
    footerHeight?: string;
    imageURL?: string;
    imageName?: string;
    title: string;
    type: string;
    status: tagVariant;
    tag: string[];
    path: string;
}
declare function ClubCard({ width, radius, hover, avatarShape, avatarSize, avatarRadius, titlePartPaddingLeft, footerHeight, imageURL, imageName, title, type, status, tag, path, }: ClubCardProps): import("@emotion/react/jsx-runtime").JSX.Element;
export { ClubCard };
//# sourceMappingURL=ClubCard.d.ts.map