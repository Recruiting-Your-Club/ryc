import type { RecruitDetailInfo } from '../types';

export interface DescriptionProps {
    recruitDetailInfo: RecruitDetailInfo;
    onChange: (updateFields: Partial<RecruitDetailInfo>) => void;
}

type RecruitDetailInfoKey = keyof RecruitDetailInfo;

export type DetailQuestionList = {
    label: string;
    key: RecruitDetailInfoKey;
    placeholder: string;
    required: boolean;
}[];
