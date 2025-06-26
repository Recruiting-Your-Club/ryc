import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { Text } from '@components/_common/Text';
import { titleContainer } from './Card.style';
function CardTitleContainer({ titlePartPaddingLeft, title, subTitle }) {
    return (_jsxs("div", { css: titleContainer(titlePartPaddingLeft), children: [_jsx(Text, { as: "span", textAlign: "start", type: "bodyBold", color: "black", noWrap: true, cropped: true, children: title }), _jsx(Text, { as: "span", textAlign: "start", type: "subCaptionRegular", color: "helper", noWrap: true, cropped: true, children: subTitle })] }));
}
export { CardTitleContainer };
//# sourceMappingURL=CardTitleContainer.js.map