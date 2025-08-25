export interface Email {
    recipients: string[];
    subject: string;
    content: string;
}

export interface InterviewEmail {
    numberOfPeopleByInterviewDateRequests: InterviewDetailInformation[];
    emailSendRequest: Email;
}

export interface InterviewDetailInformation {
    start: string;
    interviewDuration: number;
    numberOfPeople: number;
}
