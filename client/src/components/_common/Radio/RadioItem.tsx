import type { HTMLAttributes } from 'react';
import React from 'react';
import { s_radio, s_label, s_input } from './Radio.style';

interface RadioItemProps extends HTMLAttributes<HTMLInputElement> {
    option: string;
    value: string;
    name: string;
    checked: boolean;
    disabled?: boolean;
    onChange: () => void;
}

function RadioItem({ option, checked, disabled = false, onChange, ...props }: RadioItemProps) {
    return (
        <label css={s_label(disabled)}>
            <input type="radio" checked={checked} onChange={onChange} css={s_input} {...props} />
            <span css={s_radio(checked)} />
            {option}
        </label>
    );
}

export { RadioItem };
