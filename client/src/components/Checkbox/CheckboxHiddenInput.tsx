import React from 'react';
import { hiddenInputCss } from './Checkbox.style';
import { useCheckboxContext } from './CheckboxContext';

function CheckboxHiddenInput() {
    // prop destruction
    // lib hooks
    const { id, isChecked, onChange, disabled } = useCheckboxContext();

    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    // effects
    // handlers

    return (
        <>
            <input
                id={id}
                type="checkbox"
                checked={isChecked}
                onChange={onChange}
                disabled={disabled}
                css={hiddenInputCss}
            />
        </>
    );
}
export { CheckboxHiddenInput };
