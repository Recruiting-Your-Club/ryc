import { DatePicker, DEFAULT_ALWAYS_OPEN_SENTINEL_START } from '@components';
import { FieldLabel } from '@components/FieldLabel/FieldLabel';
import { TagInput } from '@components/TagInput';
import { DETAIL_QUESTION_LIST } from '@constants/descriptionStep';
import dayjs from 'dayjs';
import React from 'react';

import { Editor, Input, useToast } from '@ssoc/ui';
import { FileUpLoader } from '@ssoc/ui';

import type { Period, RecruitDetailInfo } from '../types';
import {
    s_customFieldLabel,
    s_descriptionFileUploader,
    s_descriptionWrapper,
    s_form,
    s_formGroup,
} from './DescriptionStep.style';
import type { DescriptionProps } from './types';

const PERIOD_KEYS = new Set<keyof RecruitDetailInfo>([
    'documentPeriod',
    'documentResult',
    'interviewSchedule',
    'finalResult',
]);

const ALWAYS_OPEN_TARGET_KEYS = new Set<keyof RecruitDetailInfo>(['documentPeriod']);

function DescriptionStepPage({
    recruitDetailInfo,
    recruitFiles,
    onChange,
    onFilesChange,
    detailDescription,
    onDetailDescriptionChange,
    isFileUploading = false,
}: DescriptionProps) {
    const { toast } = useToast();

    const validateDateSelection = (
        listKey: string,
        d0: string,
        d1: string | null,
        recruitDetailInfo: RecruitDetailInfo,
    ): boolean => {
        const now = dayjs();

        if (d0 !== DEFAULT_ALWAYS_OPEN_SENTINEL_START && dayjs(d0).isBefore(now, 'day')) {
            return showError('현재 날짜보다 이전의 날짜는 선택할 수 없어요.');
        }

        if (listKey === 'documentPeriod' && recruitDetailInfo.documentResult.startDate) {
            const resultStart = recruitDetailInfo.documentResult.startDate;
            if ((d1 && d1 >= resultStart) || (!d1 && d0 >= resultStart)) {
                return showError('서류 접수 기간은 서류 합격 발표 일자보다 이전이어야 해요!');
            }
        }

        if (listKey === 'documentResult' && recruitDetailInfo.documentPeriod.endDate) {
            const { startDate, endDate } = recruitDetailInfo.documentPeriod;
            if (d0 <= endDate || d0 <= startDate) {
                return showError('서류 합격 발표 일자는 서류 접수 기간 이후여야 해요!');
            }
        }

        if (
            listKey === 'documentResult' &&
            recruitDetailInfo.documentPeriod.startDate &&
            !recruitDetailInfo.documentPeriod.endDate
        ) {
            if (d0 <= recruitDetailInfo.documentPeriod.startDate) {
                return showError('서류 합격 발표 일자는 서류 접수 기간 이후여야 해요!');
            }
        }

        if (listKey === 'interviewSchedule' && recruitDetailInfo.finalResult.startDate) {
            const resultStart = recruitDetailInfo.finalResult.startDate;
            if ((d1 && d1 >= resultStart) || (!d1 && d0 >= resultStart)) {
                return showError('면접 일정은 최종 합격 발표 일자보다 이전이어야 해요!');
            }
        }

        if (listKey === 'finalResult' && recruitDetailInfo.interviewSchedule.endDate) {
            const { startDate, endDate } = recruitDetailInfo.interviewSchedule;
            if (d0 <= endDate || d0 <= startDate) {
                return showError('최종 합격 발표 일자는 면접 일정 이후여야 해요!');
            }
        }

        if (
            listKey === 'finalResult' &&
            recruitDetailInfo.interviewSchedule.startDate &&
            !recruitDetailInfo.interviewSchedule.endDate
        ) {
            if (d0 <= recruitDetailInfo.interviewSchedule.startDate) {
                return showError('최종 합격 발표 일자는 면접 일정 이후여야 해요!');
            }
        }

        return true; // 통과
    };

    const showError = (message: string) => {
        toast(message, { type: 'error', toastTheme: 'white' });
        return false;
    };

    return (
        <>
            <div css={s_descriptionWrapper}>
                <FieldLabel
                    label="공고 제목"
                    description="공고 제목을 2자 이상 200자 이하로 작성해 주세요"
                    required
                />
                <Input
                    placeholder="ex) En# 신입 부원 모집"
                    value={recruitDetailInfo.recruitmentSubject}
                    onChange={(e) => onChange({ recruitmentSubject: e.target.value })}
                />
            </div>
            <div css={s_descriptionWrapper}>
                <FieldLabel label="공고 부제" description="공고 부제를 작성해주세요" required />
                <Input
                    placeholder="ex) En#에서 함께할 신입 부원을 모집합니다!"
                    value={recruitDetailInfo.recruitmentSummaryDescription}
                    onChange={(e) => onChange({ recruitmentSummaryDescription: e.target.value })}
                />
            </div>
            <FieldLabel
                label="공고 세부 정보"
                description="형식에 맞게 공고 세부 정보를 기입해주세요"
                additionalInformation="서류 접수 기간은 시작 날짜와 종료 날짜 모두 설정해주세요!"
            />
            <div css={s_form}>
                {DETAIL_QUESTION_LIST.map(({ label, key, placeholder, required, type, mode }) => {
                    const listKey = key as keyof RecruitDetailInfo;
                    const isPeriodField = PERIOD_KEYS.has(listKey);

                    const selectedDate = isPeriodField
                        ? mode === 'range'
                            ? [
                                  (recruitDetailInfo[listKey] as Period)?.startDate,
                                  (recruitDetailInfo[listKey] as Period)?.endDate,
                              ].filter(Boolean)
                            : (recruitDetailInfo[listKey] as Period)?.startDate
                              ? [(recruitDetailInfo[listKey] as Period).startDate]
                              : []
                        : (recruitDetailInfo[listKey] as string)
                          ? [recruitDetailInfo[listKey] as string]
                          : [];

                    return (
                        <div css={s_formGroup} key={key}>
                            <FieldLabel label={label} required={required} sx={s_customFieldLabel} />

                            {type === 'input' ? (
                                <Input
                                    placeholder={placeholder}
                                    value={recruitDetailInfo[listKey] as string}
                                    onChange={(e) => onChange({ [listKey]: e.target.value })}
                                />
                            ) : (
                                <DatePicker
                                    mode={mode}
                                    placeholder={placeholder}
                                    selectedDate={selectedDate}
                                    onChange={(dates) => {
                                        if (isPeriodField) {
                                            const [d0, d1] = (dates ?? []) as string[];

                                            if (
                                                !validateDateSelection(
                                                    listKey,
                                                    d0,
                                                    d1,
                                                    recruitDetailInfo,
                                                )
                                            )
                                                return;

                                            if (mode === 'range') {
                                                onChange({
                                                    [listKey]: {
                                                        startDate: d0 ?? '',
                                                        endDate: d1 ?? '',
                                                    },
                                                });
                                            } else {
                                                const date = d0 ?? '';
                                                onChange({
                                                    [listKey]: { startDate: date, endDate: date },
                                                });
                                            }
                                        } else {
                                            const [date] = (dates ?? []) as string[];
                                            onChange({ [listKey]: date ?? '' });
                                        }
                                    }}
                                    showAlwaysOpenToggle={ALWAYS_OPEN_TARGET_KEYS.has(listKey)}
                                    disabled={
                                        listKey !== 'documentPeriod' &&
                                        recruitDetailInfo.documentPeriod.startDate ===
                                            DEFAULT_ALWAYS_OPEN_SENTINEL_START
                                    }
                                />
                            )}
                        </div>
                    );
                })}
            </div>
            <div css={s_descriptionWrapper}>
                <FieldLabel
                    label="공고 태그 작성"
                    description="태그를 입력한 후 Enter를 눌러주세요"
                />
                <TagInput
                    tags={recruitDetailInfo.tags}
                    onTagsChange={(next) => onChange({ tags: next })}
                    maxTags={5}
                />
            </div>
            <div css={s_descriptionWrapper}>
                <FieldLabel label="상세 정보" description="자세한 모집 공고 내용을 입력해주세요" />
                <Editor.Root>
                    <Editor.Toolbar />
                    <Editor.Textarea
                        value={detailDescription}
                        onChange={onDetailDescriptionChange}
                    />
                </Editor.Root>
            </div>
            <div css={s_descriptionWrapper}>
                <FieldLabel
                    label="공고 이미지"
                    description="동아리 모집 관련 이미지를 첨부해주세요. (최대 5장까지 가능합니다)"
                />
                <FileUpLoader
                    sx={s_descriptionFileUploader}
                    files={recruitFiles}
                    onFilesChange={onFilesChange}
                    disabled={isFileUploading}
                >
                    <FileUpLoader.Button />
                    <FileUpLoader.HelperText>
                        PDF, 이미지 파일만 업로드 가능합니다(JPG, JPEG, PNG)
                    </FileUpLoader.HelperText>
                    <FileUpLoader.Box />
                </FileUpLoader>
            </div>
        </>
    );
}

export { DescriptionStepPage };
