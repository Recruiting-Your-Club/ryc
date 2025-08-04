import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@constants/api';
import stepApplicantList from '../data/step/stepApplicantList.json';
import totalSteps from '../data/step/totalSteps.json';
import type { Step, StepApplicant } from '@api/domain/step/types';

const stepHandler = [
    http.get(`${BASE_URL}step/all`, () => {
        return HttpResponse.json(totalSteps as Step, { status: 200 });
    }),
    http.get(`${BASE_URL}step-applicants/all`, () => {
        return HttpResponse.json(stepApplicantList as StepApplicant[], { status: 200 });
    }),
];

export { stepHandler };
