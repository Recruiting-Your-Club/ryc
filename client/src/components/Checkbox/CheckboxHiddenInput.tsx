import React from 'react';
import { hiddenInputCss } from './Checkbox.style';
import { useCheckboxContext } from './CheckboxContext';

function CheckboxHiddenInput() {
    const { id, isChecked, onChange } = useCheckboxContext();

    return (
        <>
            <input
                id={id}
                type="checkbox"
                checked={isChecked}
                onChange={onChange}
                css={hiddenInputCss}
            />
        </>
    );
}
export { CheckboxHiddenInput };
