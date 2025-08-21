import type { CSSObject } from '@emotion/react';

export type QuestionType =
    | 'FILE'
    | 'MULTIPLE_CHOICE'
    | 'SINGLE_CHOICE'
    | 'LONG_ANSWER'
    | 'SHORT_ANSWER';

export interface AnnouncementInfoPageProps {
    id?: string;
    title?: string;
    summaryDescription?: string;
    detailDescription?: string;
    target?: string;
    field?: string;
    announcementStatus?: 'UPCOMING' | 'RECRUITING' | 'CLOSED' | 'EMPTY';
    announcementType?: 'ALWAYS_OPEN' | 'LIMITED_TIME';
    activityPeriod?: string;
    numberOfPeople?: string;
    applicationPeriod?: Period; //서류 접수 기간
    interviewPeriod?: Period; //면접 날짜
    documentResultPeriod?: Period; // 서류평가 결과
    finalResultPeriod?: Period; //최종 결과
    images?: string[];
}

export interface PersonalInfoPageProps {
    personalQuestions: PersonalQuestion[];
    containerStyle: CSSObject;
}

export interface PersonalQuestion {
    id: string;
    type: QuestionType;
    label: string;
    isRequired: boolean;
    options: string[];
}

export interface DetailQuestionPageProps {
    detailQuestions: DetailQuestion[];
    containerStyle: CSSObject;
}

export interface DetailQuestion {
    id: string;
    type: QuestionType;
    label: string;
    isRequired: boolean;
    description?: string;
}

interface Period {
    startDate: string;
    endDate: string;
}
