import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { radioContainer } from './Radio.style';
import { RadioItem } from './RadioItem';
function Radio({ options, name, value, disabled, orientation, onChange, sx }) {
    return (_jsx("div", { css: [radioContainer(orientation), sx], children: options.map(({ label, value: itemValue }, index) => (_jsx(RadioItem, { option: label, value: itemValue, name: name, checked: value === itemValue, disabled: disabled, onChange: () => onChange?.(itemValue) }, index))) }));
}
export { Radio };
//# sourceMappingURL=Radio.js.map