import {
    postApplicationEvaluationSummary,
    postDetailApplicationEvaluation,
    postDetailInterviewEvaluation,
    postInterviewEvaluationSummary,
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
        type: 'document' | 'interview';
    }) =>
        queryOptions({
            queryKey: evaluationKeys.evaluationSummary(clubId, applicantIdList, type),
            queryFn: () => {
                const params = { clubId, applicantIdList: applicantIdList };

                return type === 'document'
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
        type: 'document' | 'interview';
    }) =>
        queryOptions({
            queryKey: evaluationKeys.evaluationSummary(clubId, applicantIdList, type),
            queryFn: () => {
                const params = { clubId, applicantIdList: applicantIdList };

                return type === 'document'
                    ? postDetailApplicationEvaluation(params)
                    : postDetailInterviewEvaluation(params);
            },
        }),
};

export { evaluationQueries };
