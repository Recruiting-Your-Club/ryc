import { createContext, useContext } from 'react';
import type { CheckboxSize, CheckboxVariant } from './CheckboxRoot';

interface CheckboxContextType {
    id?: string;
    isChecked: boolean;
    onChange: () => void;
    variant?: CheckboxVariant;
    size?: CheckboxSize;
    color?: string;
}

export const CheckboxContext = createContext<CheckboxContextType | undefined>(undefined);

export const useCheckboxContext = () => {
    const context = useContext(CheckboxContext);

    if (context === undefined) {
        throw new Error(
            'useCheckboxContext는 useCheckboxContext.Provider 내부에서만 사용할 수 있습니다.',
        );
    }

    return context;
};
