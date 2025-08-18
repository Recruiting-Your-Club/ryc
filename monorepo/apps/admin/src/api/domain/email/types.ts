export interface Email {
    recipients: string[];
    subject: string;
    content: string;
}

export interface InterviewEmail {
    numberOfPeopleByInterviewDates: InterviewDetailInformation[];
    emailSendRequest: Email;
}

export interface InterviewDetailInformation {
    interviewPeriod: { startDate: string; endDate: string };
    numberOfPeople: number;
}
