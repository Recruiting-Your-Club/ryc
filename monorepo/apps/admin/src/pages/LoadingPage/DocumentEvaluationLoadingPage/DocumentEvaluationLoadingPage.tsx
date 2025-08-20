import React from 'react';

import {
    s_applicantListSkeleton,
    s_documentEvaluationPageContainer,
    s_evaluationBoxSkeleton,
    s_evaluationContainer,
    s_informationBoxSkeleton,
    s_informationContainer,
    s_listContainer,
} from './DocumentEvaluationLoadingPage.style';

function DocumentEvaluationLoadingPage() {
    return (
        <div css={s_documentEvaluationPageContainer}>
            <div css={s_listContainer}>
                <div css={s_applicantListSkeleton} />
            </div>
            <div css={s_informationContainer}>
                <div css={s_informationBoxSkeleton} />
            </div>
            <div css={s_evaluationContainer}>
                <div css={s_evaluationBoxSkeleton} />
            </div>
        </div>
    );
}

export { DocumentEvaluationLoadingPage };
