import type { HTMLAttributes } from 'react';
interface RadioItemProps extends HTMLAttributes<HTMLInputElement> {
    option?: string;
    value: string;
    name: string;
    checked: boolean;
    disabled?: boolean;
    onChange: () => void;
}
declare function RadioItem({ option, checked, disabled, onChange, ...props }: RadioItemProps): import("@emotion/react/jsx-runtime").JSX.Element;
export { RadioItem };
//# sourceMappingURL=RadioItem.d.ts.map