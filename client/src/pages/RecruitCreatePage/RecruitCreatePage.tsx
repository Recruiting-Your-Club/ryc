import { Button, Stepper } from '@components';
import { INITIALRECRUITSTEP, TOTALRECRUITSTEPS } from '@constants/step';
import { useStepper } from '@hooks/useStepper';
import React from 'react';

function RecruitCreatePage() {
    // prop destruction
    // lib hooks
    const { activeStep, next, prev, setActiveStep, isFirst, isLast } = useStepper(
        TOTALRECRUITSTEPS,
        INITIALRECRUITSTEP,
    );
    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    // handlers
    // effects

    return (
        <div>
            <Stepper activeStep={activeStep}>
                <Stepper.Step>
                    <Stepper.Label>Step1</Stepper.Label>
                </Stepper.Step>
                <Stepper.Step>
                    <Stepper.Label>Step2</Stepper.Label>
                </Stepper.Step>
                <Stepper.Step>
                    <Stepper.Label>Step3</Stepper.Label>
                </Stepper.Step>
                <Stepper.Step>
                    <Stepper.Label>Step4</Stepper.Label>
                </Stepper.Step>
            </Stepper>
            <div>
                <Button onClick={prev} disabled={isFirst}>
                    이전
                </Button>
                <Button onClick={next} disabled={isLast}>
                    다음
                </Button>
            </div>
        </div>
    );
}

export { RecruitCreatePage };
