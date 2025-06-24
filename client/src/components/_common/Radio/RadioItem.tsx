import type { HTMLAttributes } from 'react';
import React from 'react';
import type { RadioSize } from './Radio.style';
import { s_radio, s_label, s_input } from './Radio.style';

interface RadioItemProps extends HTMLAttributes<HTMLInputElement> {
    option?: string;
    checked?: boolean;
    disabled?: boolean;
    value?: string;
    name?: string;
    size?: RadioSize;
}

function RadioItem({
    option,
    checked = false,
    disabled = false,
    onChange,
    size = 'md',
    ...props
}: RadioItemProps) {
    return (
        <label css={s_label(disabled)}>
            <input type="radio" checked={checked} onChange={onChange} css={s_input} {...props} />
            <span css={s_radio(checked, size)} />
            {option}
        </label>
    );
}

export { RadioItem };
