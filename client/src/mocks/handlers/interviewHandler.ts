import type {
    Document,
    Evaluation,
    Interviewee,
    IntervieweeDetail,
    InterviewSchedule,
} from '@api/domain/interview/types';
import { BASE_URL } from '@constants/api';
import { http, HttpResponse } from 'msw';
import documentList from '../data/interview/documentList.json';
import evaluationList from '../data/interview/evaluationList.json';
import intervieweeList from '../data/interview/intervieweeList.json';
import interviewScheduleList from '../data/interview/interviewScheduleList.json';
import intervieweeDetailList from '../data/interview/intervieweeDetailList.json';

const interviewHandler = [
    http.get(`${BASE_URL}interviewschedules/all`, () => {
        return HttpResponse.json(interviewScheduleList as InterviewSchedule[], { status: 200 });
    }),
    http.get(`${BASE_URL}interviewees/all`, () => {
        return HttpResponse.json(intervieweeList as Interviewee[], { status: 200 });
    }),
    http.get(`${BASE_URL}interviewees/:id`, ({ params }) => {
        const detail = intervieweeDetailList.find(
            (interviewee) => interviewee.id === Number(params.id),
        );
        return HttpResponse.json(detail as IntervieweeDetail, { status: 200 });
    }),
    http.get(`${BASE_URL}documents/all`, () => {
        return HttpResponse.json(documentList as Document[], { status: 200 });
    }),
    http.get(`${BASE_URL}interviewer/all`, () => {
        return HttpResponse.json(evaluationList as Evaluation[], { status: 200 });
    }),
];

export { interviewHandler };
