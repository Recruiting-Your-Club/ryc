import type { RecruitDetailInfo } from '../types';

export interface DescriptionProps {
    recruitDetailInfo: RecruitDetailInfo;
    onChange: (updateFields: Partial<RecruitDetailInfo>) => void;
}
