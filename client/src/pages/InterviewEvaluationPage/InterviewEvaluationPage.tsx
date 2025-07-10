import { interviewQueries } from '@api/queryFactory';
import { EvaluationBox, InformationBox, IntervieweeList } from '@components';
import { useSuspenseQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import {
    s_evaluationBoxWrapper,
    s_informationAndEvaluationContainer,
    s_informationBoxWrapper,
    s_interviewInformationPageContainer,
    s_selectionContainer,
} from './InterviewEvaluationPage.style';
import { getInitialId } from './utils/getInitialId';

function InterviewEvaluationPage() {
    // prop destruction
    // lib hooks
    // initial values
    const { data: intervieweelist = [] } = useSuspenseQuery(interviewQueries.allInterviewees());
    const initialId = getInitialId(intervieweelist);

    // state, ref, querystring hooks
    const [selectedApplicantId, setSelectedApplicantId] = useState<number>(initialId ?? 1);

    // form hooks
    // query hooks
    const { data: interviewSchedulelist = [] } = useSuspenseQuery(
        interviewQueries.allInterviewSchedules(),
    );
    const { data: intervieweeDetail } = useSuspenseQuery(
        interviewQueries.getIntervieweeDetail(selectedApplicantId),
    );
    const { data: document } = useSuspenseQuery(interviewQueries.getDocument(selectedApplicantId));
    const { data: evaluation } = useSuspenseQuery(
        interviewQueries.getInterviewEvaluation(selectedApplicantId),
    );

    // calculated values
    const flatScheduleList = useMemo(
        () =>
            interviewSchedulelist.flatMap((schedule) =>
                schedule.interviewSets.map((set) => ({
                    ...set,
                    date: schedule.date,
                })),
            ),
        [interviewSchedulelist],
    );

    const finalIntervieweList = useMemo(
        () =>
            intervieweelist.map((interviewee) => {
                const matchedSet = flatScheduleList.find(
                    (schedule) => schedule.id === interviewee.interviewSetId,
                );
                return {
                    ...interviewee,
                    interviewDate: matchedSet?.date,
                    interviewName: matchedSet?.name,
                    startTime: matchedSet?.startTime,
                    endTime: matchedSet?.endTime,
                };
            }),
        [],
    );

    // handlers
    // effects

    return (
        <div css={s_interviewInformationPageContainer}>
            <div css={s_selectionContainer}>
                <IntervieweeList
                    intervieweeList={finalIntervieweList}
                    interviewSchedules={interviewSchedulelist}
                    selectedApplicantId={selectedApplicantId}
                    onSelectApplicant={setSelectedApplicantId}
                />
            </div>
            <div css={s_informationAndEvaluationContainer}>
                <div css={s_informationBoxWrapper}>
                    <InformationBox applicant={intervieweeDetail} documentList={document} />
                </div>
                <div css={s_evaluationBoxWrapper}>
                    <EvaluationBox evaluation={evaluation} />
                </div>
            </div>
        </div>
    );
}

export { InterviewEvaluationPage };
