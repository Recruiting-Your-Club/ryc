import React from 'react';
import { radioContainer } from './Radio.style';
import { RadioItem } from './RadioItem';
import type { RadioProps } from './types';

function Radio({
    options,
    name,
    value,
    disabled,
    orientation = 'vertical',
    onChange,
    sx,
    size = 'md',
}: RadioProps) {
    return (
        <div css={[radioContainer(orientation), sx]}>
            {options?.map(({ label, value: itemValue }, index) => (
                <RadioItem
                    key={index}
                    option={label}
                    value={itemValue ?? ''}
                    name={name ?? ''}
                    checked={value === itemValue}
                    disabled={disabled}
                    onChange={() => onChange?.(itemValue ?? '')}
                    size={size}
                />
            ))}
        </div>
    );
}

export { Radio };
