import { BASE_URL } from '@constants/api';
import type { IntervieweeInformation } from 'api/domain/applicant/types';
import { http, HttpResponse } from 'msw';
import intervieweeList from '../data/applicant/intervieweeList.json';

const applicantHandler = [
    http.get(`${BASE_URL}interviewees/all`, () => {
        return HttpResponse.json(intervieweeList as IntervieweeInformation[], { status: 200 });
    }),
];

export { applicantHandler };
