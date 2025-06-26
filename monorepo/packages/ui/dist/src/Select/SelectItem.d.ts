import type { CSSObject } from '@emotion/react';
import type { HTMLAttributes, ReactNode } from 'react';
interface SelectItemProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    value: string;
    disabled?: boolean;
    highlight?: boolean;
    sx?: CSSObject;
}
declare function SelectItem({ children, value: itemValue, disabled, sx, ...props }: SelectItemProps): import("@emotion/react/jsx-runtime").JSX.Element;
export { SelectItem };
//# sourceMappingURL=SelectItem.d.ts.map