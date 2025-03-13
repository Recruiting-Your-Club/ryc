import React from 'react';
import { hiddenInputCss } from './Checkbox.style';
import { useCheckboxContext } from './CheckboxContext';

function CheckboxHiddenInput() {
    const { id, isChecked, onChange, defaultChecked, disabled } = useCheckboxContext();

    return (
        <>
            <input
                id={id}
                type="checkbox"
                checked={isChecked}
                onChange={onChange}
                defaultChecked={defaultChecked}
                disabled={disabled}
                css={hiddenInputCss}
            />
        </>
    );
}
export { CheckboxHiddenInput };
