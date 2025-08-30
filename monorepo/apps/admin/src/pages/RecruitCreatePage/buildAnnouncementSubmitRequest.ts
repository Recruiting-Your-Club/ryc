import type {
    AnnouncementPutSubmitRequest,
    AnnouncementSubmitRequest,
    ApplicationQuestion,
    DetailAnnouncement,
    OptionRequest,
    OptionRequestWithId,
    PersonalInfoQuestion,
    PreQuestion,
    QuestionRequest,
    QuestionWithIdRequest,
} from '@api/domain/announcement/types';
import type { QuestionProps, QuestionType } from '@components/QuestionForm/types';

import type { BasicInfoFields, Period, RecruitDetailInfo } from './types';

export const ALWAYS_OPEN_SENTINEL_DATE = '9999-12-31';
export const ALWAYS_OPEN_SENTINEL = '9999-12-31T00:00';

function toServerDateTime(date?: string): string {
    if (!date) return '';
    return date.includes('T') ? date : `${date}T00:00`;
}

function isSentinel(value?: string): boolean {
    if (!value) return false;
    const onlyDate = value.split('T')[0];
    return onlyDate === ALWAYS_OPEN_SENTINEL_DATE;
}

function isAlwaysOpen(p: Period) {
    return isSentinel(p?.startDate) && isSentinel(p?.endDate);
}

function getAnnouncementType(period: Period): 'ALWAYS_OPEN' | 'LIMITED_TIME' {
    return isAlwaysOpen(period) ? 'ALWAYS_OPEN' : 'LIMITED_TIME';
}

function normalizePeriod(p: Period): Period {
    if (isAlwaysOpen(p)) {
        return { startDate: ALWAYS_OPEN_SENTINEL, endDate: ALWAYS_OPEN_SENTINEL };
    }
    return {
        startDate: toServerDateTime(p?.startDate),
        endDate: toServerDateTime(p?.endDate),
    };
}

export function toServerQuestionType(type: QuestionType) {
    switch (type) {
        case 'short':
            return 'SHORT_ANSWER';
        case 'file':
            return 'FILE';
        case 'single':
            return 'SINGLE_CHOICE';
        case 'multiple':
            return 'MULTIPLE_CHOICE';
        case 'long':
            return 'LONG_ANSWER';
        default:
            return 'SHORT_ANSWER';
    }
}

function toOptionRequest(options?: QuestionProps['options']): OptionRequest[] {
    const cleaned = (options ?? []).map((option) => option.text.trim());

    return cleaned.map((text) => ({ option: text }));
}

function toOptionRequestWithId(options?: QuestionProps['options']): OptionRequestWithId[] {
    return (options ?? []).map((option) => ({
        id: option.id,
        option: option.text.trim(),
    }));
}

function toQuestionRequest(question: QuestionProps): QuestionRequest {
    const questionType = toServerQuestionType(question.type);
    const label = question.title.trim();

    const options =
        questionType === 'SINGLE_CHOICE' || questionType === 'MULTIPLE_CHOICE'
            ? toOptionRequest(question.options)
            : undefined;

    return {
        questionType,
        label,
        isRequired: !!question.required,
        description: question.subContent?.trim() || undefined,
        options,
    };
}

// 아이디 추가 버전
function toQuestionWithIdRequest(question: QuestionProps): QuestionWithIdRequest {
    const id = question.id;
    const questionType = toServerQuestionType(question.type);
    const label = question.title.trim();

    const options =
        questionType === 'SINGLE_CHOICE' || questionType === 'MULTIPLE_CHOICE'
            ? toOptionRequestWithId(question.options)
            : undefined;

    return {
        id,
        questionType,
        label,
        isRequired: !!question.required,
        description: question.subContent?.trim() || undefined,
        options,
    };
}

function toQuestionRequests(questions: QuestionProps[]): QuestionRequest[] {
    return (questions ?? []).map(toQuestionRequest);
}

// 아이디 추가 버전
function toQuestionWithIdRequests(questions: QuestionProps[]): QuestionWithIdRequest[] {
    return (questions ?? []).map(toQuestionWithIdRequest);
}

function mapPersonalInfoQuestions(basicInfoFiedls: BasicInfoFields): PersonalInfoQuestion[] {
    const array: PersonalInfoQuestion[] = ['NAME', 'EMAIL'];
    if (basicInfoFiedls.studentId) array.push('STUDENT_ID');
    if (basicInfoFiedls.phone) array.push('PHONE_NUMBER');
    if (basicInfoFiedls.photo) array.push('PROFILE_IMAGE');
    return array;
}

