import { httpRequest } from '../../common/httpRequest';
import type { Evaluation, IntervieweeInformation, InterviewSchedule } from './types';

async function getAllInterviewSchedules(): Promise<InterviewSchedule[]> {
    const response = await httpRequest.get({
        url: `interviewschedules/all`,
    });
    return response as InterviewSchedule[];
}

async function getAllInterviewees(): Promise<IntervieweeInformation[]> {
    const response = await httpRequest.get({
        url: `interviewees/all`,
    });
    return response as IntervieweeInformation[];
}

async function getAllEvaluations(): Promise<Evaluation[]> {
    const response = await httpRequest.get({
        url: `interviewer/all`,
    });
    return response as Evaluation[];
}

export { getAllInterviewSchedules, getAllInterviewees, getAllEvaluations };
