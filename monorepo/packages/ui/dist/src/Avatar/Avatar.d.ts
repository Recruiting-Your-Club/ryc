export type AvatarSize = 'xs' | 's' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'square' | 'round';
interface AvatarProps {
    shape?: AvatarShape;
    size?: AvatarSize;
    radius?: string;
    imageURL?: string;
    imageName?: string;
}
declare function Avatar({ shape, size, radius, imageURL, imageName }: AvatarProps): import("@emotion/react/jsx-runtime").JSX.Element;
export { Avatar };
//# sourceMappingURL=Avatar.d.ts.map