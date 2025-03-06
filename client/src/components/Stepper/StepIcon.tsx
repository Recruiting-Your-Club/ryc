import type { ReactNode } from 'react';
import React from 'react';
import { s_stepIcon, s_stepIconText } from './Stepper.style';
import { colors } from '@styles/color';
import WarningIcon from '@assets/images/warningIcon.svg';

interface StepIconProps {
    active?: boolean;
    completed?: boolean;
    error?: boolean;
    disabled?: boolean;
    icon: ReactNode;
}

function StepIcon({ active = false, completed = false, error = false, disabled = false, icon }: StepIconProps) {
    if (error) {
        return <WarningIcon />;
    }

    return (
        <svg viewBox="0 0 30 30" css={s_stepIcon(active, completed, error, disabled)}>
            <circle cx="15" cy="15" r="15" fill={completed ? '#C2C0FF' : active ? colors.default : colors.disabled} />

            <text x="15" y="15" textAnchor="middle" dominantBaseline="central" css={s_stepIconText}>
                {icon}
            </text>
        </svg>
    );
}

export { StepIcon };
