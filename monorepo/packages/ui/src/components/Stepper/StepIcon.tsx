import type { ReactNode } from 'react';
import React from 'react';

import WarningIcon from '@ssoc/assets/images/warningIcon.svg';
import theme from '@ssoc/styles';

import { s_stepIcon, s_stepIconText } from './Stepper.style';
import type { StepIconProps } from './types';

function StepIcon({
    active = false,
    completed = false,
    error = false,
    disabled = false,
    icon,
}: StepIconProps) {
    // prop destruction

    // lib hooks

    // state, ref, querystring hooks

    // form hooks

    // query hooks

    // calculated values

    // effects

    // handlers
    if (error) {
        return <WarningIcon />;
    }

    return (
        //NOTE: svg 내부에 조건부 로직이 포함되어 있어 따로 assets폴더에서 import해오지 않고 직접 작성
        <svg viewBox="0 0 30 30" css={s_stepIcon}>
            <circle
                cx="15"
                cy="15"
                r="15"
                fill={
                    completed
                        ? theme.colors.blue[100]
                        : active
                          ? theme.colors.default
                          : theme.colors.disabled
                }
            />

            <text x="15" y="15" textAnchor="middle" dominantBaseline="central" css={s_stepIconText}>
                {icon}
            </text>
        </svg>
    );
}

export { StepIcon };
