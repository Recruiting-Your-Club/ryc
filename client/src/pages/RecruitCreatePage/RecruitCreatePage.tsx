import { Button, Stepper } from '@components';
import { INITIALRECRUITSTEP, TOTALRECRUITSTEPS } from '@constants/step';
import { useStepper } from '@hooks/useStepper';
import React from 'react';
import {
    s_recruitCreatePageContainer,
    s_stepButtonContainer,
    s_stepComponent,
    s_stepWrapper,
} from './RecruitCreatePage.style';
import { DescriptionStepPage } from './DescriptionStep/DescriptionStep';

function RecruitCreatePage() {
    // prop destruction
    // lib hooks
    const { activeStep, next, prev, isFirst, isLast } = useStepper(
        TOTALRECRUITSTEPS,
        INITIALRECRUITSTEP,
    );
    // initial values

    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    const stepComponent = (step: number) => {
        switch (step) {
            case 0:
                return <DescriptionStepPage />;
            case 1:
                return <div>사전 질문 설정</div>;
            case 2:
                return <div>자기소개서 설정</div>;
            case 3:
                return <div>미리보기</div>;
            default:
                <div>error</div>;
        }
    };
    // handlers
    // effects

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
