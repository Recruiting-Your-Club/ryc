import React from 'react';
import { s_radio, s_radioInner, s_label, s_input } from './Radio.style';
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
        <label css={s_label(checked, disabled)}>
            <input type="radio" checked={checked} onChange={onChange} css={s_input} {...props} />
            <div css={s_radio(size)} tabIndex={0}>
                {checked && <div css={s_radioInner} />}
            </div>
            {option}
        </label>
    );
}

export { RadioItem };
