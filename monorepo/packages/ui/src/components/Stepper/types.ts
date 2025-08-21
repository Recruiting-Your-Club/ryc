import type { CSSObject } from '@emotion/react';
import type { ElementType, ReactNode } from 'react';

export interface StepProps {
    active?: boolean;
    children: ReactNode;
    component?: ElementType;
    completed?: boolean;
    disabled?: boolean;
    index?: number;
    last?: boolean;
    sx?: CSSObject;
}

export interface StepConnectorProps {
    sx?: CSSObject;
}

export interface StepIconProps {
    active?: boolean;
    completed?: boolean;
    error?: boolean;
    disabled?: boolean;
    icon: ReactNode;
}

export interface StepLabelProps {
    children: ReactNode;
    error?: boolean;
    subText?: ReactNode;
    sx?: CSSObject;
}

export interface StepperProps {
    activeStep?: number;
    alternativeLabel?: boolean;
    children: ReactNode;
    component?: ElementType;
    connector?: ReactNode;
    orientation?: Orientation;
    sx?: CSSObject;
}

export interface StepContextType {
    index: number;
    last: boolean;
    icon: number;
    active: boolean;
    completed: boolean;
    disabled: boolean;
}

export interface StepperContextType {
    activeStep: number;
    alternativeLabel: boolean; //Label 수평 or 수직
    connector: ReactNode; //연결선
    orientation: 'horizontal' | 'vertical';
}

type Orientation = 'horizontal' | 'vertical';
