type InterviewSet = {
    name: string;
    startTime: string;
    endTime: string;
};

export type InterviewSchedule = {
    date: string;
    interviewSets: InterviewSet[];
};

export interface IntervieweeInformation {
    id: number;
    name: string;
    email: string;
    studentId: string;
    phone: string;
    interviewDate: string;
    interviewName: string;
}

type DocumentSet = {
    id: number;
    detail: { question: string; answer: string }[];
};

export interface Evaluation {
    applicantId: number;
    averageScore: number;
    comments: { id: number; score: number; name: string; comment: string }[];
}
