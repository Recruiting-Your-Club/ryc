import type { ReactNode } from 'react';
import React from 'react';

import { useStepContext } from './StepContext';
import { StepIcon } from './StepIcon';
import {
    s_stepLabel,
    s_stepLabelIconContainer,
    s_stepLabelOptional,
    s_stepLabelText,
} from './Stepper.style';
import { useStepperContext } from './StepperContext';
import type { StepLabelProps } from './types';

function StepLabel({ children, error = false, subText, sx }: StepLabelProps) {
    // prop destruction

    // lib hooks
    const { alternativeLabel, orientation } = useStepperContext();
    const { active, completed, disabled, icon } = useStepContext();

    // state, ref, querystring hooks

    // form hooks

    // query hooks

    // calculated values

    // effects

    // handlers

    return (
        <span css={[s_stepLabel(alternativeLabel, disabled, orientation), sx]}>
            <span css={s_stepLabelIconContainer(alternativeLabel)}>
                <StepIcon
                    active={active}
                    completed={completed}
                    error={error}
                    disabled={disabled}
                    icon={icon}
                />
            </span>
            <div>
                <span css={s_stepLabelText(active, completed, error, disabled, alternativeLabel)}>
                    {children}
                </span>
                {subText && <div css={s_stepLabelOptional}>{subText}</div>}
            </div>
        </span>
    );
}

export { StepLabel };
