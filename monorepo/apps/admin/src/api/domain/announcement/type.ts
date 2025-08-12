export interface Announcement {
    announcementId: string;
    title: string;
}

export interface DetailAnnouncement {
    id: string;
    title: string; //공고 제목
    summaryDescription: string; //공고 요약 설명 (공고 카드)
    detailDescription: string; //공고 상세
    target: string; //모집 대상
    field: string; //모집 분야
    announcementsStatus: 'UPCOMING' | 'RECRUITING' | 'CLOSED' | 'EMPTY';
    announcementType: 'ALWAYS_OPEN' | 'LIMITED_TIME';
    activityPeriod: string;
    numberOfPeople: string;
    applicationPeriod: Period; //서류 접수 기간
    interviewPeriod: Period; //면접 날짜
    documentResultPeriod: Period; // 서류평가 결과
    finalResultPeriod: Period; //최종 결과
    applicationForm: ApplicationForm;
    tags: string[]; //공고 카드 태그 정보
    images: Image[];
}

interface Period {
    startDate: string;
    endDate: string;
}

interface ApplicationForm {
    applicationQuestions: ApplicationQuestion[];
    preQuestions: PreQuestion[];
    personalInfoQuestions: PersonalInfoQuestion[];
}

type PersonalInfoQuestion = 'STUDENT_ID' | 'PHONE_NUMBER' | 'PROFILE_IMAGE' | 'NAME' | 'EMAIL';

interface ApplicationQuestion {
    id: string;
    type: QuestionType;
    label: string;
    isRequired: boolean;
    subLabel: string;
}

interface PreQuestion {
    id: string;
    type: QuestionType;
    label: string;
    isRequired: boolean;
    options: Option[];
}

interface Option {
    option: string;
}

interface Image {
    fileMetaData: string;
}

type QuestionType = 'FILE' | 'MULTIPLE_CHOICE' | 'SINGLE_CHOICE' | 'LONG_ANSWER' | 'SHORT_ANSWER';
