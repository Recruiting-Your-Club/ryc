export interface announcements {
    announcementId: string;
    title: string;
}

export interface detailAnnouncements {
    id: string;
    title: string;
    summaryDescription: string;
    detailDescription: string;
    target: string;
    field: string;
    announcementsStatus: string;
    announcementType: string;
    hasInterview: boolean; //안필요할거같은데?
    activityPeriod: string;
    numberOfPeople: string;
}
