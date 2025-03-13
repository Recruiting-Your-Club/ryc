import React from 'react';
import { s_textSize } from './Checkbox.style';
import { useCheckboxContext } from './CheckboxContext';

interface LabelProps {
    children: React.ReactNode;
}
function CheckboxLabel({ children }: LabelProps) {
    const { id, size } = useCheckboxContext();

    return (
        <>
            <label htmlFor={id} css={s_textSize(size)}>
                {children}
            </label>
        </>
    );
}
export { CheckboxLabel };
