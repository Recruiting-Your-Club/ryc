import { Button, Checkbox, Select, Toggle } from '@components';
import { FieldLabel } from '@components/FieldLabel';
import React, { useState } from 'react';
import {
    s_additionalInfoWrapper,
    s_checkboxLabel,
    s_checkboxWrapper,
    s_noticeBox,
    s_questionCard,
    s_questionHeader,
    s_questionSection,
    s_removeQuestion,
    s_selectContainer,
    s_selectToggleContainer,
    s_textHighlight,
    s_toggleContainer,
    s_toggleLabel,
} from './BasicInfoStep.style';
import { useQuestion } from '@hooks/useQuestion';
import { questionTypes } from '@constants/questionType';
import { QuestionForm } from '@components/QuestionForm';
import type { QuestionType } from '@components/QuestionForm/type';
import type { BasicInfoStepProps, InfoFieldGroupProps } from './type';
import type { BasicInfoFields } from '../type';

function InfoFieldGroup({ infoFields, setInfoFields }: InfoFieldGroupProps) {
    //handler
    const handleChange = (key: keyof BasicInfoFields) => {
        setInfoFields((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };
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
                <Checkbox.Root
                    isChecked={infoFields.studentId}
                    onChange={() => handleChange('studentId')}
                >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label sx={s_checkboxLabel}>학번</Checkbox.Label>
                </Checkbox.Root>
                <Checkbox.Root isChecked={infoFields.phone} onChange={() => handleChange('phone')}>
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label sx={s_checkboxLabel}>전화번호</Checkbox.Label>
                </Checkbox.Root>
                <Checkbox.Root isChecked={infoFields.photo} onChange={() => handleChange('photo')}>
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label sx={s_checkboxLabel}>본인 사진</Checkbox.Label>
                </Checkbox.Root>
            </div>
        </div>
    );
}

function BasicInfoStep({
    infoFields,
    setInfoFields,
    questions,
    addQuestion,
    removeQuestion,
    updateQuestion,
    handleQuestionTypeChange,
}: BasicInfoStepProps) {
    return (
        <div>
            <InfoFieldGroup infoFields={infoFields} setInfoFields={setInfoFields} />
            <div css={s_additionalInfoWrapper}>
                <FieldLabel
                    label="추가 정보"
                    description="지원자에게 입력 받을 추가적인 사전 질문이 있다면 작성해주세요"
                />
            </div>
            <div css={s_questionSection}>
                {questions.map((q) => (
                    <div key={q.id} css={s_questionCard}>
                        <div css={s_questionHeader}>
                            <Select
                                value={q.type}
                                onValueChange={(value) =>
                                    handleQuestionTypeChange(q.id, value as QuestionType)
                                }
                                sx={s_selectContainer}
                            >
                                <Select.Trigger>
                                    <Select.Value placeholder="문제 유형 선택" />
                                </Select.Trigger>
                                <Select.Content>
                                    {questionTypes.map(({ value, label }) => (
                                        <Select.Item key={value} value={value}>
                                            {label}
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select>

                            <div css={s_selectToggleContainer}>
                                <div css={s_toggleContainer}>
                                    <div css={s_toggleLabel}>필수</div>
                                    <Toggle
                                        width="4.5rem"
                                        isChecked={q.required}
                                        onChange={() =>
                                            updateQuestion(q.id, { required: !q.required })
                                        }
                                    />
                                </div>
                                <Button
                                    onClick={() => removeQuestion(q.id)}
                                    sx={s_removeQuestion}
                                    size="lg"
                                >
                                    x
                                </Button>
                            </div>
                        </div>
                        <div>
                            <QuestionForm question={q} updateQuestion={updateQuestion} />
                        </div>
                    </div>
                ))}
                <Button onClick={addQuestion} size="full">
                    + 질문 추가하기
                </Button>
            </div>
        </div>
    );
}

export { BasicInfoStep };
