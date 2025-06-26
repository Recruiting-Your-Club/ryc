/// <reference types="react" />
import type { CheckboxColor, CheckboxSize, CheckboxVariant } from './CheckboxRoot';
interface CheckboxContextType {
    id?: string;
    isChecked?: boolean;
    onChange: () => void;
    variant?: CheckboxVariant;
    size?: CheckboxSize;
    color?: CheckboxColor;
    defaultChecked?: boolean;
    disabled?: boolean;
}
export declare const CheckboxContext: import("react").Context<CheckboxContextType | undefined>;
export declare const useCheckboxContext: () => CheckboxContextType;
export {};
//# sourceMappingURL=CheckboxContext.d.ts.map