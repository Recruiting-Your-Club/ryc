/**
 * 지원서 제출 타입
 */

// 파일 첨부할때 textAnswer는 null로 보내야함
export type PersonalInfoQuestionType =
    | 'STUDENT_ID'
    | 'PHONE_NUMBER'
    | 'PROFILE_IMAGE'
    | 'NAME'
    | 'EMAIL';

export interface PersonalInfosRequest {
    personalInfoQuestionType: PersonalInfoQuestionType;
    value: string;
}

export interface ApplicantRequest {
    email: string;
    name: string;
    personalInfos: PersonalInfosRequest[];
}

export interface AnswerChoices {
    optionId: string;
}

export interface AnswersRequest {
    questionId: string;
    textAnswer: string | null;
    fileMetadataId: string | null;
    answerChoices?: AnswerChoices[];
}

export interface ApplicationRequest {
    answers: AnswersRequest[];
}

export interface ApplicationSubmissionRequest {
    applicant: ApplicantRequest;
    application: ApplicationRequest;
}

/**
 * 지원서 폼 조회 타입
 */
export interface QuestionOption {
    id: string;
    option: string;
}

export interface QuestionResponse {
    id: string;
    label: string;
    type: string;
    options?: QuestionOption[];
    isRequired: boolean;
    description?: string;
}

export interface ApplicationForm {
    applicationQuestions: QuestionResponse[];
    preQuestions: QuestionResponse[];
    personalInfoQuestions: string[];
}

/**
 * 공고 목록 조회 타입
 */
export interface Period {
    startDate: string;
    endDate: string;
}

export interface AnnouncementSummary {
    announcementId: string;
    title: string;
    summaryDescription: string;
    target: string;
    field: string;
    announcementStatus: string;
    announcementType: string;
    applicationPeriod: Period;
    tags: string[];
}

/**
 * 공고 상세 조회 타입
 */

export interface Image {
    id: string;
    fileMetadataId: string;
    originUrl: string;
    thumbnailUrl: string;
    ContentType: string;
}

export interface Announcement {
    id: string;
    clubName: string;
    title: string;
    summaryDescription: string;
    detailDescription: string;
    target: string;
    field: string;
    announcementStatus: string;
    announcementType: string;
    hasInterview: boolean;
    activityPeriod: string;
    numberOfPeople: string;
    applicationPeriod: Period;
    interviewPeriod: Period;
    documentResultPeriod: Period;
    finalResultPeriod: Period;
    applicationForm: ApplicationForm;
    tags: string[];
    images: Image[];
}
