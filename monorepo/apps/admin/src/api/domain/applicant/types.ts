import type { ProfileImageInformation } from '../step/types';

export interface ApplicantDocument {
    applicantId: string;
    name: string;
    email: string;
    status: string;
    submittedAt: string;
    profileImage: ProfileImageInformation;
    personalInfos?: PersonalInfo[];
    preQuestionAnswers?: QuestionAnswer[];
    applicationQuestionAnswers?: QuestionAnswer[];
}

export interface PersonalInfo {
    questionType: string;
    value: string;
}

export interface QuestionAnswer {
    questionId: string;
    questionLabel: string;
    questionType: string;
    isRequired: boolean;
    questionOptions?: { optionId: string; option: string }[];
    textAnswer?: string;
    selectedOptionIds?: string[];
    file?: { id: string; url: string; originalFileName: string; contentType: string };
}
