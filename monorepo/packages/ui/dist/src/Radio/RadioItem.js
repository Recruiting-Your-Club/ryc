import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { s_radio, s_label, s_input } from './Radio.style';
function RadioItem({ option, checked, disabled = false, onChange, ...props }) {
    return (_jsxs("label", { css: s_label(disabled), children: [_jsx("input", { type: "radio", checked: checked, onChange: onChange, css: s_input, ...props }), _jsx("span", { css: s_radio(checked) }), option] }));
}
export { RadioItem };
//# sourceMappingURL=RadioItem.js.map