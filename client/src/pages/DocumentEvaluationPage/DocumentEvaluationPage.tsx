import { applicantMutations } from '@api/mutationFactory/applicantMutations';
import { applicantQueries } from '@api/queryFactory';
import { ApplicantList, EvaluationBox, InformationBox } from '@components';
import { useSuspenseQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
    documentEvaluationPageContainer,
    evaluationContainer,
    informationContainer,
    listContainer,
} from './DocumentEvaluationPage.style';

function DocumentEvaluationPage() {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    const [selectedApplicantId, setSelectedApplicantId] = useState<number>(1);

    // form hooks
    // query hooks
    const { data: applicantList = [] } = useSuspenseQuery(applicantQueries.allApplicants());
    const { data: applicantDetail } = useSuspenseQuery(
        applicantQueries.getApplicantDetail(selectedApplicantId),
    );
    const { data: document } = useSuspenseQuery(applicantQueries.getDocument(selectedApplicantId));
    const { data: evaluation } = useSuspenseQuery(
        applicantQueries.getDocumentEvaluation(selectedApplicantId),
    );
    const { mutate: postComment } = applicantMutations.usePostDocumentEvaluation();
    const { mutate: deleteComment } = applicantMutations.useDeleteDocumentEvaluation();
    const { mutate: updateComment } = applicantMutations.useUpdateDocumentEvaluation();

    // calculated values
    // handlers
    // effects
    return (
        <div css={documentEvaluationPageContainer}>
            <div css={listContainer}>
                <ApplicantList
                    applicantList={applicantList}
                    selectedApplicantId={selectedApplicantId}
                    onSelectApplicantId={setSelectedApplicantId}
                />
            </div>
            <div css={informationContainer}>
                <InformationBox applicant={applicantDetail} document={document} />
            </div>
            <div css={evaluationContainer}>
                <EvaluationBox
                    evaluation={evaluation}
                    onPostComment={postComment}
                    onDeleteComment={deleteComment}
                    onUpdateComment={updateComment}
                />
            </div>
        </div>
    );
}

export { DocumentEvaluationPage };