export function buildAnnouncementSubmitRequest(args: {
    recruitDetailInfo: RecruitDetailInfo;
    basicInfoFields: BasicInfoFields;
    preQuestions: QuestionProps[];
    applicationQuestions: QuestionProps[];
    detailDescription: string;
    imageFileIds: string[];
}): AnnouncementSubmitRequest {
    const {
        recruitDetailInfo,
        basicInfoFields,
        preQuestions,
        applicationQuestions,
        detailDescription,
        imageFileIds,
    } = args;

    const applicationPeriod = normalizePeriod(recruitDetailInfo.documentPeriod);
    const interviewPeriod = normalizePeriod(recruitDetailInfo.interviewSchedule);
    const documentResultPeriod = normalizePeriod(recruitDetailInfo.documentResult);
    const finalResultPeriod = normalizePeriod(recruitDetailInfo.finalResult);

    return {
        title: recruitDetailInfo.recruitmentSubject.trim(),
        periodInfo: {
            applicationPeriod,
            interviewPeriod,
            documentResultPeriod,
            finalResultPeriod,
        },
        numberOfPeople: (recruitDetailInfo.recruitmentNumber ?? '').toString(),
        detailDescription: detailDescription?.trim() ?? '',
        summaryDescription: recruitDetailInfo.recruitmentSummaryDescription.trim(),
        activityPeriod: (recruitDetailInfo.activityPeriod ?? '').trim(),
        target: (recruitDetailInfo.recruitmentTarget ?? '').trim(),
        field: (recruitDetailInfo.recruitmentField ?? '').trim(),
        announcementType: getAnnouncementType(applicationPeriod), // 'ALWAYS_OPEN' | 'LIMITED_TIME'
        tags: Array.isArray(recruitDetailInfo.tags) ? recruitDetailInfo.tags : [],
        applicationForm: {
            personalInfoQuestionTypes: mapPersonalInfoQuestions(basicInfoFields),
            preQuestions: toQuestionRequests(preQuestions),
            applicationQuestions: toQuestionRequests(applicationQuestions),
        },
        images: imageFileIds ?? [],
    };
}

export function buildAnnouncementPutSubmitRequest(args: {
    recruitDetailInfo: RecruitDetailInfo;
    basicInfoFields: BasicInfoFields;
    applicationFormId: string;
    preQuestions: QuestionProps[];
    applicationQuestions: QuestionProps[];
    detailDescription: string;
    imageFileIds: string[];
}): AnnouncementPutSubmitRequest {
    const {
        recruitDetailInfo,
        basicInfoFields,
        applicationFormId,
        preQuestions,
        applicationQuestions,
        detailDescription,
        imageFileIds,
    } = args;

    const applicationPeriod = normalizePeriod(recruitDetailInfo.documentPeriod);
    const interviewPeriod = normalizePeriod(recruitDetailInfo.interviewSchedule);
    const documentResultPeriod = normalizePeriod(recruitDetailInfo.documentResult);
    const finalResultPeriod = normalizePeriod(recruitDetailInfo.finalResult);

    return {
        title: recruitDetailInfo.recruitmentSubject.trim(),
        periodInfo: {
            applicationPeriod,
            interviewPeriod,
            documentResultPeriod,
            finalResultPeriod,
        },
        numberOfPeople: (recruitDetailInfo.recruitmentNumber ?? '').toString(),
        detailDescription: detailDescription?.trim() ?? '',
        summaryDescription: recruitDetailInfo.recruitmentSummaryDescription.trim(),
        activityPeriod: (recruitDetailInfo.activityPeriod ?? '').trim(),
        target: (recruitDetailInfo.recruitmentTarget ?? '').trim(),
        field: (recruitDetailInfo.recruitmentField ?? '').trim(),
        announcementType: getAnnouncementType(applicationPeriod), // 'ALWAYS_OPEN' | 'LIMITED_TIME'
        tags: Array.isArray(recruitDetailInfo.tags) ? recruitDetailInfo.tags : [],
        applicationForm: {
            id: applicationFormId,
            personalInfoQuestionTypes: mapPersonalInfoQuestions(basicInfoFields),
            preQuestions: toQuestionWithIdRequests(preQuestions),
            applicationQuestions: toQuestionWithIdRequests(applicationQuestions),
        },
        images: imageFileIds ?? [],
    };
}
