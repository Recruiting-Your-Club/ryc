import type { ReactNode } from 'react';
import React from 'react';
import { s_stepIcon, s_stepIconText } from './Stepper.style';
import { colors } from '@styles/color';

interface StepIconProps {
    active?: boolean;
    completed?: boolean;
    error?: boolean;
    disabled?: boolean;
    icon: ReactNode;
}

function WarningIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="red" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L1 22H23L12 2ZM12 18C11.45 18 11 17.55 11 17C11 16.45 11.45 16 12 16C12.55 16 13 16.45 13 17C13 17.55 12.55 18 12 18ZM13 14H11V10H13V14Z" />
        </svg>
    );
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
