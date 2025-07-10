import { httpRequest } from '../../common/httpRequest';
import type {
    Document,
    Evaluation,
    Interviewee,
    IntervieweeDetail,
    InterviewSchedule,
} from './types';

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

export {
    getAllInterviewSchedules,
    getAllInterviewees,
    getAllDocuments,
    getAllEvaluations,
    getIntervieweeDetail,
};
