import type { RecruitDetailInfo } from '../type';

export interface DescriptionProps {
    recruitDetailInfo: RecruitDetailInfo;
    onChange: (updateFields: Partial<RecruitDetailInfo>) => void;
}
