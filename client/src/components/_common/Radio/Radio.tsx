import type { CSSObject } from '@emotion/react';
import React, { useState } from 'react';
import { radioContainer } from './Radio.style';
import { RadioItem } from './RadioItem';

export type RadioOrientation = 'horizontal' | 'vertical';

interface RadioProps {
    options: string[];
    name: string;
    disabled?: boolean;
    orientation: RadioOrientation;
    onChange: (value: string) => void;
    sx?: CSSObject;
}

function Radio({ options, name, disabled, orientation, onChange, sx }: RadioProps) {
    const [selectedValue, setSelectedValue] = useState<string>('');

    const handleChange = (index: number) => {
        if (!disabled) {
            setSelectedValue(String(index));
            onChange?.(String(index));
        }
    };

    return (
        <div css={[radioContainer(orientation), sx]}>
            {options.map((option, index) => (
                <RadioItem
                    key={index}
                    option={option}
                    value={String(index)}
                    name={name}
                    checked={selectedValue === String(index)}
                    disabled={disabled}
                    onChange={() => handleChange(index)}
                />
            ))}
        </div>
    );
}

export { Radio };
