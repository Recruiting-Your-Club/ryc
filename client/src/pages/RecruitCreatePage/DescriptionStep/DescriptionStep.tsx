import { Input } from '@components';
import React from 'react';
import {
    s_descriptionAccent,
    s_descriptionFileUploader,
    s_descriptionHelpText,
    s_descriptionLabel,
    s_helpTextNoneInput,
    s_inputWrapper,
} from './DescriptionStep.style';
import { FileUpLoader } from '@components/FileUpLoader';

function DescriptionStepPage() {
    return (
        <div>
            <div css={s_inputWrapper}>
                <span css={s_descriptionLabel}>
                    공고 제목 <span css={s_descriptionAccent}>*</span>
                </span>
                <Input
                    placeholder="ex) En# 신입 부원 모집"
                    label="공고 제목을 작성해주세요"
                    labelSx={s_descriptionHelpText}
                />
            </div>
            <div css={s_inputWrapper}>
                <span css={s_descriptionLabel}>
                    모집 정원 <span css={s_descriptionAccent}>*</span>
                </span>
                <Input
                    placeholder="ex) 10명 / 미정"
                    label="동아리 신입 기수 모집 정원을 입력해주세요"
                    labelSx={s_descriptionHelpText}
                />
            </div>
            <div css={s_inputWrapper}>
                <span css={s_descriptionLabel}>
                    활동 기간 <span css={s_descriptionAccent}>*</span>
                </span>
                <Input
                    placeholder="ex) 1년 6개월"
                    label="동아리 신입 기수의 필수 활동 기간을 입력해주세요"
                    labelSx={s_descriptionHelpText}
                />
            </div>
            <div css={s_inputWrapper}>
                <span css={s_descriptionLabel}>
                    모집 분야 <span css={s_descriptionAccent}>*</span>
                </span>
                <Input
                    placeholder="ex) 디자이너 / FE / BE / 신입 부원 / 집행부원 등"
                    label="모집 직무 또는 역할을 입력해주세요"
                    labelSx={s_descriptionHelpText}
                />
            </div>
            <div css={s_inputWrapper}>
                <span css={s_descriptionLabel}>
                    모집 대상 <span css={s_descriptionAccent}>*</span>
                </span>
                <Input
                    placeholder="ex) 대학교 재학 / 휴학생"
                    label="모집 대상을 입력해주세요"
                    labelSx={s_descriptionHelpText}
                />
            </div>
            <div css={s_inputWrapper}>
                <span css={s_descriptionLabel}>
                    서류 접수 기간 <span css={s_descriptionAccent}>*</span>
                </span>
                <Input
                    placeholder="ex) 여기는 calendar 들어오기는 해야될듯?"
                    label="서류 접수 기간을 입력해주세요"
                    labelSx={s_descriptionHelpText}
                />
            </div>
            <div css={s_inputWrapper}>
                <span css={s_descriptionLabel}>
                    서류 합격 발표 <span css={s_descriptionAccent}>*</span>
                </span>
                <Input
                    placeholder="ex) 여기는 calendar 들어오기는 해야될듯?"
                    label="서류 합격 발표 일을 입력해주세요"
                    labelSx={s_descriptionHelpText}
                />
            </div>
            <div css={s_inputWrapper}>
                <span css={s_descriptionLabel}>
                    면접 일정 <span css={s_descriptionAccent}>*</span>
                </span>
                <Input
                    placeholder="ex) 여기는 calendar 들어오기는 해야될듯?"
                    label="면접 일정을 입력해주세요"
                    labelSx={s_descriptionHelpText}
                />
            </div>
            <div css={s_inputWrapper}>
                <span css={s_descriptionLabel}>
                    최종 합격 발표일 <span css={s_descriptionAccent}>*</span>
                </span>
                <Input
                    placeholder="ex) 여기는 calendar 들어오기는 해야될듯?"
                    label="최종 합격 발표일을 입력해주세요"
                    labelSx={s_descriptionHelpText}
                />
            </div>
            <div css={s_inputWrapper}>
                <span css={s_descriptionLabel}>
                    상세 정보 <span css={s_descriptionAccent}>*</span>
                </span>
                <span css={s_helpTextNoneInput}>자세한 모집 공고 내용을 입력해주세요</span>
                <span css={s_helpTextNoneInput}>여기는 텍스트 에디터</span>
            </div>
            <div css={s_inputWrapper}>
                <span css={s_descriptionLabel}>공고 이미지</span>
                <span css={s_helpTextNoneInput}>
                    동아리 모집 관련 이미지를 첨부해주세요. (최대 5장까지 가능합니다)
                </span>
                <FileUpLoader sx={s_descriptionFileUploader}>
                    <FileUpLoader.Button />
                    <FileUpLoader.HelperText>
                        이미지 파일만 업로드 가능합니다(JPG, JPEG, PNG)
                    </FileUpLoader.HelperText>
                    <FileUpLoader.Box />
                </FileUpLoader>
            </div>
        </div>
    );
}

export { DescriptionStepPage };
