import type { QuestionProps } from '@components/QuestionForm/types';

import type { BasicInfoFields, RecruitDetailInfo } from '../types';

export interface PreviewStepProps {
    recruitDetailInfo: RecruitDetailInfo;
    recruitFiles: File[];
    infoFields: BasicInfoFields; // 얘는 파싱해서 바꿔야함
    questions: QuestionProps[];
    applicationQuestions: QuestionProps[];
}
