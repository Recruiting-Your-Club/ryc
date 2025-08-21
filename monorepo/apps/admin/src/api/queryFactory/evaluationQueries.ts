import {
    getMyEvaluationStatus,
    postApplicationEvaluationSummary,
    postDetailApplicationEvaluation,
    postDetailInterviewEvaluation,
    postInterviewEvaluationSummary,
} from '@api/domain';
import type { EvaluationType } from '@api/domain/evaluation/types';
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
        type: EvaluationType;
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
        type: EvaluationType;
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
        announcementId,
        type,
    }: {
        clubId: string;
        announcementId: string;
        type: EvaluationType;
    }) =>
        queryOptions({
            queryKey: evaluationKeys.myEvaluationStatus(clubId, announcementId, type),
            queryFn: () => {
                const params = { clubId, announcementId, type };

                return getMyEvaluationStatus(params);
            },
        }),
};

export { evaluationQueries };
