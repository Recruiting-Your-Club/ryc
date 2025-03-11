import React, { useId, useState } from 'react';
import { CheckboxContext } from './CheckboxContext';

export type CheckboxSize = 'xs' | 's' | 'md' | 'lg';
export type CheckboxVariant = 'outline' | 'solid' | 'subtle';
export type CheckboxColor = 'default' | 'gray';

interface CheckboxRootProps {
    variant?: CheckboxVariant;
    size?: CheckboxSize;
    children: React.ReactNode;
}

function CheckboxRoot({ variant, size, children }: CheckboxRootProps) {
    const [isChecked, setIsChecked] = useState(false);
    const id = useId();

    return (
        <CheckboxContext.Provider
            value={{
                id: id,
                variant,
                size,
                isChecked: isChecked,
                onChange: () => setIsChecked(!isChecked),
            }}
        >
            <div>{children}</div>
        </CheckboxContext.Provider>
    );
}
export { CheckboxRoot };
