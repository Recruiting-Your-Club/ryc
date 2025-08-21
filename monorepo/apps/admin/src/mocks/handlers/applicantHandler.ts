import { BASE_URL } from '@constants/api';
import { http, HttpResponse } from 'msw';

import applicantDocumentList from '../data/applicant/applicantDocumentList.json';

const applicantHandler = [
    http.get(`${BASE_URL}announcements/:announcementId/applications/:applicantId`, ({ params }) => {
        const { applicantId } = params as {
            applicantId: string;
        };

        const document = applicantDocumentList.find(
            (document) => document.applicantId === applicantId,
        );

        return HttpResponse.json(document, { status: 200 });
    }),
];

export { applicantHandler };
