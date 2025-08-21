export interface InterviewSlot {
    id: string;
    period: SlotPeriod;
    maxNumberOfPeople: number;
    currentNumberOfPeople: number;
}

export interface SlotPeriod {
    startDate: string;
    endDate: string;
}

export interface InterviewApplicant {
    interviewReservationId: string;
    applicantSummary: {
        applicantId: string;
        applicantEmail: string;
        applicantName: string;
        imageResponse: {
            id: string;
            url: string;
            originalFileName: string;
            contentType: string;
        } | null;
    };
}

export interface UnreservedApplicant {
    applicantId: string;
    applicantEmail: string;
    applicantName: string;
    imageResponse: {
        id: string;
        url: string;
        originalFileName: string;
        contentType: string;
    };
}
