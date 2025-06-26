import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import Check from '@assets/images/checkbox_check.svg';
import { s_size, s_svgColor, s_variant } from './Checkbox.style';
import { useCheckboxContext } from './CheckboxContext';
function CheckboxControl({ sx }) {
    const { isChecked, onChange, variant, size, color, defaultChecked, disabled } = useCheckboxContext();
    const cssProp = [s_variant(isChecked, variant, color, defaultChecked, disabled), s_size(size)];
    const onKeyDownHandler = (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            onChange();
        }
    };
    return (_jsx("div", { onClick: onChange, css: [cssProp, sx], onKeyDown: () => onKeyDownHandler, "aria-checked": isChecked, tabIndex: 0, role: "checkbox", children: _jsx(Check, { css: [s_svgColor(variant, color, isChecked, defaultChecked, disabled)] }) }));
}
export { CheckboxControl };
//# sourceMappingURL=CheckboxControl.js.map