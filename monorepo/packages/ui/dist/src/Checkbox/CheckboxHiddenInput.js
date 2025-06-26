import { jsx as _jsx, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import { hiddenInputCss } from './Checkbox.style';
import { useCheckboxContext } from './CheckboxContext';
function CheckboxHiddenInput({ ...props }) {
    const { id, isChecked, onChange, defaultChecked, disabled } = useCheckboxContext();
    return (_jsx(_Fragment, { children: _jsx("input", { id: id, type: "checkbox", checked: isChecked, onChange: onChange, defaultChecked: defaultChecked, disabled: disabled, css: hiddenInputCss, ...props }) }));
}
export { CheckboxHiddenInput };
//# sourceMappingURL=CheckboxHiddenInput.js.map