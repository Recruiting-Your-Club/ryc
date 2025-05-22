import { Input } from '@components';
import React from 'react';
import { s_descriptionFileUploader, s_descriptionWrapper } from './DescriptionStep.style';
import { FileUpLoader } from '@components/FileUpLoader';
import { FieldLabel } from '@components/FieldLabel/Fieldlabel';

function DescriptionStepPage() {
    return (
        <div>
            <div css={s_descriptionWrapper}>
                <FieldLabel label="공고 제목" description="공고 제목을 작성해주세요" required />
                <Input placeholder="ex) En# 신입 부원 모집" />
            </div>
            <div css={s_descriptionWrapper}>
                <FieldLabel
                    label="모집 정원"
                    description="동아리 신입 기수 모집 정원을 입력해주세요"
                    required
                />
                <Input placeholder="ex) 10명 / 미정" />
            </div>
            <div css={s_descriptionWrapper}>
                <FieldLabel
                    label="활동 기간"
                    description="동아리 신입 기수의 필수 활동 기간을 입력해주세요"
                    required
                />
                <Input placeholder="ex) 1년 6개월" />
            </div>
            <div css={s_descriptionWrapper}>
                <FieldLabel
                    label="모집 분야"
                    description="모집 직무 또는 역할을 입력해주세요"
                    required
                />
                <Input placeholder="ex) 디자이너 / FE / BE / 신입 부원 / 집행부원 등" />
            </div>
            <div css={s_descriptionWrapper}>
                <FieldLabel label="모집 대상" description="모집 대상을 입력해주세요" required />
                <Input placeholder="ex) 대학교 재학 / 휴학생" />
            </div>
            <div css={s_descriptionWrapper}>
                <FieldLabel
                    label="서류 접수 기간"
                    description="서류 접수 기간을 입력해주세요"
                    required
                />
                <Input placeholder="ex) 여기는 calendar 들어오기는 해야될듯?" />
            </div>
            <div css={s_descriptionWrapper}>
                <FieldLabel
                    label="서류 합격 발표일"
                    description="서류 합격 발표 일을 입력해주세요"
                    required
                />
                <Input placeholder="ex) 여기는 calendar 들어오기는 해야될듯?" />
            </div>
            <div css={s_descriptionWrapper}>
                <FieldLabel label="면접 일정" description="면접 일정을 입력해주세요" required />
                <Input placeholder="ex) 여기는 calendar 들어오기는 해야될듯?" />
            </div>
            <div css={s_descriptionWrapper}>
                <FieldLabel
                    label="최종 합격 발표일"
                    description="최종 합격 발표 일을 입력해주세요"
                    required
                />
                <Input placeholder="ex) 여기는 calendar 들어오기는 해야될듯?" />
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
        </div>
    );
}

export { DescriptionStepPage };
