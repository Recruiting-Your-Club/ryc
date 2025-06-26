import type { CSSObject } from '@emotion/react';
import type { ButtonHTMLAttributes } from 'react';
export type ButtonSize = 'xs' | 's' | 'md' | 'lg' | 'xl' | 'full';
export type ButtonVariant = 'primary' | 'outlined' | 'transparent' | 'text';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    disabled?: boolean;
    size?: ButtonSize;
    loading?: boolean;
    sx?: CSSObject;
    radius?: string;
    zIndex?: number;
}
declare function Button({ variant, size, children, disabled, radius, zIndex, loading, sx, type, 'aria-label': ariaLabel, onClick, }: ButtonProps): import("@emotion/react/jsx-runtime").JSX.Element;
export { Button };
//# sourceMappingURL=Button.d.ts.map