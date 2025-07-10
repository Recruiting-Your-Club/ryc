interface InterviewSet {
    id: number;
    name: string;
    startTime: string;
    endTime: string;
}

export type InterviewSchedule = {
    date: string;
    interviewSets: InterviewSet[];
};

export interface Interviewee {
    id: number;
    name: string;
    email: string;
    interviewSetId: number;
}

export interface IntervieweeDetail extends Interviewee {
    studentId: string;
    phone: string;
}

export interface IntervieweeInformation {
    id: number;
    name: string;
    email: string;
    studentId: string;
    phone: string;
    interviewDate: string;
    interviewName: string;
}

export interface Document {
    applicantId: number;
    detail: { question: string; answer: string }[];
}

export interface Evaluation {
    applicantId: number;
    averageScore: number;
    comments: { id: number; score: number; name: string; comment: string }[];
}
