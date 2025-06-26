import type { CSSObject } from '@emotion/react';
import type { HTMLAttributes, ReactNode } from 'react';
interface SelectLabelProps extends HTMLAttributes<HTMLLabelElement> {
    children: ReactNode;
    sx?: CSSObject;
}
declare function SelectLabel({ children, ...props }: SelectLabelProps): import("@emotion/react/jsx-runtime").JSX.Element;
export { SelectLabel };
//# sourceMappingURL=SelectLabel.d.ts.map