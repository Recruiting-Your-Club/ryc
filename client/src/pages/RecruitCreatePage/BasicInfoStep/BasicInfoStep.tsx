import { Checkbox } from '@components';
import { FieldLabel } from '@components/FieldLabel';
import React from 'react';
import {
    s_additionalInfoWrapper,
    s_checkboxLabel,
    s_checkboxWrapper,
    s_noticeBox,
    s_textHighlight,
} from './BasicInfoStep.style';

function InfoFieldGroup() {
    return (
        <div>
            <FieldLabel
                label="인적사항"
                description="지원자에게 입력 받을 인적사항 항목을 선택해주세요."
                required
            />
            <div css={s_noticeBox}>
                지원자의 <span css={s_textHighlight}>이름</span>과{' '}
                <span css={s_textHighlight}>이메일 주소</span>는 필수 입력 사항입니다.
            </div>
            <div css={s_checkboxWrapper}>
                <div>
                    <Checkbox.Root>
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label sx={s_checkboxLabel}>학번</Checkbox.Label>
                    </Checkbox.Root>
                </div>
                <div>
                    <Checkbox.Root>
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label sx={s_checkboxLabel}>전화번호</Checkbox.Label>
                    </Checkbox.Root>
                </div>
                <div>
                    <Checkbox.Root>
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label sx={s_checkboxLabel}>본인 사진</Checkbox.Label>
                    </Checkbox.Root>
                </div>
            </div>
        </div>
    );
}

function AdditionalInfo() {
    return (
        <div css={s_additionalInfoWrapper}>
            <FieldLabel
                label="추가 정보"
                description="지원자에게 입력 받을 추가적인 사전 질문이 있다면 작성해주세요"
            />
            <div></div>
        </div>
    );
}

function BasicInfoStep() {
    return (
        <div>
            <InfoFieldGroup />
            <AdditionalInfo />
        </div>
    );
}

export { BasicInfoStep };
