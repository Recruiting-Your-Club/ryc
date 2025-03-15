import type { CSSObject } from '@emotion/react';
import React from 'react';
import { s_size, s_svgColor, s_svgSize, s_variant } from './Checkbox.style';
import { useCheckboxContext } from './CheckboxContext';

interface ControlProps {
    sx?: CSSObject;
}

function CheckboxControl({ sx }: ControlProps) {
    // prop destruction
    // lib hooks
    const { isChecked, onChange, variant, size, color, disabled } = useCheckboxContext();

    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    const cssProp = [s_variant(isChecked, variant, color, disabled), s_size(size)];

    // effects
    // handlers
    const onKeyDownHandler = (e: KeyboardEvent) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            onChange();
        }
    };

    // custom을 위한 check svg 컴포넌트 함수
    const Check = () => {
        return (
            <svg
                css={[s_svgSize(size), s_svgColor(variant, color, isChecked, disabled)]}
                viewBox="0 0 6 4"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M5.62134 0C5.52533 0 5.4252 0.0305455 5.35207 0.100363L2.08683 3.22542C1.99045 3.31742 1.8937 3.30034 1.81795 3.19198L0.694406 1.58471C0.579652 1.42072 0.339644 1.3749 0.167513 1.48435C-0.00424332 1.5938 -0.0522446 1.82253 0.0625096 1.98653L1.18567 3.59378C1.52394 4.07705 2.18283 4.13851 2.61372 3.72761L5.89059 0.613808C6.03647 0.474173 6.03647 0.239998 5.89059 0.100363C5.81746 0.0305455 5.71696 0 5.62134 0Z"
                    fill="currentColor"
                />
            </svg>
        );
    };

    return (
        <div
            onClick={onChange}
            css={[cssProp, sx]}
            onKeyDown={() => onKeyDownHandler}
            aria-checked={isChecked}
            tabIndex={0}
            role="checkbox"
        >
            <Check />
        </div>
    );
}
export { CheckboxControl };
