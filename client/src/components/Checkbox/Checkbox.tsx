import React from 'react';
import { CheckboxControl } from './CheckboxControl';
import { CheckboxHiddenInput } from './CheckboxHiddenInput';
import { CheckboxLabel } from './CheckboxLabel';
import type { CheckboxSize, CheckboxVariant } from './CheckboxRoot';
import { CheckboxRoot } from './CheckboxRoot';

interface CheckboxProps {
    variant?: CheckboxVariant;
    size?: CheckboxSize;
}

function Checkbox({ variant, size }: CheckboxProps) {
    return (
        <>
            <CheckboxRoot variant={variant} size={size}>
                <CheckboxHiddenInput />
                <CheckboxControl />
                <CheckboxLabel>이름 입니다.</CheckboxLabel>
            </CheckboxRoot>
        </>
    );
}

export { Checkbox };
