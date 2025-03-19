import type { SerializedStyles } from '@emotion/react';
import React, { useState } from 'react';
import { radioContainer } from './Radio.style';
import { RadioItem } from './RadioItem';

interface RadioProps {
    options: string[];
    name: string;
    value: string;
    onChange?: (value: string) => void;
    customCSS?: SerializedStyles;
}

function Radio({ options, name, value, onChange, customCSS }: RadioProps) {
    const [selectedValue, setSelectedValue] = useState<string>(value || '');
    const handleChange = (option: string) => {
        setSelectedValue(option);
        onChange?.(option);
    };
    return (
        <div css={[radioContainer, customCSS]}>
            {options.map((option, index) => (
                <RadioItem
                    key={index}
                    label={option}
                    name={name}
                    checked={selectedValue === option}
                    onChange={() => handleChange(option)}
                />
            ))}
        </div>
    );
}

export { Radio };
