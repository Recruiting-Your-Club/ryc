import type { CSSObject } from '@emotion/react';
export type Size = 'xs' | 's' | 'md' | 'lg' | 'xl';
export interface LoadingProps {
    size?: Size;
    color?: string;
    sx?: CSSObject;
}
export interface SpinnerProps extends LoadingProps {
    backgroundColor?: CSSObject['backgroundColor'];
}
declare function SpinSpinner(props: SpinnerProps): import("@emotion/react/jsx-runtime").JSX.Element;
declare function PulseSpinner(props: LoadingProps): import("@emotion/react/jsx-runtime").JSX.Element;
export { PulseSpinner, SpinSpinner };
//# sourceMappingURL=LoadingSpinner.d.ts.map