import type { PersonalInfo, QuestionAnswer } from '@api/domain/applicant/types';

export interface InformationBoxProps {
    personalInformation: PersonalInfo[];
    preQuestionAnswers: QuestionAnswer[];
    applicationQuestionAnswers: QuestionAnswer[];
    height?: string;
}
