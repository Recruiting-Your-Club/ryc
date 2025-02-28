import type { ReactNode, ElementType } from 'react';
import React, { useMemo, Children, cloneElement } from 'react';
import { s_stepper } from './Stepper.style';

interface StepperProps {
    activeStep?: number;
    alternativeLabel?: boolean; //Label 수평 or 수직
    children: ReactNode; //Step
    component?: ElementType; //하위 컴포넌트
    connector?: ReactNode; //연결선
    nonLinear?: boolean; //skip
    orientation?: 'horizontal' | 'vertical';
    customCSS?: string;
}
