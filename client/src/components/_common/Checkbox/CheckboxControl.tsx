import Check from '@assets/images/checkbox_check.svg';
import type { CSSObject } from '@emotion/react';
import type { ChangeEvent } from 'react';
import React from 'react';
import { s_size, s_svgColor, s_variant } from './Checkbox.style';
import { useCheckboxContext } from './CheckboxContext';

function CheckboxControl({ sx }: CSSObject) {
    // prop destruction
    // lib hooks
    const { isChecked, onChange, variant, size, color, defaultChecked, disabled } =
        useCheckboxContext();

    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    const cssProp = [s_variant(isChecked, variant, color, defaultChecked, disabled), s_size(size)];

    // effects
    // handlers
    const triggerChange = () => {
        if (disabled) return;

        const fakeEvent = {
            target: { checked: !isChecked },
        } as ChangeEvent<HTMLInputElement>;

        onChange?.(fakeEvent);
    };

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            triggerChange();
        }
    };

    return (
        <div
            onClick={triggerChange}
            css={[cssProp, sx]}
            onKeyDown={onKeyDownHandler}
            aria-checked={isChecked}
            tabIndex={0}
            role="checkbox"
        >
            <Check css={[s_svgColor(variant, color, isChecked, defaultChecked, disabled)]} />
        </div>
    );
}
export { CheckboxControl };
