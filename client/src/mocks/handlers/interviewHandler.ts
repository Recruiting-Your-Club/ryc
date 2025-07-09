import type {
    Evaluation,
    IntervieweeInformation,
    InterviewSchedule,
} from '@api/domain/interview/types';
import { BASE_URL } from '@constants/api';
import { http, HttpResponse } from 'msw';
import evaluationList from '../data/interview/evaluationList.json';
import intervieweeList from '../data/interview/intervieweeList.json';
import interviewScheduleList from '../data/interview/interviewScheduleList.json';

const interviewHandler = [
    http.get(`${BASE_URL}interviewschedules/all`, () => {
        return HttpResponse.json(interviewScheduleList as InterviewSchedule[], { status: 200 });
    }),
    http.get(`${BASE_URL}interviewees/all`, () => {
        return HttpResponse.json(intervieweeList as IntervieweeInformation[], { status: 200 });
    }),
    http.get(`${BASE_URL}interviewer/all`, () => {
        return HttpResponse.json(evaluationList as Evaluation[], { status: 200 });
    }),
];

export { interviewHandler };
