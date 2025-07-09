type InterviewSet = {
    name: string;
    startTime: string;
    endTime: string;
};

type InterviewSchedule = {
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

type EvaluationSet = {
    applicantId: number;
    averageScore: number;
    comments: { evaluator: string; comment: string }[];
};
