import { FieldLabel } from '@components/FieldLabel/FieldLabel';
import { DETAIL_QUESTION_LIST } from '@constants/descriptionStep';
import React from 'react';

import { Editor, Input } from '@ssoc/ui';
import { FileUpLoader } from '@ssoc/ui';

import {
    s_customFieldLabel,
    s_descriptionFileUploader,
    s_descriptionWrapper,
    s_form,
    s_formGroup,
} from './DescriptionStep.style';
import type { DescriptionProps, DetailQuestionList } from './types';

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
                {DETAIL_QUESTION_LIST.map(({ label, key, placeholder, required }) => (
                    <div css={s_formGroup} key={key}>
                        <FieldLabel label={label} required={required} sx={s_customFieldLabel} />
                        <Input
                            placeholder={placeholder}
                            value={recruitDetailInfo[key]}
                            onChange={(e) => onChange({ [key]: e.target.value })}
                        />
                    </div>
                ))}
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
