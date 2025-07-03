import type { InputHTMLAttributes } from 'react';
import React from 'react';

import { hiddenInputCss } from './Checkbox.style';
import { useCheckboxContext } from './CheckboxContext';

function CheckboxHiddenInput({ ...props }: InputHTMLAttributes<HTMLInputElement>) {
    // prop destruction
    // lib hooks
    const { id, isChecked, onChange, defaultChecked, disabled } = useCheckboxContext();

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
                defaultChecked={defaultChecked}
                disabled={disabled}
                css={hiddenInputCss}
                {...props}
            />
        </>
    );
}
export { CheckboxHiddenInput };
