import { BASE_URL } from '@constants/api';
import { http, HttpResponse } from 'msw';
import interviewSlots from '../data/interview/interviewSlots.json';
import unreservedApplicants from '../data/interview/unreservedApplicants.json';
import interviewApplicants from '../data/interview/interviewApplicants.json';

const interviewHandler = [
    http.get(`${BASE_URL}announcements/:announcementId/interview-slots`, () => {
        return HttpResponse.json(interviewSlots, { status: 200 });
    }),

    http.get(
        `${BASE_URL}announcements/:announcementId/interview-slots/:interviewSlotId/reservations`,
        async ({ params }) => {
            const { interviewSlotId } = params as {
                interviewSlotId: string;
            };

            const data = interviewApplicants.find(
                (slot) => slot.interviewSlotId === interviewSlotId,
            );

            if (!data) return HttpResponse.json({ status: 404 });

            return HttpResponse.json(data, { status: 200 });
        },
    ),

    http.get(`${BASE_URL}announcements/:announcementId/unreserved`, async () => {
        return HttpResponse.json(unreservedApplicants, { status: 200 });
    }),

    http.patch(`${BASE_URL}interview-reservations/:applicantId`, async ({ params, request }) => {
        const { applicantId } = params as { applicantId: string };
        const { interviewSlotId: newSlotId } = (await request.json()) as {
            interviewSlotId: string;
        };

        let fromSlotIndex = -1;
        let reservationIndex = -1;
        let movedReservation = null;

        for (let i = 0; i < interviewApplicants.length; i++) {
            const slot = interviewApplicants[i];
            const index = slot.interviewReservations.findIndex(
                (reservation) => reservation.applicantId === applicantId,
            );
            if (index !== -1) {
                fromSlotIndex = i;
                reservationIndex = index;
                movedReservation = slot.interviewReservations[index];
                break;
            }
        }

        if (!movedReservation) {
            return HttpResponse.json({ message: '자원을 찾을 수 없습니다.' }, { status: 404 });
        }

        const toSlot = interviewApplicants.find((slot) => slot.interviewSlotId === newSlotId);
        if (!toSlot) {
            return HttpResponse.json({ message: '자원을 찾을 수 없습니다.' }, { status: 404 });
        }

        interviewApplicants[fromSlotIndex].interviewReservations.splice(reservationIndex, 1);
        toSlot.interviewReservations.push(movedReservation);

        return HttpResponse.json(interviewApplicants, { status: 200 });
    }),
];

export { interviewHandler };
