import React, { useState } from 'react';

const useStepper = (totalSteps: number, initialStep = 0) => {
    const [activeStep, setActiveStep] = useState(0);
    const next = () => setActiveStep((prev) => Math.min(prev + 1, totalSteps - 1));
    const prev = () => setActiveStep((prev) => Math.max(prev - 1, 0));

    return {
        activeStep,
        next,
        prev,
        setActiveStep,
        isFirst: activeStep === 0,
        isLast: activeStep === totalSteps - 1,
    };
};

export { useStepper };
