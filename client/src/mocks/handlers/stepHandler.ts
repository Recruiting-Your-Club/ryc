import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@constants/api';
import stepApplicantList from '../data/step/stepApplicantList.json';
import totalSteps from '../data/step/totalSteps.json';
import type { Step, StepApplicant } from '@api/domain/step/types';

let stepApplicants = [...stepApplicantList];

const stepHandler = [
    http.get(`${BASE_URL}step/all`, () => {
        return HttpResponse.json(totalSteps as Step, { status: 200 });
    }),
    http.get(`${BASE_URL}step-applicants/all`, () => {
        return HttpResponse.json(stepApplicants as StepApplicant[], { status: 200 });
    }),
    http.patch(`${BASE_URL}step-applicants/:applicantId/status`, async ({ request, params }) => {
        const { applicantId } = params;
        const { status } = (await request.json()) as { status: string };

        stepApplicants = stepApplicants.map((applicant) =>
            applicant.applicantId === applicantId ? { ...applicant, status } : applicant,
        );
        return HttpResponse.json({ status: 200 });
    }),
];

export { stepHandler };
