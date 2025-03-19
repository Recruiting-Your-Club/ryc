import type { CSSObject } from '@emotion/react';
import React from 'react';
import { s_text } from './Checkbox.style';
import { useCheckboxContext } from './CheckboxContext';

interface LabelProps {
    children: React.ReactNode;
    sx?: CSSObject;
}
function CheckboxLabel({ children, sx }: LabelProps) {
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
            <label htmlFor={id} css={[s_text(size, disabled), sx]}>
                {children}
            </label>
        </>
    );
}
export { CheckboxLabel };
