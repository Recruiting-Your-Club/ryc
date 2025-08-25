import type { MyEvaluationStatus } from '@api/domain/evaluation/types';
import type { StepApplicant } from '@api/domain/step/types';
import type { CSSObject } from '@emotion/react';
import type { ReactNode } from 'react';

export interface ApplicationListProps {
    title?: string;
    height?: string;
    applicantList: StepApplicant[];
    myEvaluationStatusList?: MyEvaluationStatus;
    selectedApplicantId: string;
    onSelectApplicantId: (id: string) => void;
    titleMode?: TitleMode;
    children?: ReactNode;
    sx?: CSSObject;
}

export type TitleMode = 'titleString' | 'titleNode';
