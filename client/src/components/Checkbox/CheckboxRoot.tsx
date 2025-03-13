import React, { useId, useState } from 'react';
import { rootContainer } from './Checkbox.style';
import { CheckboxContext } from './CheckboxContext';

export type CheckboxSize = 'xs' | 's' | 'md' | 'lg';
export type CheckboxVariant = 'outline' | 'solid' | 'subtle';
export type CheckboxColor = 'default' | 'gray' | 'red' | 'black';

interface CheckboxRootProps {
    variant?: CheckboxVariant;
    size?: CheckboxSize;
    color?: CheckboxColor;
    children?: React.ReactNode;
}

function CheckboxRoot({ variant, size, color, children }: CheckboxRootProps) {
    const [isChecked, setIsChecked] = useState(false);
    const id = useId(); // HiddenInput과 Label 연결을 위해 임의 아이디 생성

    return (
        <CheckboxContext.Provider
            value={{
                id: id,
                variant,
                size,
                color,
                isChecked: isChecked,
                onChange: () => setIsChecked(!isChecked),
            }}
        >
            <div css={rootContainer}>{children}</div>
        </CheckboxContext.Provider>
    );
}
export { CheckboxRoot };
