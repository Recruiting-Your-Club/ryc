import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { Divider } from '@components/_common/Divider';
import { Avatar } from '../Avatar';
import { CardBottomBody } from './CardBottomBody';
import { CardFooter } from './CardFooter';
import { CardRoot } from './CardRoot';
import { CardTitleContainer } from './CardTitleContainer';
import { CardTopBody } from './CardTopBody';
import { DescriptionText } from './DescriptionText';
function CardTest({ width, radius, hover, avatarShape = 'square', avatarSize = 'xl', avatarRadius = '0.3125rem', titlePartPaddingLeft = '1.25rem', footerHeight, imageURL, imageName, title, subTitle, description, }) {
    return (_jsxs(CardRoot, { width: width, radius: radius, hover: hover, children: [_jsxs(CardTopBody, { children: [_jsx(Avatar, { shape: avatarShape, size: avatarSize, radius: avatarRadius, imageURL: imageURL, imageName: imageName }), _jsx(CardTitleContainer, { titlePartPaddingLeft: titlePartPaddingLeft, title: title, subTitle: subTitle })] }), _jsx(CardBottomBody, { children: _jsx(DescriptionText, { description: description }) }), _jsx(Divider, {}), _jsx(CardFooter, { footerHeight: footerHeight })] }));
}
const Card = Object.assign(CardTest, {
    Root: CardRoot,
    TopBody: CardTopBody,
    TitleContainer: CardTitleContainer,
    BottomBody: CardBottomBody,
    DescriptionText: DescriptionText,
    Footer: CardFooter,
});
export { Card };
//# sourceMappingURL=CardTest.js.map