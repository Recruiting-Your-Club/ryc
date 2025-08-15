type summaries = {
    title: string;
    value: string;
};
type images = {
    imageUrl: string;
    thumbnailUrl: string;
};
type announcementStatus = 'RECRUITING' | 'UPCOMING' | 'CLOSED' | 'EMPTY';

interface ClubTag {
    name: string;
}
export interface AllClub {
    id: string;
    name: string;
    shortDescription: string;
    imageUrl: string;
    thumbnailUrl: string;
    category: string;
    announcementStatus?: announcementStatus;
    clubTags: ClubTag[];
}
export interface Club {
    name: string;
    detailDescription: string;
    imageUrl: string;
    thumbnailUrl: string;
    category: string;
    clubTags: ClubTag[];
    clubSummaries: summaries[];
    clubDetailImages: images[];
}

interface RepresentativeImage {
    id: string;
    url: string;
    originalFileName: string;
    contentType: string;
}

// 기간 정보
interface Period {
    startDate: string; // YYYY-MM-DDTHH:mm 형식
    endDate: string; // YYYY-MM-DDTHH:mm 형식
}

// 개별 면접 시간 슬롯 정보
export interface InterviewSlot {
    id: string;
    period: Period;
    maxNumberOfPeople: number;
    currentNumberOfPeople: number;
}

// 날짜별 면접 슬롯 그룹
interface SlotByDate {
    date: string; // YYYY-MM-DD 형식
    interviewDuration: number;
    interviewSlots: InterviewSlot[];
}

// 전체 클럽 면접 일정 정보
export interface ClubInterviewSchedule {
    clubName: string;
    clubCategory: string;
    clubImageUrl: string;
    isReserved: boolean;
    applicantName: string;
    applicantEmail: string;
    representativeImage: RepresentativeImage;
    slotByDateResponses: SlotByDate[];
}

export interface SubmitReservationResponse {
    id: string;
}
