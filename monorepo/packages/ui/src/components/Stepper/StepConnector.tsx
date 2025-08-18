import React from 'react';

import { useStepContext } from './StepContext';
import { s_stepConnector, s_stepConnectorLine } from './Stepper.style';
import { useStepperContext } from './StepperContext';
import type { StepConnectorProps } from './types';

function StepConnector({ sx }: StepConnectorProps) {
    //prop destruction

    //lib hooks
    const { alternativeLabel, orientation } = useStepperContext();
    const { active, completed } = useStepContext();

    //state, ref, querystring hooks

    //form hooks

    //query hooks

    //calculated values

    //effects

    //handler

    return (
        <div css={[s_stepConnector(alternativeLabel, orientation), sx]}>
            <span css={s_stepConnectorLine(orientation, active, completed)} />
        </div>
    );
}

export { StepConnector };
