import type { ReactNode } from 'react';
import React, { useContext, createContext } from 'react';

interface StepperContextType {
    activeStep: number;
    alternativeLabel: boolean; //Label 수평 or 수직
    connector: ReactNode; //연결선
    orientation: 'horizontal' | 'vertical';
}

export const StepperContext = createContext<StepperContextType>({
    activeStep: 0,
    alternativeLabel: false,
    connector: null,
    orientation: 'horizontal',
});

export function useStepperContext(): StepperContextType {
    const context = useContext(StepperContext);

    if (context === undefined) {
        throw new Error('useStepperContext must be used within a StepperContext.Provider');
    }

    return context;
}
