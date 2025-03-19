import React from 'react';
import type { SerializedStyles } from '@emotion/react';
import { s_radio, s_label, s_input } from './Radio.style';

interface RadioItemProps {
    label: string;
    name: string;
    checked: boolean;
    onChange: () => void;
    customCSS?: SerializedStyles;
}

function RadioItem({ label, name, checked, onChange, customCSS }: RadioItemProps) {
    return (
        <label css={s_label}>
            <input type="radio" name={name} checked={checked} onChange={onChange} css={s_input} />
            <span css={s_radio(checked)} />
            {label}
        </label>
    );
}

export { RadioItem };
