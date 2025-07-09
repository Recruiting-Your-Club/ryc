import { interviewQueries } from '@api/queryFactory';
import { EvaluationBox, InformationBox, IntervieweeList } from '@components';
import { useSuspenseQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
    s_evaluationBoxWrapper,
    s_informationAndEvaluationContainer,
    s_informationBoxWrapper,
    s_interviewInformationPageContainer,
    s_selectionContainer,
} from './InterviewEvaluationPage.style';

function InterviewEvaluationPage() {
    const { data: intervieweelist = [] } = useSuspenseQuery(interviewQueries.allInterviewees());
    const { data: interviewSchedulelist = [] } = useSuspenseQuery(
        interviewQueries.allInterviewSchedules(),
    );
    const { data: documentlist = [] } = useSuspenseQuery(interviewQueries.allDocuments());
    const { data: evaluationlist = [] } = useSuspenseQuery(
        interviewQueries.allInterviewEvaluations(),
    );

    const [selectedApplicantId, setSelectedApplicantId] = useState<number | null>(1);
    const selectedEvaluation = evaluationlist.find(
        (evaluation) => evaluation.applicantId === selectedApplicantId,
    );

    return (
        <div css={s_interviewInformationPageContainer}>
            <div css={s_selectionContainer}>
                <IntervieweeList
                    intervieweeList={intervieweelist}
                    interviewSchedules={interviewSchedulelist}
                    selectedApplicantId={selectedApplicantId}
                    onSelectApplicant={setSelectedApplicantId}
                />
            </div>
            <div css={s_informationAndEvaluationContainer}>
                <div css={s_informationBoxWrapper}>
                    <InformationBox
                        applicant={
                            intervieweelist.find(
                                (applicant) => applicant.id === selectedApplicantId,
                            ) ?? null
                        }
                        documentList={
                            documentlist.find(
                                (document) => document.applicantId === selectedApplicantId,
                            ) ?? null
                        }
                    />
                </div>
                <div css={s_evaluationBoxWrapper}>
                    <EvaluationBox evaluation={selectedEvaluation ?? null} />
                </div>
            </div>
        </div>
    );
}

export { InterviewEvaluationPage };
