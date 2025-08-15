import {
    postApplicationEvaluationSummary,
    postDetailApplicationEvaluation,
    postDetailInterviewEvaluation,
    postInterviewEvaluationSummary,
    postMyEvaluationStatus,
} from '@api/domain';
import { evaluationKeys } from '@api/querykeyFactory';
import { queryOptions } from '@tanstack/react-query';

const evaluationQueries = {
    evaluationSummary: ({
        clubId,
        applicantIdList,
        type,
    }: {
        clubId: string;
        applicantIdList: string[];
        type: 'application' | 'interview';
    }) =>
        queryOptions({
            queryKey: evaluationKeys.evaluationSummary(clubId, applicantIdList, type),
            queryFn: () => {
                const params = { clubId, applicantIdList: applicantIdList };

                return type === 'application'
                    ? postApplicationEvaluationSummary(params)
                    : postInterviewEvaluationSummary(params);
            },
        }),
    evaluationDetail: ({
        clubId,
        applicantIdList,
        type,
    }: {
        clubId: string;
        applicantIdList: string[];
        type: 'application' | 'interview';
    }) =>
        queryOptions({
            queryKey: evaluationKeys.evaluationDetail(clubId, applicantIdList, type),
            queryFn: () => {
                const params = { clubId, applicantIdList: applicantIdList };

                return type === 'application'
                    ? postDetailApplicationEvaluation(params)
                    : postDetailInterviewEvaluation(params);
            },
        }),
    myEvaluationStatus: ({
        clubId,
        applicantIdList,
        type,
    }: {
        clubId: string;
        applicantIdList: string[];
        type: 'application' | 'interview';
    }) =>
        queryOptions({
            queryKey: evaluationKeys.myEvaluationStatus(clubId, applicantIdList, type),
            queryFn: () => {
                const params = { clubId, applicantIdList, type };

                return postMyEvaluationStatus(params);
            },
        }),
};

export { evaluationQueries };
