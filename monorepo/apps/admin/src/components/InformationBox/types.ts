import type { PersonalInfo, QuestionAnswer } from '@api/domain/applicant/types';
import type { ProfileImageInformation } from '@api/domain/step/types';

export interface InformationBoxProps {
    name: string;
    email: string;
    profileImage: ProfileImageInformation;
    personalInformation: PersonalInfo[];
    preQuestionAnswers: QuestionAnswer[];
    applicationQuestionAnswers: QuestionAnswer[];
    height?: string;
}
