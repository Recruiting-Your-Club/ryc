import { httpRequest } from '../../common/httpRequest';
import type { Evaluation, Interviewee, IntervieweeDetail, InterviewSchedule } from './types';

async function getAllInterviewSchedules(): Promise<InterviewSchedule[]> {
    const response = await httpRequest.get({
        url: `interviewschedules/all`,
    });
    return response as InterviewSchedule[];
}

async function getAllInterviewees(): Promise<Interviewee[]> {
    const response = await httpRequest.get({
        url: `interviewees/all`,
    });
    return response as Interviewee[];
}

async function getIntervieweeDetail(id: number): Promise<IntervieweeDetail> {
    const response = await httpRequest.get({
        url: `interviewees/${id}`,
    });
    return response as IntervieweeDetail;
}

async function getEvaluation(id: number): Promise<Evaluation> {
    const response = await httpRequest.get({
        url: `interviewer/${id}`,
    });
    return response as Evaluation;
}

export { getAllInterviewSchedules, getAllInterviewees, getEvaluation, getIntervieweeDetail };
