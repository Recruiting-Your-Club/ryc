import React from 'react';
import { s_stepConnector, s_stepConnectorLine } from './Stepper.style';
import { useStepperContext } from './StepperContext';
import { useStepContext } from './StepContext';

interface StepConnectorProps {
    customCSS?: string;
}

function StepConnector({ customCSS }: StepConnectorProps) {
    const { alternativeLabel, orientation } = useStepperContext();
    const { completed } = useStepContext();

    return (
        <div css={[s_stepConnector(alternativeLabel, orientation), customCSS]}>
            <span css={s_stepConnectorLine(orientation, completed)} />
        </div>
    );
}

export { StepConnector };
