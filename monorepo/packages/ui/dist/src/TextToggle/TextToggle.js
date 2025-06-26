import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { hiddenCheckbox, toggleContainer, leftTextContainer, rightTextContainer, } from './TextToggle.style';
import { Text } from '@components';
const getTextType = {
    sm: 'subCaptionRegular',
    md: 'captionRegular',
    lg: 'bodyRegular',
};
function TextToggle({ isChecked = false, handleToggle, leftText = '지원사항', rightText = '내 정보', size = 'md', sx, ...props }) {
    return (_jsxs("label", { css: [toggleContainer, sx], children: [_jsx("input", { type: "checkbox", css: hiddenCheckbox, checked: isChecked, onChange: handleToggle, ...props }), _jsx(Text, { as: "div", type: getTextType[size], sx: leftTextContainer(isChecked), children: leftText }), _jsx(Text, { as: "div", type: getTextType[size], sx: rightTextContainer(isChecked), children: rightText })] }));
}
export { TextToggle };
//# sourceMappingURL=TextToggle.js.map