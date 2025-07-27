export interface ApplicationForm {
    applicationQuestions: Question[];
    preQuestions: Question[];
    personalInfoQuestions: string[];
}

export interface Question {
    id: string;
    type: string;
    label: string;
    isRequired: boolean;
    options?: string[];
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
