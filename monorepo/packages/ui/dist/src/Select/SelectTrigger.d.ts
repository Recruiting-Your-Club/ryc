import type { CSSObject } from '@emotion/react';
import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react';
interface SelectTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    sx?: CSSObject;
}
declare function SelectTrigger({ children, sx, ...props }: SelectTriggerProps, forwardedRef: Ref<HTMLButtonElement>): import("@emotion/react/jsx-runtime").JSX.Element;
export { SelectTrigger };
//# sourceMappingURL=SelectTrigger.d.ts.map