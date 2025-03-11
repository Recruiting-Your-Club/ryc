import React from 'react';
import { controlCss, s_size, s_variant } from './Checkbox.style';
import { useCheckboxContext } from './CheckboxContext';

function CheckboxControl() {
    const { isChecked, onChange, variant, size } = useCheckboxContext();
    const cssProp = [s_variant(variant), s_size(size)];
    const onKeyDownHandler = (e: KeyboardEvent) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            onChange();
        }
    };

    return (
        <div
            onClick={() => onChange}
            css={controlCss(isChecked)}
            onKeyDown={() => onKeyDownHandler}
            aria-checked={isChecked}
            tabIndex={0}
            role="checkbox"
        ></div>
    );
}
export { CheckboxControl };
