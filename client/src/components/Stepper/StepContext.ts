import React, { createContext, useContext } from 'react';

interface StepContextType {
    index: number;
    last: boolean;
    icon: number;
    active: boolean;
    completed: boolean;
    disabled: boolean;
}

export const StepContext = createContext<StepContextType>({
    index: 0,
    last: false,
    icon: 1,
    active: false,
    completed: false,
    disabled: false,
});

export function useStepContext(): StepContextType {
    return useContext(StepContext);
}
