import type { CSSObject } from '@emotion/react';
export type RadioOrientation = 'horizontal' | 'vertical';
interface RadioOption {
    label?: string;
    value: string;
}
interface RadioProps {
    options: RadioOption[];
    name: string;
    value?: string;
    disabled?: boolean;
    orientation: RadioOrientation;
    onChange: (value: string) => void;
    sx?: CSSObject;
}
declare function Radio({ options, name, value, disabled, orientation, onChange, sx }: RadioProps): import("@emotion/react/jsx-runtime").JSX.Element;
export { Radio };
//# sourceMappingURL=Radio.d.ts.map