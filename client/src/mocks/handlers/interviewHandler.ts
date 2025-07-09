import { BASE_URL } from '@constants/api';
import type { IntervieweeInformation, InterviewSchedule } from '@api/domain/interview/types';
import { http, HttpResponse } from 'msw';
import intervieweeList from '../data/interview/intervieweeList.json';
import interviewScheduleList from '../data/interview/interviewScheduleList.json';

const interviewHandler = [
    http.get(`${BASE_URL}interviewschedules/all`, () => {
        return HttpResponse.json(interviewScheduleList as InterviewSchedule[], { status: 200 });
    }),
    http.get(`${BASE_URL}interviewees/all`, () => {
        return HttpResponse.json(intervieweeList as IntervieweeInformation[], { status: 200 });
    }),
];

export { interviewHandler };
