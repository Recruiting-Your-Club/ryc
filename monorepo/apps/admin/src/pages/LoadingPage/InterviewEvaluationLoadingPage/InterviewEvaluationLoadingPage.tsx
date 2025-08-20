import React from 'react';

import {
    s_evaluationBoxSkeleton,
    s_evaluationBoxWrapper,
    s_informationAndEvaluationContainer,
    s_informationBoxSkeleton,
    s_informationBoxWrapper,
    s_intervieweeListSkeleton,
    s_interviewInformationPageContainer,
    s_selectionContainer,
} from './InterviewEvaluationLoadingPage.style';

function InterviewEvaluationLoadingPage() {
    return (
        <div css={s_interviewInformationPageContainer}>
            <div css={s_selectionContainer}>
                <div css={s_intervieweeListSkeleton} />
            </div>
            <div css={s_informationAndEvaluationContainer}>
                <div css={s_informationBoxWrapper}>
                    <div css={s_informationBoxSkeleton} />
                </div>
                <div css={s_evaluationBoxWrapper}>
                    <div css={s_evaluationBoxSkeleton} />
                </div>
            </div>
        </div>
    );
}

export { InterviewEvaluationLoadingPage };
