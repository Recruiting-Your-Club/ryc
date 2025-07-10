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

function InterviewEvaluationPage() {
    const [selectedApplicantId, setSelectedApplicantId] = useState<number>(1);
    const { data: intervieweelist = [] } = useSuspenseQuery(interviewQueries.allInterviewees());
    const { data: interviewSchedulelist = [] } = useSuspenseQuery(
        interviewQueries.allInterviewSchedules(),
    );
    const { data: documentlist = [] } = useSuspenseQuery(interviewQueries.allDocuments());
    const { data: evaluationlist = [] } = useSuspenseQuery(
        interviewQueries.allInterviewEvaluations(),
    );
    const selectedEvaluation = evaluationlist.find(
        (evaluation) => evaluation.applicantId === selectedApplicantId,
    );
    const { data: intervieweeDetail } = useSuspenseQuery(
        interviewQueries.getIntervieweeDetail(selectedApplicantId),
    );

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
                    <InformationBox
                        applicant={intervieweeDetail}
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
