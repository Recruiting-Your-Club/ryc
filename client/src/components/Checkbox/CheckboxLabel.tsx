import React from 'react';
import { s_text } from './Checkbox.style';
import { useCheckboxContext } from './CheckboxContext';

interface LabelProps {
    children: React.ReactNode;
}
function CheckboxLabel({ children }: LabelProps) {
    const { id, size, disabled } = useCheckboxContext();

    return (
        <>
            <label htmlFor={id} css={s_text(size, disabled)}>
                {children}
            </label>
        </>
    );
}
export { CheckboxLabel };
