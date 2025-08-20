import { DatePicker } from '@components';
import { FieldLabel } from '@components/FieldLabel/FieldLabel';
import { TagInput } from '@components/TagInput';
import { DETAIL_QUESTION_LIST } from '@constants/descriptionStep';
import React from 'react';

import { Editor, Input } from '@ssoc/ui';
import { FileUpLoader } from '@ssoc/ui';

import type { Period, RecruitDetailInfo } from '../types';
import {
    s_customFieldLabel,
    s_descriptionFileUploader,
    s_descriptionWrapper,
    s_form,
    s_formGroup,
} from './DescriptionStep.style';
import type { DescriptionProps, DetailQuestionList } from './types';

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
    onFileChange,
}: DescriptionProps) {
    return (
        <>
            <div css={s_descriptionWrapper}>
                <FieldLabel label="공고 제목" description="공고 제목을 작성해주세요" required />
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
                    <Editor.Textarea />
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
                    onFilesChange={onFileChange}
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
