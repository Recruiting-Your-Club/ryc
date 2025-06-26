import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { s_textAreaWrapper, s_textArea, s_textAreaInfoWrapper } from './TextArea.style';
import { Text } from '@components/_common/Text';
function TextArea({ size = 'md', variant = 'outline', width = '100%', error, errorText, wrapperSx, textAreaSx, value, maxLength, disabled, ...props }) {
    const currentLength = typeof value === 'string' ? value.length : 0;
    return (_jsxs("div", { css: [s_textAreaWrapper(width), wrapperSx], children: [_jsx("textarea", { css: [s_textArea(size, variant, error, disabled), textAreaSx], value: value, maxLength: maxLength, disabled: disabled, ...props }), error && errorText && (_jsx("div", { css: s_textAreaInfoWrapper('left'), children: _jsx(Text, { type: 'subCaptionLight', color: 'warning', children: errorText }) })), maxLength && (_jsx("div", { css: s_textAreaInfoWrapper('right'), children: _jsxs(Text, { type: 'subCaptionLight', color: 'helper', children: [currentLength, " / ", maxLength] }) }))] }));
}
export { TextArea };
//# sourceMappingURL=TextArea.js.map