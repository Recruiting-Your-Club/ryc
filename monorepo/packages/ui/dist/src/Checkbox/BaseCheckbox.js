import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import { CheckboxControl } from './CheckboxControl';
import { CheckboxHiddenInput } from './CheckboxHiddenInput';
import { CheckboxLabel } from './CheckboxLabel';
import { CheckboxRoot } from './CheckboxRoot';
function BaseCheckbox({ variant, size, color, isChecked, onChange, defaultChecked = false, disabled = false, }) {
    return (_jsx(_Fragment, { children: _jsxs(CheckboxRoot, { variant: variant, size: size, color: color, isChecked: isChecked, onChange: onChange, defaultChecked: defaultChecked, disabled: disabled, children: [_jsx(CheckboxHiddenInput, {}), _jsx(CheckboxControl, {}), _jsx(CheckboxLabel, { children: "Checkbox \uC785\uB2C8\uB2E4." })] }) }));
}
const Checkbox = Object.assign(BaseCheckbox, {
    Root: CheckboxRoot,
    HiddenInput: CheckboxHiddenInput,
    Control: CheckboxControl,
    Label: CheckboxLabel,
});
export { Checkbox };
//# sourceMappingURL=BaseCheckbox.js.map