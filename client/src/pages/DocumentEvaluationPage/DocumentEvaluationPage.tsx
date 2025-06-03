import { ApplicantList, ApplicantMiniCard } from '@components';
import React from 'react';
import {
    documentEvaluationPageContainer,
    evaluationContainer,
    informationContainer,
    listContainer,
    miniCardGroup,
} from './DocumentEvaluation.style';

function DocumentEvaluationPage() {
    return (
        <div css={documentEvaluationPageContainer}>
            <div css={listContainer}>
                <ApplicantList>
                    <div css={miniCardGroup}>
                        <ApplicantMiniCard />
                        <ApplicantMiniCard />
                        <ApplicantMiniCard />
                        <ApplicantMiniCard />
                        <ApplicantMiniCard />
                        <ApplicantMiniCard />
                        <ApplicantMiniCard />
                    </div>
                </ApplicantList>
            </div>
            <div css={informationContainer}></div>
            <div css={evaluationContainer}></div>
        </div>
    );
}

export { DocumentEvaluationPage };
