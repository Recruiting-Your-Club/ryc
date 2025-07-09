import { httpRequest } from '../../common/httpRequest';
import type { IntervieweeInformation } from './types';

async function getAllInterviewees(): Promise<IntervieweeInformation[]> {
    const response = await httpRequest.get({
        url: `interviewees/all`,
    });
    return response as IntervieweeInformation[];
}

export { getAllInterviewees };
