import type { CSSObject } from '@emotion/react';
import React, { useState } from 'react';
import { radioContainer } from './Radio.style';
import { RadioItem } from './RadioItem';

export type RadioOrientation = 'horizontal' | 'vertical';

interface RadioOption {
    label?: string; // 실제로 보여질 옵션 값
    value: string; // 서버에 넘겨질 옵션 값(직접 설정 가능)
}

interface RadioProps {
    options: RadioOption[];
    name: string;
    value?: string;
    disabled?: boolean;
    orientation: RadioOrientation;
    onChange: (value: string) => void;
    sx?: CSSObject;
}

function Radio({ options, name, value, disabled, orientation, onChange, sx }: RadioProps) {
    return (
        <div css={[radioContainer(orientation), sx]}>
            {options.map(({ label, value: itemValue }, index) => (
                <RadioItem
                    key={index}
                    option={label}
                    value={itemValue}
                    name={name}
                    checked={value === itemValue}
                    disabled={disabled}
                    onChange={() => onChange?.(itemValue)}
                />
            ))}
        </div>
    );
}

export { Radio };
