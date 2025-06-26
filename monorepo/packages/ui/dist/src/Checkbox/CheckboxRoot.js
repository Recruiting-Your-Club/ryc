import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { useId, useMemo, useState } from 'react';
import { rootContainer } from './Checkbox.style';
import { CheckboxContext } from './CheckboxContext';
function CheckboxRoot({ variant, size, color, children, onChange, isChecked: externalChecked, defaultChecked = false, disabled = false, sx, ...props }) {
    const id = useId();
    const [checked, setChecked] = useState(defaultChecked);
    const isChecked = externalChecked ?? checked;
    const onChangeInner = () => {
        setChecked((prev) => !prev);
    };
    const changeHandler = () => {
        if (disabled)
            return;
        (onChange ?? onChangeInner)();
    };
    const contextValue = useMemo(() => ({
        id: id,
        variant,
        size,
        color,
        isChecked: isChecked,
        onChange: changeHandler,
        defaultChecked,
        disabled,
    }), [variant, size, color, isChecked, defaultChecked, disabled]);
    return (_jsx(CheckboxContext.Provider, { value: contextValue, children: _jsx("div", { css: [rootContainer, sx], children: children }) }));
}
export { CheckboxRoot };
//# sourceMappingURL=CheckboxRoot.js.map