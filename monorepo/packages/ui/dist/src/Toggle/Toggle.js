import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { hiddenCheckbox, toggleContainer, toggleCircle } from './Toggle.style';
function Toggle({ isChecked = false, size = 'md', sx, handleToggle, ...props }) {
    return (_jsxs("label", { css: [toggleContainer(isChecked, size), sx], children: [_jsx("input", { type: "checkbox", css: hiddenCheckbox, checked: isChecked, onChange: handleToggle, ...props }), _jsx("div", { css: toggleCircle(isChecked, size) })] }));
}
export { Toggle };
//# sourceMappingURL=Toggle.js.map