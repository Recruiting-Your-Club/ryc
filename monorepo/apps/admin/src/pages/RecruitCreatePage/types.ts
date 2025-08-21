export interface RecruitDetailInfo {
    recruitmentSubject: string;
    recruitmentSummaryDescription: string;
    recruitmentNumber: string;
    activityPeriod: string;
    recruitmentField: string;
    recruitmentTarget: string;
    documentPeriod: Period;
    documentResult: Period;
    interviewSchedule: Period;
    finalResult: Period;
    tags: string[];
}

export interface BasicInfoFields {
    studentId: boolean;
    phone: boolean;
    photo: boolean;
}

export type Period = { startDate: string; endDate: string };
