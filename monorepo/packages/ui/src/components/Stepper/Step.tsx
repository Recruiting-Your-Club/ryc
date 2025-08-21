import React, { useMemo } from 'react';

import { StepContext } from './StepContext';
import { s_step } from './Stepper.style';
import { useStepperContext } from './StepperContext';
import type { StepProps } from './types';

function Step({
    active: activeProp,
    children,
    component: Component = 'div',
    completed: completedProp,
    disabled: disabledProp,
    index = 0,
    last = false,
    sx,
}: StepProps) {
    //prop destruction

    //lib hooks
    const { activeStep, connector, alternativeLabel, orientation } = useStepperContext();

    //state, ref, querystring hooks

    //form hooks

    //query hooks

    //calculated values
    const active = activeProp ?? activeStep === index;
    const completed = completedProp ?? activeStep > index;
    const disabled = disabledProp ?? activeStep < index;

    const contextValue = useMemo(
        () => ({ index, last, icon: index + 1, active, completed, disabled }),
        [index, last, active, completed, disabled],
    );

    //NOTE: alternativeLabel 시 StepConnector가 s_step 컴포넌트 내부에서 렌더링 되도록 설정 (레이아웃 설정 이슈)
    const newChildren = (
        <Component css={[s_step(orientation, alternativeLabel), sx]}>
            {connector && alternativeLabel && index !== 0 ? connector : null}
            {children}
        </Component>
    );

    //effects

    //handler

    return (
        <StepContext.Provider value={contextValue}>
            {connector && !alternativeLabel && index !== 0 ? ( //NOTE: alternativeLabel false -> s_step 외부에서 렌더링
                <>
                    {connector}
                    {newChildren}
                </>
            ) : (
                newChildren
            )}
        </StepContext.Provider>
    );
}

export { Step };
