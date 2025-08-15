import type { StepApplicant } from '@api/domain/step/types';

export interface ApplicationListProps {
    title?: string;
    height?: string;
    applicantList: StepApplicant[];
    selectedApplicantId: string | null;
    onSelectApplicantId: (id: string) => void;
}
