import type {
    AnnouncementSubmitRequest,
    OptionRequest,
    PersonalInfoQuestion,
    QuestionRequest,
} from '@api/domain/announcement/types';
import type { QuestionProps, QuestionType } from '@components/QuestionForm/types';

import type { BasicInfoFields, Period, RecruitDetailInfo } from './types';

export const ALWAYS_OPEN_SENTINEL = '9999-12-31';

function isAlwaysOpen(period: Period) {
    return period?.startDate === ALWAYS_OPEN_SENTINEL && period?.endDate === ALWAYS_OPEN_SENTINEL;
}

function getAnnouncementType(period: Period): 'ALWAYS_OPEN' | 'LIMITED_TIME' {
    return isAlwaysOpen(period) ? 'ALWAYS_OPEN' : 'LIMITED_TIME';
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

function toQuestionRequests(questions: QuestionProps[]): QuestionRequest[] {
    return (questions ?? []).map(toQuestionRequest);
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
    imageUrls: string[];
}): AnnouncementSubmitRequest {
    const {
        recruitDetailInfo,
        basicInfoFields,
        preQuestions,
        applicationQuestions,
        detailDescription,
        imageUrls,
    } = args;

    const applicationPeriod = recruitDetailInfo.documentPeriod;

    return {
        title: recruitDetailInfo.recruitmentSubject.trim(),
        periodInfo: {
            applicationPeriod: recruitDetailInfo.documentPeriod,
            interviewPeriod: recruitDetailInfo.interviewSchedule,
            documentResultPeriod: recruitDetailInfo.documentResult,
            finalResultPeriod: recruitDetailInfo.finalResult,
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
        images: imageUrls ?? [],
    };
}
