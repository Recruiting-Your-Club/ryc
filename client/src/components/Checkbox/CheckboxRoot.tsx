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
    defaultChecked?: boolean;
    disabled?: boolean;
}

function CheckboxRoot({
    variant,
    size,
    color,
    children,
    defaultChecked = false,
    disabled,
}: CheckboxRootProps) {
    // prop destruction
    // lib hooks
    const id = useId(); // HiddenInput과 Label 연결을 위해 임의 아이디 생성

    // state, ref, querystring hooks
    const [isChecked, setIsChecked] = useState(defaultChecked);

    // form hooks
    // query hooks
    // effects

    // handlers
    const onChange = () => {
        if (disabled) return;
        setIsChecked(!isChecked);
    };

    // calculated values
    const memoizedValue = useMemo(
        () => ({
            id: id,
            variant,
            size,
            color,
            isChecked: isChecked,
            onChange: () => onChange(),
            defaultChecked,
            disabled,
        }),
        [variant, size, color, isChecked, onChange, defaultChecked, disabled],
    );

    return (
        <CheckboxContext.Provider value={memoizedValue}>
            <div css={rootContainer}>{children}</div>
        </CheckboxContext.Provider>
    );
}
export { CheckboxRoot };
