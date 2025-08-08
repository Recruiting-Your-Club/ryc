export interface Applicant {
    id: number;
    name: string;
    email: string;
}

export interface ApplicantDetail extends Applicant {
    studentId: string;
    phone: string;
}

export interface Document {
    applicantId: string;
    detail: { id: string; question: string; answer: string }[];
}

export interface Evaluation {
    applicantId: number;
    averageScore: number;
    comments: Comment[];
}
export interface Comment {
    id: number;
    writerId: string;
    name: string;
    score: number;
    comment: string;
}

export interface CommentWithIsUser extends Comment {
    isUser: boolean;
}

export interface EvaluationWithIsMine extends Omit<Evaluation, 'comments'> {
    comments: CommentWithIsUser[];
}

export interface DocumentDetail {
    id: string;
    question: string;
    answer: string;
}

export interface DocumentAll {
    documentsByApplicant: {
        [applicantId: string]: DocumentDetail[];
    };
}

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
