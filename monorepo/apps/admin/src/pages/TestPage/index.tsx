import { useState } from 'react';

import { Button, Stepper } from '@ssoc/ui';

function TestPage() {
    const [activeStep, setActiveStep] = useState(0);
    return (
        <div style={{ width: '800px' }}>
            <Stepper activeStep={activeStep}>
                <Stepper.Step>
                    <Stepper.Label>Step 1</Stepper.Label>
                </Stepper.Step>
                <Stepper.Step>
                    <Stepper.Label>Step 2</Stepper.Label>
                </Stepper.Step>
                <Stepper.Step>
                    <Stepper.Label>Step 3</Stepper.Label>
                </Stepper.Step>
                <Stepper.Step>
                    <Stepper.Label>Step 4</Stepper.Label>
                </Stepper.Step>
                <Stepper.Step>
                    <Stepper.Label>Step 5</Stepper.Label>
                </Stepper.Step>
            </Stepper>
            <div
                style={{
                    display: 'flex',
                    marginTop: '2rem',
                    textAlign: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Button
                    variant="primary"
                    size="s"
                    onClick={() => setActiveStep((prev) => Math.max(prev - 1, 0))}
                >
                    이전
                </Button>
                <Button
                    variant="primary"
                    size="s"
                    onClick={() => setActiveStep((prev) => Math.min(prev + 1, 4))}
                >
                    다음
                </Button>
            </div>
        </div>
    );
}
export { TestPage };
