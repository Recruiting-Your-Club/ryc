import { jsx as _jsx, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import { Text } from '@components/_common/Text';
function DescriptionText({ description }) {
    return (_jsx(_Fragment, { children: _jsx(Text, { as: "span", textAlign: "start", type: "helperTextBold", color: "subCaption", children: description }) }));
}
export { DescriptionText };
//# sourceMappingURL=DescriptionText.js.map