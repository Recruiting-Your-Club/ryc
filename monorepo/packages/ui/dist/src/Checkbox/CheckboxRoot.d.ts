import type { CSSObject } from '@emotion/react';
import React from 'react';
export type CheckboxSize = 'xs' | 's' | 'md' | 'lg';
export type CheckboxVariant = 'outline' | 'solid' | 'subtle';
export type CheckboxColor = 'default' | 'gray' | 'red' | 'black';
interface CheckboxRootProps {
    variant?: CheckboxVariant;
    size?: CheckboxSize;
    color?: CheckboxColor;
    children?: React.ReactNode;
    onChange?: () => void;
    isChecked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    sx?: CSSObject;
}
declare function CheckboxRoot({ variant, size, color, children, onChange, isChecked: externalChecked, defaultChecked, disabled, sx, ...props }: CheckboxRootProps): import("@emotion/react/jsx-runtime").JSX.Element;
export { CheckboxRoot };
//# sourceMappingURL=CheckboxRoot.d.ts.map