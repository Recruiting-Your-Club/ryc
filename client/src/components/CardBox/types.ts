export type Step = 'normal' | 'final';

export interface CardBoxProps {
    stepTitle: string;
    step: Step;
    toggleDropdown?: () => void;
    height?: string;
    children?: ReactNode;
}
