import { Input } from '@components';
import React from 'react';
import {
    s_descriptionAccent,
    s_descriptionHelpText,
    s_descriptionLabel,
    s_inputWrapper,
} from './DescriptionStep.style';

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
        </div>
    );
}

export { DescriptionStepPage };
