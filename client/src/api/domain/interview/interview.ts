import { httpRequest } from '../../common/httpRequest';
import type { Document, Evaluation, IntervieweeInformation, InterviewSchedule } from './types';

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

async function getAllDocuments(): Promise<Document[]> {
    const response = await httpRequest.get({
        url: `documents/all`,
    });
    return response as Document[];
}

async function getAllEvaluations(): Promise<Evaluation[]> {
    const response = await httpRequest.get({
        url: `interviewer/all`,
    });
    return response as Evaluation[];
}

export { getAllInterviewSchedules, getAllInterviewees, getAllDocuments, getAllEvaluations };
