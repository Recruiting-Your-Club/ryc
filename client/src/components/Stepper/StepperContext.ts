import type { ReactNode } from 'react';
import React, { useContext, createContext } from 'react';

interface StepperContextType {
    activeStep: number;
    alternativeLabel: boolean; //Label 수평 or 수직
    connector: ReactNode; //연결선
    nonLinear: boolean; //skip
    orientation: 'horizontal' | 'vertical';
}

export const StepperContext = createContext<StepperContextType | object>({});

export function useStepperContext(): StepperContextType | object {
    return useContext(StepperContext);
}
