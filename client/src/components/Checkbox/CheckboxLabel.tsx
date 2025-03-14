import React from 'react';
import { s_text } from './Checkbox.style';
import { useCheckboxContext } from './CheckboxContext';

interface LabelProps {
    children: React.ReactNode;
}
function CheckboxLabel({ children }: LabelProps) {
    // prop destruction
    // lib hooks
    const { id, size, disabled } = useCheckboxContext();

    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    // effects
    // handlers

    return (
        <>
            <label htmlFor={id} css={s_text(size, disabled)}>
                {children}
            </label>
        </>
    );
}
export { CheckboxLabel };
