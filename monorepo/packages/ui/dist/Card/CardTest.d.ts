import type { AvatarShape, AvatarSize } from '../Avatar';
import { CardBottomBody } from './CardBottomBody';
import { CardFooter } from './CardFooter';
import { CardRoot } from './CardRoot';
import { CardTitleContainer } from './CardTitleContainer';
import { CardTopBody } from './CardTopBody';
import { DescriptionText } from './DescriptionText';
interface CardProps {
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
    subTitle: string;
    description: string;
}
declare function CardTest({ width, radius, hover, avatarShape, avatarSize, avatarRadius, titlePartPaddingLeft, footerHeight, imageURL, imageName, title, subTitle, description, }: CardProps): import("@emotion/react/jsx-runtime").JSX.Element;
declare const Card: typeof CardTest & {
    Root: typeof CardRoot;
    TopBody: typeof CardTopBody;
    TitleContainer: typeof CardTitleContainer;
    BottomBody: typeof CardBottomBody;
    DescriptionText: typeof DescriptionText;
    Footer: typeof CardFooter;
};
export { Card };
//# sourceMappingURL=CardTest.d.ts.map