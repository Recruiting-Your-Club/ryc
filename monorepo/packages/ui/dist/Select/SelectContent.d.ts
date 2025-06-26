import type { CSSObject } from '@emotion/react';
import type { HTMLAttributes, ReactNode, Ref } from 'react';
interface SelectContentProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    sx?: CSSObject;
}
declare function SelectContent({ children, sx, ...props }: SelectContentProps, forwardedRef: Ref<HTMLDivElement>): import("@emotion/react/jsx-runtime").JSX.Element;
export { SelectContent };
//# sourceMappingURL=SelectContent.d.ts.map