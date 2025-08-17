import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@constants/api';

const emailHandler = [
    http.post(`${BASE_URL}announcements/:announcementId/emails`, async ({ request, params }) => {
        const { clubId, announcementId } = params as { clubId: string; announcementId: string };

        const email = await request.json();

        return HttpResponse.json({ clubId, announcementId, email }, { status: 200 });
    }),

    http.post(
        `${BASE_URL}admin/clubs/:clubId/announcements/:announcementId/interview-slots`,
        async ({ request, params }) => {
            const { clubId, announcementId } = params as { clubId: string; announcementId: string };

            const email = await request.json();

            return HttpResponse.json({ clubId, announcementId, email }, { status: 200 });
        },
    ),
];

export { emailHandler };
