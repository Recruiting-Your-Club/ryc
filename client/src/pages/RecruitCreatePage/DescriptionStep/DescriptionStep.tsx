import { Input } from '@components';
import React from 'react';
import {
    s_customFieldLabel,
    s_descriptionFileUploader,
    s_descriptionWrapper,
    s_form,
    s_formGroup,
} from './DescriptionStep.style';
import { FileUpLoader } from '@components/FileUpLoader';
import { FieldLabel } from '@components/FieldLabel/FieldLabel';
import type { DescriptionProps } from './types';

function DescriptionStepPage({ recruitDetailInfo, onChange }: DescriptionProps) {
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
            <FieldLabel
                label="공고 세부 정보"
                description="형식에 맞게 공고 세부 정보를 기입해주세요"
            />
            <div css={s_form}>
                <div css={s_formGroup}>
                    <FieldLabel label="모집 정원" required sx={s_customFieldLabel} />
                    <Input
                        placeholder="ex) 10명 / 미정"
                        value={recruitDetailInfo.recruitmentNumber}
                        onChange={(e) => onChange({ recruitmentNumber: e.target.value })}
                    />
                </div>
                <div css={s_formGroup}>
                    <FieldLabel label="서류 접수 기간" required sx={s_customFieldLabel} />
                    <Input
                        placeholder="ex) 2025.03.31 ~ 2025.04.14"
                        value={recruitDetailInfo.documentPeriod}
                        onChange={(e) => onChange({ documentPeriod: e.target.value })}
                    />
                </div>

                <div css={s_formGroup}>
                    <FieldLabel label="모집 분야" required sx={s_customFieldLabel} />
                    <Input
                        placeholder="ex) 디자이너 / FE / BE /신입 부원 / 집행 부원 등"
                        value={recruitDetailInfo.recruitmentField}
                        onChange={(e) => onChange({ recruitmentField: e.target.value })}
                    />
                </div>
                <div css={s_formGroup}>
                    <FieldLabel label="서류 합격 발표" required sx={s_customFieldLabel} />
                    <Input
                        placeholder="ex) 2025.04.17"
                        value={recruitDetailInfo.documentResult}
                        onChange={(e) => onChange({ documentResult: e.target.value })}
                    />
                </div>

                <div css={s_formGroup}>
                    <FieldLabel label="활동 기간" required sx={s_customFieldLabel} />
                    <Input
                        placeholder="ex) 1년 6개월"
                        value={recruitDetailInfo.activityPeriod}
                        onChange={(e) => onChange({ activityPeriod: e.target.value })}
                    />
                </div>
                <div css={s_formGroup}>
                    <FieldLabel label="면접 일정" required sx={s_customFieldLabel} />
                    <Input
                        placeholder="ex) 2025.04.19 ~ 2025.04.22"
                        value={recruitDetailInfo.interviewSchedule}
                        onChange={(e) => onChange({ interviewSchedule: e.target.value })}
                    />
                </div>

                <div css={s_formGroup}>
                    <FieldLabel label="모집 대상" required sx={s_customFieldLabel} />
                    <Input
                        placeholder="ex) 세종대 재학생 / 휴학생 등"
                        value={recruitDetailInfo.recruitmentTarget}
                        onChange={(e) => onChange({ recruitmentTarget: e.target.value })}
                    />
                </div>
                <div css={s_formGroup}>
                    <FieldLabel label="최종 합격 발표" required sx={s_customFieldLabel} />
                    <Input
                        placeholder="ex) 2025.04.28"
                        value={recruitDetailInfo.finalResult}
                        onChange={(e) => onChange({ finalResult: e.target.value })}
                    />
                </div>
            </div>
            <div css={s_descriptionWrapper}>
                <FieldLabel
                    label="상세 정보"
                    description="자세한 모집 공고 내용을 입력해주세요"
                    required
                />
                <span>여기는 텍스트 에디터</span>
            </div>
            <div css={s_descriptionWrapper}>
                <FieldLabel
                    label="공고 이미지"
                    description="동아리 모집 관련 이미지를 첨부해주세요. (최대 5장까지 가능합니다)"
                />
                <FileUpLoader sx={s_descriptionFileUploader}>
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
