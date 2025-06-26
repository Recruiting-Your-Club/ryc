import { CheckboxControl } from './CheckboxControl';
import { CheckboxHiddenInput } from './CheckboxHiddenInput';
import { CheckboxLabel } from './CheckboxLabel';
import type { CheckboxColor, CheckboxSize, CheckboxVariant } from './CheckboxRoot';
import { CheckboxRoot } from './CheckboxRoot';
interface CheckboxProps {
    variant?: CheckboxVariant;
    size?: CheckboxSize;
    color?: CheckboxColor;
    isChecked?: boolean;
    onChange?: () => void;
    defaultChecked?: boolean;
    disabled?: boolean;
}
declare function BaseCheckbox({ variant, size, color, isChecked, onChange, defaultChecked, disabled, }: CheckboxProps): import("@emotion/react/jsx-runtime").JSX.Element;
declare const Checkbox: typeof BaseCheckbox & {
    Root: typeof CheckboxRoot;
    HiddenInput: typeof CheckboxHiddenInput;
    Control: typeof CheckboxControl;
    Label: typeof CheckboxLabel;
};
export { Checkbox };
//# sourceMappingURL=BaseCheckbox.d.ts.map