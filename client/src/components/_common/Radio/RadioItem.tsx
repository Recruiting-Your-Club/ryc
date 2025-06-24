import React from 'react';
import { s_radio, s_label, s_input } from './Radio.style';
import type { RadioItemProps } from './types';

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
