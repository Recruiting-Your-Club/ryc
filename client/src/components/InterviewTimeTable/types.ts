export type InterviewSet = {
    name: string;
    startTime: string;
    endTime: string;
};

export type InterviewSchedule = {
    date: string;
    interviewSets: InterviewSet[];
};

export interface InterviewTimeTableProps {
    interviewSchedules: InterviewSchedule[];
}
