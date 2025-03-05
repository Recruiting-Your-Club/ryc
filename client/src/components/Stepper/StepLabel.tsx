import type { ReactNode } from 'react';
import React from 'react';
import { useStepperContext } from './StepperContext';
import { useStepContext } from './StepContext';
import { s_stepLabel, s_stepLabelIconContainer, s_stepLabelOptional, s_stepLabelText } from './Stepper.style';
import { StepIcon } from './StepIcon';

interface StepLabelProps {
    children: ReactNode;
    error?: boolean;
    optional?: ReactNode;
    customCSS?: string;
}

function StepLabel({ children, error = false, optional, customCSS }: StepLabelProps) {
    const { alternativeLabel } = useStepperContext();
    const { active, completed, disabled, icon } = useStepContext();

    return (
        <span css={[s_stepLabel(alternativeLabel, disabled), customCSS]}>
            <span css={s_stepLabelIconContainer(alternativeLabel)}>
                <StepIcon active={active} completed={completed} error={error} disabled={disabled} icon={icon} />
            </span>
            <div>
                <span css={s_stepLabelText(active, completed, error, disabled)}>{children}</span>
                {optional && <div css={s_stepLabelOptional}>{optional}</div>}
            </div>
        </span>
    );
}

export { StepLabel };
