import type {
    InterviewApplicant,
    InterviewSlot,
    UnreservedApplicant,
} from '@api/domain/interview/types';
import type { StepApplicant } from '@api/domain/step/types';
import { useInterviewMutations } from '@api/hooks';
import { interviewQueries } from '@api/queryFactory';
import Alert from '@assets/images/alert.svg';
import { ApplicantList, ComponentMover, InterviewSlotDropdown } from '@components';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import type { Dispatch, SetStateAction } from 'react';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Text, useToast } from '@ssoc/ui';
import { convertDate } from '@ssoc/utils';

import {
    s_alertSvg,
    s_alertSvgContainer,
    s_applicantList,
    s_applicantSchedulePageContainer,
    s_arrowContainer,
    s_contentComponentWrapper,
    s_contentContainer,
} from './ApplicantSchedulePage.style';
import type { SelectedLabel } from './types';

function ApplicantSchedulePage() {
    // prop destruction
    // lib hooks
    const { toast } = useToast();
    const { clubId, announcementId } = useParams();

    // initial values
    // state, ref, querystring hooks
    const [open, setOpen] = useState<boolean>(false);
    const [standardOpen, setStandardOpen] = useState<boolean>(false);

    const [selectedIntervieweeId, setSelectedIntervieweeId] = useState<string>('');

    const [slot0Id, setSlot0Id] = useState<string | null>(null);
    const [slot1Id, setSlot1Id] = useState<string | null>(null);

    const [selectedInterviewLabel, setSelectedInterviewLabel] = useState<SelectedLabel>({
        label: '면접 일정 없음',
        interviewSlotId: null,
    });
    const [selectedStandardInterviewLabel, setSelectedStandardInterviewLabel] =
        useState<SelectedLabel>({ label: '면접 일정 없음', interviewSlotId: null });

    // form hooks
    // query hooks
    const { data: interviewSlots = [] } = useSuspenseQuery(
        interviewQueries.interviewSlot(announcementId!, clubId!),
    );
    const { data: slot0Applicants } = useQuery({
        ...interviewQueries.interviewInformation(announcementId!, slot0Id ?? '', clubId!),
        enabled: !!slot0Id && slot0Id !== '',
        throwOnError: true,
    });
    const { data: slot1Applicants } = useQuery({
        ...interviewQueries.interviewInformation(announcementId!, slot1Id ?? '', clubId!),
        enabled: !!slot1Id && slot1Id !== '',
        throwOnError: true,
    });
    const { data: unreservedApplicants } = useSuspenseQuery(
        interviewQueries.unreservedApplicant(announcementId!, clubId!),
    );

    const { mutate: updateIntervieweeList } = useInterviewMutations.useUpdateInterviewReservation(
        announcementId!,
    );
    const { mutate: deleteReservation } = useInterviewMutations.useDeleteReservation(
        announcementId!,
    );

    // calculated values
    const standardInterviewees = useMemo(() => slot0Applicants ?? [], [slot0Applicants]);
    const intervieweesToMove = useMemo(() => slot1Applicants ?? [], [slot1Applicants]);

    const isSelectedInFirstSlot = useMemo(
        () =>
            intervieweesToMove.some(
                (applicant) =>
                    'applicantSummary' in applicant &&
                    applicant.applicantSummary.applicantId === selectedIntervieweeId,
            ),
        [intervieweesToMove, selectedIntervieweeId],
    );

    const isSelectedInThirdSlot = useMemo(
        () =>
            unreservedApplicants.some(
                (applicant) => applicant.applicantId === selectedIntervieweeId,
            ),
        [unreservedApplicants, selectedIntervieweeId],
    );

    // handlers
    const labelSelectHandler =
        (
            getTargetLabelId: () => string | null,
            setTargetLabel: Dispatch<SetStateAction<SelectedLabel>>,
            setSlotId: Dispatch<SetStateAction<string | null>>,
            setDropdown: Dispatch<SetStateAction<boolean>>,
        ) =>
        ({ label, slotId }: { label: string; slotId: string }) => {
            const targetSetId = getTargetLabelId();
            const newSetId = slotId;

            const isSame = newSetId !== null && newSetId === targetSetId;

            if (isSame) {
                toast('선택한 면접 일정이 다른 리스트와 겹쳐요!', {
                    type: 'error',
                    toastTheme: 'black',
                });
                setDropdown(true);
                return;
            }
            setTargetLabel({ label, interviewSlotId: newSetId });
            setSlotId(newSetId);
            setDropdown(false);
        };

    const handleSelectLabel = labelSelectHandler(
        () => selectedStandardInterviewLabel.interviewSlotId,
        setSelectedInterviewLabel,
        setSlot1Id,
        setOpen,
    );

    const handleSelectStandardLabel = labelSelectHandler(
        () => selectedInterviewLabel.interviewSlotId,
        setSelectedStandardInterviewLabel,
        setSlot0Id,
        setStandardOpen,
    );

    const handleMove = (
        interviewees: InterviewApplicant[] | UnreservedApplicant[],
        applicantId: string,
        targetSlotId: string,
        currentSlotId: string,
        resetSelectedId: Dispatch<SetStateAction<string>>,
    ) => {
        const selected = interviewees.find((interviewee) =>
            'applicantSummary' in interviewee
                ? interviewee.applicantSummary.applicantId === applicantId
                : interviewee.applicantId === applicantId,
        );

        if (!selected) return;

        const finalApplicantId =
            'applicantSummary' in selected
                ? selected.applicantSummary.applicantId
                : selected.applicantId;

        const finalReservationId =
            'applicantSummary' in selected ? selected.interviewReservationId : '';

        if (targetSlotId === '' && currentSlotId !== '') {
            deleteReservation({
                reservationId: finalReservationId,
                clubId: clubId!,
                oldInterviewSlotId: currentSlotId,
            });
        } else {
            updateIntervieweeList({
                applicantId: finalApplicantId,
                interviewSlotId: targetSlotId,
                clubId: clubId!,
                oldInterviewSlotId: currentSlotId,
            });
        }

        resetSelectedId('');
    };

    // effects
    useEffect(() => {
        if (slot0Id === null && slot1Id === null && interviewSlots.length > 0) {
            setSlot0Id(interviewSlots[0]?.id ?? '');
            setSlot1Id(interviewSlots[1]?.id ?? '');

            setSelectedInterviewLabel(getInitialInterviewLabel(interviewSlots?.[1])); // 밑 두 줄은 정확히는 아이디가 null이 아니어도됨
            setSelectedStandardInterviewLabel(getInitialInterviewLabel(interviewSlots?.[0]));
        }
    }, [interviewSlots]);

    //etc
    function getInitialInterviewLabel(slot: InterviewSlot | null): SelectedLabel {
        if (slot) {
            const date = dayjs(dayjs(slot.period.startDate).format('YYYY-MM-DD')).format(
                'MM월 DD일',
            );
            const name = dayjs(slot.period.startDate).format('HH:mm');
            return { label: `${date} ${name}`, interviewSlotId: slot.id };
        }
        return { label: '면접 일정 없음', interviewSlotId: '' };
    }

    const findInterviewSetIdByLabel = (label: string): string | null => {
        for (const slot of interviewSlots) {
            const date = convertDate(dayjs(slot.period.startDate).format('YYYY-MM-DD'));
            const fullLabel = `${date} ${dayjs(slot.period.startDate).format('HH:mm')}`;
            if (fullLabel === label) return slot.id;
        }
        return null;
    };

    const getApplicantInformation = (applicant: InterviewApplicant | UnreservedApplicant) => {
        if ('applicantSummary' in applicant) {
            return {
                applicantId: applicant.applicantSummary.applicantId,
                applicantName: applicant.applicantSummary.applicantName,
                applicantEmail: applicant.applicantSummary.applicantEmail,
                imageResponse: applicant.applicantSummary.imageResponse,
            };
        }
        return {
            applicantId: applicant.applicantId,
            applicantName: applicant.applicantName,
            applicantEmail: applicant.applicantEmail,
            imageResponse: applicant.imageResponse,
        };
    };

    // 이미지 받아오는 곳 수정 필요
    const toStepApplicants = (
        interviewees: InterviewApplicant[] | UnreservedApplicant[],
    ): StepApplicant[] => {
        if (!Array.isArray(interviewees)) return [];

        return interviewees.map((applicant) => {
            const { applicantId, applicantName, applicantEmail, imageResponse } =
                getApplicantInformation(applicant);

            return {
                applicantId,
                name: applicantName,
                email: applicantEmail,
                status: '',
                submittedAt: '',
                imageAllowed: Boolean(imageResponse),
                imagePresent: Boolean(imageResponse),
                representativeImage: imageResponse ?? null,
            };
        });
    };

    return (
        <div css={s_applicantSchedulePageContainer}>
            <span css={s_alertSvgContainer}>
                <Alert css={s_alertSvg} />
                <Text as="span" type="captionRegular" color="helper">
                    카드를 클릭한 뒤, 화살표 버튼으로 다른 일정에 옮겨보세요!
                </Text>
            </span>
            <div css={s_contentContainer}>
                <div css={s_contentComponentWrapper}>
                    <ApplicantList
                        applicantList={toStepApplicants(intervieweesToMove)}
                        selectedApplicantId={selectedIntervieweeId}
                        onSelectApplicantId={setSelectedIntervieweeId}
                        titleMode="titleNode"
                        sx={s_applicantList}
                    >
                        <InterviewSlotDropdown
                            open={open}
                            onOpenChange={setOpen}
                            selectedInterviewLabel={selectedInterviewLabel}
                            interviewSlots={interviewSlots}
                            onSelectLabel={handleSelectLabel}
                        />
                    </ApplicantList>
                </div>
                <div css={s_arrowContainer}>
                    <ComponentMover
                        onMoveLeft={() =>
                            handleMove(
                                isSelectedInThirdSlot ? unreservedApplicants : standardInterviewees,
                                selectedIntervieweeId,
                                selectedInterviewLabel.interviewSlotId ?? '',
                                isSelectedInThirdSlot
                                    ? ''
                                    : (selectedStandardInterviewLabel.interviewSlotId ?? ''),
                                setSelectedIntervieweeId,
                            )
                        }
                        onMoveRight={() =>
                            handleMove(
                                intervieweesToMove,
                                selectedIntervieweeId,
                                selectedStandardInterviewLabel.interviewSlotId ?? '',
                                selectedInterviewLabel.interviewSlotId ?? '',
                                setSelectedIntervieweeId,
                            )
                        }
                    />
                </div>
                <div css={s_contentComponentWrapper}>
                    <ApplicantList
                        applicantList={toStepApplicants(standardInterviewees)}
                        selectedApplicantId={selectedIntervieweeId}
                        onSelectApplicantId={setSelectedIntervieweeId}
                        titleMode="titleNode"
                        sx={s_applicantList}
                    >
                        <InterviewSlotDropdown
                            open={standardOpen}
                            onOpenChange={setStandardOpen}
                            selectedInterviewLabel={selectedStandardInterviewLabel}
                            interviewSlots={interviewSlots}
                            onSelectLabel={handleSelectStandardLabel}
                        />
                    </ApplicantList>
                </div>
                <div css={s_arrowContainer}>
                    <ComponentMover
                        onMoveLeft={() =>
                            handleMove(
                                unreservedApplicants,
                                selectedIntervieweeId,
                                selectedStandardInterviewLabel.interviewSlotId ?? '',
                                '',
                                setSelectedIntervieweeId,
                            )
                        }
                        onMoveRight={() =>
                            handleMove(
                                isSelectedInFirstSlot ? intervieweesToMove : standardInterviewees,
                                selectedIntervieweeId,
                                '',
                                isSelectedInFirstSlot
                                    ? (selectedInterviewLabel.interviewSlotId ?? '')
                                    : (selectedStandardInterviewLabel.interviewSlotId ?? ''),
                                setSelectedIntervieweeId,
                            )
                        }
                    />
                </div>
                <div css={s_contentComponentWrapper}>
                    <ApplicantList
                        title="면접 일정 미지정자"
                        applicantList={toStepApplicants(unreservedApplicants)}
                        selectedApplicantId={selectedIntervieweeId}
                        onSelectApplicantId={setSelectedIntervieweeId}
                        sx={s_applicantList}
                    />
                </div>
            </div>
        </div>
    );
}

export default ApplicantSchedulePage;
