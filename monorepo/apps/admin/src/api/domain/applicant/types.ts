export interface ApplicantDocument {
    applicantId: string;
    name: string;
    email: string;
    status: string;
    submittedAt: string;
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
    questionOptions?: string[][];
    textAnswer?: string;
    selectedOptionIds?: string[];
    fileUrl?: string;
}
