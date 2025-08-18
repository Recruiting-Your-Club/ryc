import type { ReactNode } from 'react';
import React, { createContext, useContext } from 'react';

import type { StepperContextType } from './types';

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
