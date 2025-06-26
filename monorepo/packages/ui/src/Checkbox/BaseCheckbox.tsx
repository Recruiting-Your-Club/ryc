import React from 'react';

import { CheckboxControl } from './CheckboxControl';
import { CheckboxHiddenInput } from './CheckboxHiddenInput';
import { CheckboxLabel } from './CheckboxLabel';
import type { CheckboxColor, CheckboxSize, CheckboxVariant } from './CheckboxRoot';
import { CheckboxRoot } from './CheckboxRoot';

interface CheckboxProps {
    variant?: CheckboxVariant;
    size?: CheckboxSize;
    color?: CheckboxColor;
    isChecked?: boolean;
    onChange?: () => void;
    defaultChecked?: boolean;
    disabled?: boolean;
}

function BaseCheckbox({
    variant,
    size,
    color,
    isChecked,
    onChange,
    defaultChecked = false,
    disabled = false,
}: CheckboxProps) {
    // prop destruction
    // lib hooks
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    // effects
    // handlers
    return (
        <>
            <CheckboxRoot
                variant={variant}
                size={size}
                color={color}
                isChecked={isChecked}
                onChange={onChange}
                defaultChecked={defaultChecked}
                disabled={disabled}
            >
                <CheckboxHiddenInput />
                <CheckboxControl />
                <CheckboxLabel>Checkbox 입니다.</CheckboxLabel>
            </CheckboxRoot>
        </>
    );
}

const Checkbox = Object.assign(BaseCheckbox, {
    Root: CheckboxRoot,
    HiddenInput: CheckboxHiddenInput,
    Control: CheckboxControl,
    Label: CheckboxLabel,
});

export { Checkbox };
