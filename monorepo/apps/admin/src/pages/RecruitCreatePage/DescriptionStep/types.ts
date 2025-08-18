import type { RecruitDetailInfo } from '../types';

export interface DescriptionProps {
    recruitDetailInfo: RecruitDetailInfo;
    recruitFiles: File[];
    onChange: (updateFields: Partial<RecruitDetailInfo>) => void;
    onFileChange: (recruitFiles: File[]) => void;
}

type RecruitDetailInfoKey = keyof RecruitDetailInfo;

export type DetailQuestionList = {
    label: string;
    key: RecruitDetailInfoKey;
    placeholder: string;
    required: boolean;
}[];
