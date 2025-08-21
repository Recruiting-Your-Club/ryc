export interface AnnouncementList {
    announcementId: string;
    title: string;
    summaryDescription: string;
    target: string;
    announcementStatus: string;
    announcementType: string;
    applicationStartDate: string;
    applicationEndDate: string;
    tags: string[];
}

export interface Announcement {
    announcementId: string;
    title: string;
    summaryDescription: string;
    target: string;
    announcementStatus: string;
    announcementType: string;
    applicationStartDate: string;
    applicationEndDate: string;
    tags: string[];
}

export interface DetailAnnouncement {
    id: string;
    title: string; //공고 제목
    summaryDescription: string; //공고 요약 설명 (공고 카드)
    detailDescription: string; //공고 상세
    target: string; //모집 대상
    field: string; //모집 분야
    announcementStatus: 'UPCOMING' | 'RECRUITING' | 'CLOSED' | 'EMPTY';
    announcementType: 'ALWAYS_OPEN' | 'LIMITED_TIME';
    activityPeriod: string;
    numberOfPeople: string;
    applicationPeriod: Period; //서류 접수 기간
    interviewPeriod: Period; //면접 날짜
    documentResultPeriod: Period; // 서류평가 결과
    finalResultPeriod: Period; //최종 결과
    applicationForm: ApplicationForm;
    tags: string[]; //공고 카드 태그 정보
    images: Image[];
}

export interface Period {
    startDate: string;
    endDate: string;
}

export interface ApplicationForm {
    id: string;
    applicationQuestions: ApplicationQuestion[];
    preQuestions: PreQuestion[];
    personalInfoQuestions: PersonalInfoQuestion[];
}

export type PersonalInfoQuestion =
    | 'STUDENT_ID'
    | 'PHONE_NUMBER'
    | 'PROFILE_IMAGE'
    | 'NAME'
    | 'EMAIL';

export interface ApplicationQuestion {
    id: string;
    type: QuestionType;
    label: string;
    isRequired: boolean;
    description?: string;
}

export interface PreQuestion {
    id: string;
    type: QuestionType;
    label: string;
    isRequired: boolean;
    options?: Option[];
}

export interface Option {
    id: string;
    option: string;
}

export interface Image {
    id: string;
    url: string;
    originalFileName: string;
    contentType: string;
}

export type QuestionType =
    | 'FILE'
    | 'MULTIPLE_CHOICE'
    | 'SINGLE_CHOICE'
    | 'LONG_ANSWER'
    | 'SHORT_ANSWER';

export interface AnnouncementSubmitRequest {
    title: string;
    periodInfo: {
        applicationPeriod: Period;
        interviewPeriod: Period;
        documentResultPeriod: Period;
        finalResultPeriod: Period;
    };
    numberOfPeople: string;
    detailDescription: string;
    summaryDescription: string;
    activityPeriod: string;
    target: string;
    field: string;
    announcementType: 'ALWAYS_OPEN' | 'LIMITED_TIME';
    tags: string[];
    applicationForm: {
        personalInfoQuestionTypes: PersonalInfoQuestion[];
        preQuestions: QuestionRequest[];
        applicationQuestions: QuestionRequest[];
    };
    images: string[];
}

export interface QuestionRequest {
    questionType: QuestionType;
    label: string;
    isRequired: boolean;
    description?: string;
    options?: OptionRequest[];
}

export interface OptionRequest {
    option: string;
}
