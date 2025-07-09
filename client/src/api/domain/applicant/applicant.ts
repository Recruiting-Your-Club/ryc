import { httpRequest } from '../../common/httpRequest';
import type { IntervieweeInformation, InterviewSchedule } from './types';

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

export { getAllInterviewSchedules, getAllInterviewees };
