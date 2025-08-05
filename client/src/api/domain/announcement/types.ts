export interface ApplicationForm {
    applicationQuestions: QuestionResponse[];
    preQuestions: QuestionResponse[];
    personalInfoQuestions: string[];
}

export interface QuestionOption {
    id: string;
    option: string;
}

export interface QuestionResponse {
    id: string;
    type: string;
    label: string;
    isRequired: boolean;
    options?: QuestionOption[];
    description?: string;
}

export interface AnnouncementSummary {
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

export interface Period {
    startDate: string;
    endDate: string;
}

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
