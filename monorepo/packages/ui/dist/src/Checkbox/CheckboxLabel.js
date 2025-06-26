import { jsx as _jsx, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import { s_text } from './Checkbox.style';
import { useCheckboxContext } from './CheckboxContext';
function CheckboxLabel({ children, sx }) {
    const { id, size, disabled } = useCheckboxContext();
    return (_jsx(_Fragment, { children: _jsx("label", { htmlFor: id, css: [s_text(size, disabled), sx], children: children }) }));
}
export { CheckboxLabel };
//# sourceMappingURL=CheckboxLabel.js.map