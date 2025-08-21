import type { InterviewApplicant, UnreservedApplicant } from '@api/domain/interview/types';
import { BASE_URL } from '@constants/api';
import { http, HttpResponse } from 'msw';

import interviewApplicants from '../data/interview/interviewApplicants.json';
import interviewSlots from '../data/interview/interviewSlots.json';
import unreservedApplicants from '../data/interview/unreservedApplicants.json';

const interviewHandler = [
    http.get(`${BASE_URL}admin/announcements/:announcementId/interview-slots`, () => {
        return HttpResponse.json(interviewSlots, { status: 200 });
    }),

    http.get(`${BASE_URL}admin/interview-slots/:interviewSlotId/reservations`, ({ params }) => {
        const { interviewSlotId } = params as { interviewSlotId: string };

        const data =
            (interviewApplicants as Record<string, InterviewApplicant[]>)[interviewSlotId] ?? [];

        return HttpResponse.json(data, { status: 200 });
    }),

    http.get(
        `${BASE_URL}admin/announcements/:announcementId/interviews/unreserved-applicants`,
        async () => {
            return HttpResponse.json(unreservedApplicants, { status: 200 });
        },
    ),

    http.put(
        `${BASE_URL}admin/applicants/:applicantId/interview-reservation`,
        async ({ params, request }) => {
            const { applicantId } = params as { applicantId: string };
            const { interviewSlotId: newSlotId } = (await request.json()) as {
                interviewSlotId: string;
            };

            const slots = interviewApplicants as Record<string, InterviewApplicant[]>;
            let movedReservation: InterviewApplicant | null = null;

            const unreservedIndex = unreservedApplicants.findIndex(
                (applicant) => applicant.applicantId === applicantId,
            );

            if (unreservedIndex !== -1) {
                const applicant = unreservedApplicants[unreservedIndex];
                movedReservation = {
                    interviewReservationId: `res-${newSlotId}-${applicantId}`,
                    applicantSummary: applicant,
                };
                unreservedApplicants.splice(unreservedIndex, 1); // 삭제
            } else {
                for (const slotKey in slots) {
                    const index = slots[slotKey].findIndex(
                        (res) => res.applicantSummary.applicantId === applicantId,
                    );
                    if (index !== -1) {
                        movedReservation = slots[slotKey][index];
                        slots[slotKey].splice(index, 1); // 기존 slot에서 삭제
                        break;
                    }
                }
            }

            if (!movedReservation) {
                return HttpResponse.json(
                    { message: '지원자를 찾을 수 없습니다.' },
                    { status: 404 },
                );
            }

            if (!slots[newSlotId]) slots[newSlotId] = [];
            slots[newSlotId].push(movedReservation);

            return HttpResponse.json(slots, { status: 200 });
        },
    ),

    http.delete(`${BASE_URL}admin/interview-reservations/:reservationId`, async ({ params }) => {
        const { reservationId } = params as { reservationId: string };

        let movedApplicant: InterviewApplicant['applicantSummary'] | null = null;

        for (const slot of Object.values(interviewApplicants)) {
            const index = slot.findIndex(
                (reservation) => reservation.interviewReservationId === reservationId,
            );
            if (index !== -1) {
                const [deleted] = slot.splice(index, 1);
                movedApplicant = deleted.applicantSummary;
                break;
            }
        }

        if (!movedApplicant) {
            return HttpResponse.json({ message: '해당 예약을 찾을 수 없습니다.' }, { status: 404 });
        }

        unreservedApplicants.push({
            applicantId: movedApplicant.applicantId,
            applicantEmail: movedApplicant.applicantEmail,
            applicantName: movedApplicant.applicantName,
            imageResponse: movedApplicant.imageResponse ?? {
                id: '',
                url: '',
                originalFileName: '',
                contentType: '',
            },
        } satisfies UnreservedApplicant);

        return HttpResponse.json({ message: '삭제 성공' }, { status: 200 });
    }),
];

export { interviewHandler };
