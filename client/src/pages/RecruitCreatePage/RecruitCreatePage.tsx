import { Button, Stepper } from '@components';
import { INITIALRECRUITSTEP, TOTALRECRUITSTEPS } from '@constants/step';
import { useStepper } from '@hooks/useStepper';
import React, { useState } from 'react';
import {
    s_recruitCreatePageContainer,
    s_stepButtonContainer,
    s_stepComponent,
    s_stepWrapper,
} from './RecruitCreatePage.style';
import { DescriptionStepPage } from './DescriptionStep/DescriptionStep';
import { BasicInfoStep } from './BasicInfoStep/BasicInfoStep';
import { PersonalStatementStep } from './PersonalStatementStep/PersonalStatementStep';
import type { BasicInfoFields, RecruitDetailInfo } from './types';
import { useQuestion } from '@hooks/useQuestion';

function RecruitCreatePage() {
    // prop destruction
    // lib hooks
    const { activeStep, next, prev, isFirst, isLast } = useStepper(
        TOTALRECRUITSTEPS,
        INITIALRECRUITSTEP,
    );

    const {
        questions,
        addQuestion,
        removeQuestion,
        updateQuestion,
        handleQuestionTypeChange,
        applicationQuestions,
        addApplicationQuestion,
        removeApplicationQuestion,
        updateApplicationQuestion,
    } = useQuestion();
    // initial values

    // state, ref, querystring hooks

    //공고 정보 상태 관리
    const [recruitDetailInfo, setRecruitDetailInfo] = useState<RecruitDetailInfo>({
        recruitmentSubject: '',
        recruitmentNumber: '',
        activityPeriod: '',
        recruitmentField: '',
        recruitmentTarget: '',
        documentPeriod: '',
        documentResult: '',
        interviewSchedule: '',
        finalResult: '',
    });

    //체크박스를 통한 신원 정보 상태관리
    const [basicInfoFields, setBasicInfoFields] = useState<BasicInfoFields>({
        studentId: false,
        phone: false,
        photo: false,
    });

    // form hooks
    // query hooks
    // calculated values
    // handlers
    const handleInputChange = (updateFields: Partial<RecruitDetailInfo>) => {
        setRecruitDetailInfo((prev) => ({
            ...prev,
            ...updateFields,
        }));
    };

    // effects

    const stepComponent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <DescriptionStepPage
                        recruitDetailInfo={recruitDetailInfo}
                        onChange={handleInputChange}
                    />
                );
            case 1:
                return (
                    <BasicInfoStep
                        infoFields={basicInfoFields}
                        setInfoFields={setBasicInfoFields}
                        questions={questions}
                        addQuestion={addQuestion}
                        removeQuestion={removeQuestion}
                        updateQuestion={updateQuestion}
                        handleQuestionTypeChange={handleQuestionTypeChange}
                    />
                );
            case 2:
                return (
                    <PersonalStatementStep
                        applicationQuestions={applicationQuestions}
                        addApplicationQuestion={addApplicationQuestion}
                        removeApplicationQuestion={removeApplicationQuestion}
                        updateApplicationQuestion={updateApplicationQuestion}
                    />
                );
            case 3:
                return <div>미리보기</div>;
            default:
                <div>error</div>;
        }
    };

    return (
        <div css={s_recruitCreatePageContainer}>
            <div css={s_stepWrapper}>
                <Stepper activeStep={activeStep}>
                    <Stepper.Step>
                        <Stepper.Label>공고 상세 정보 작성</Stepper.Label>
                    </Stepper.Step>
                    <Stepper.Step>
                        <Stepper.Label>사전 질문 설정</Stepper.Label>
                    </Stepper.Step>
                    <Stepper.Step>
                        <Stepper.Label>자기소개서 설정</Stepper.Label>
                    </Stepper.Step>
                    <Stepper.Step>
                        <Stepper.Label>미리보기</Stepper.Label>
                    </Stepper.Step>
                </Stepper>
                <div css={s_stepComponent}>{stepComponent(activeStep)}</div>
                <div css={s_stepButtonContainer}>
                    <Button onClick={prev} disabled={isFirst}>
                        이전
                    </Button>
                    <Button onClick={next}>{isLast ? '완료' : '다음'}</Button>
                </div>
            </div>
        </div>
    );
}

export { RecruitCreatePage };
