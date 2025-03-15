import React, { useId, useMemo, useState } from 'react';
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
    isChecked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
}

function CheckboxRoot({
    variant,
    size,
    color,
    children,
    isChecked = false,
    // defaultChecked = false,
    disabled,
}: CheckboxRootProps) {
    // prop destruction
    // lib hooks
    const id = useId(); // HiddenInput과 Label 연결을 위해 임의 아이디 생성

    // state, ref, querystring hooks
    const [checked, setChecked] = useState(isChecked);

    // form hooks
    // query hooks
    // effects

    // handlers
    const onChange = () => {
        if (disabled) return;
        setChecked(!checked);
    };

    // calculated values
    const memoizedValue = useMemo(
        () => ({
            id: id,
            variant,
            size,
            color,
            isChecked: checked,
            onChange: () => onChange(),
            // defaultChecked,
            disabled,
        }),
        [variant, size, color, isChecked, onChange, disabled],
    );

    return (
        <CheckboxContext.Provider value={memoizedValue}>
            <div css={rootContainer}>{children}</div>
        </CheckboxContext.Provider>
    );
}
export { CheckboxRoot };
