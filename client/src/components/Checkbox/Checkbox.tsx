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
    disabled?: boolean;
    defaultChecked?: boolean;
}

function Checkbox({
    variant,
    size,
    color,
    disabled = false,
    defaultChecked = false,
}: CheckboxProps) {
    return (
        <>
            <CheckboxRoot
                variant={variant}
                size={size}
                color={color}
                disabled={disabled}
                defaultChecked={defaultChecked}
            >
                <CheckboxHiddenInput />
                <CheckboxControl />
                <CheckboxLabel>Checkbox 입니다.</CheckboxLabel>
            </CheckboxRoot>
        </>
    );
}

export { Checkbox };
