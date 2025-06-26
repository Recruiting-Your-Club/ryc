import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { inputContainer, helperTextStyle, labelStyle, inputWrapperContainer, baseInputStyle, } from './Input.style';
function Input({ variant = 'primary', type = 'text', height = '3.6rem', error = false, helperText, label, startNode, endNode, inputSx, labelSx, helperSx, ...props }) {
    return (_jsxs("div", { css: inputWrapperContainer, children: [label && _jsx("label", { css: [labelStyle(error), labelSx], children: label }), _jsxs("div", { css: [inputContainer(error, variant), inputSx], children: [startNode && _jsx("div", { children: startNode }), _jsx("input", { css: [baseInputStyle(height)], type: type, ...props }), endNode && _jsx("div", { children: endNode })] }), helperText && _jsx("span", { css: [helperTextStyle(error), helperSx], children: helperText })] }));
}
export { Input };
//# sourceMappingURL=Input.js.map