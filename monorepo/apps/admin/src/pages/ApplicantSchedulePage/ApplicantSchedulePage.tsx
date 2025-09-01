import type {
    InterviewApplicant,
    InterviewSlot,
    UnreservedApplicant,
} from '@api/domain/interview/types';
import type { StepApplicant } from '@api/domain/step/types';
import { useInterviewMutations } from '@api/hooks';
import { interviewQueries, stepQueries } from '@api/queryFactory';
import Alert from '@assets/images/alert.svg';
import AttentionTriangle from '@assets/images/attention-triangle.svg';
import {
    ApplicantList,
    ComponentMover,
    ConfirmDialog,
    ErrorDialog,
    InterviewSlotDropdown,
} from '@components';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import type { Dispatch, SetStateAction } from 'react';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Text, useToast } from '@ssoc/ui';

import {
    s_alertSvg,
    s_alertSvgContainer,
    s_applicantList,
    s_applicantSchedulePageContainer,
    s_arrowContainer,
    s_captionText,
    s_contentComponentWrapper,
    s_contentContainer,
    s_iconContainer,
    s_textBox,
    s_warningIcon,
    s_warningIconWrapper,
    s_warningPageContainer,
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

    const [errorDialogOpen, setErrorDialogOpen] = useState<boolean>(false);

    const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
    const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
    const [confirmMessage, setConfirmMessage] = useState<string>('');

    // form hooks
    // query hooks
    const { data: totalSteps = { processes: [] } } = useSuspenseQuery(
        stepQueries.getTotalSteps(announcementId!),
    );
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
        setErrorDialogOpen,
    );
    const { mutate: deleteReservation } = useInterviewMutations.useDeleteReservation(
        announcementId!,
        setErrorDialogOpen,
    );

    // calculated values
    const isThreeStepProcess = totalSteps?.processes?.length === 3;

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

    const handleMoveWithConfirm = (
        interviewees: InterviewApplicant[] | UnreservedApplicant[],
        applicantId: string,
        targetSlotId: string,
        currentSlotId: string,
        resetSelectedId: Dispatch<SetStateAction<string>>,
    ) => {
        if (interviewees === unreservedApplicants && targetSlotId !== '') {
            setConfirmMessage(
                `아직 예약하지 않은 지원자예요!\n\n ✔️임의로 면접 일정을 배정하시면\n지원자가 직접 예약할 수 없고 면접 확정 메일도 받을 수 없어요.\n\n그래도 진행하시겠어요?`,
            );
        } else if (
            interviewees !== unreservedApplicants &&
            targetSlotId !== '' &&
            currentSlotId !== ''
        ) {
            setConfirmMessage(
                `지원자의 면접 일정을 정말 변경하시겠어요?\n\n✔️ 변경된 일정은 자동으로 안내되지 않으니,\n꼭 지원자에게 별도로 알려주셔야 해요.`,
            );
        } else if (targetSlotId === '' && currentSlotId !== '') {
            setConfirmMessage(
                `지원자의 면접 일정을 해제하시겠어요?\n\n✔️미지정 상태가 되면, 지원자는 다시 직접 예약할 수 있어요.`,
            );
        }

        setPendingAction(
            () => () =>
                handleMove(interviewees, applicantId, targetSlotId, currentSlotId, resetSelectedId),
        );
        setOpenConfirmDialog(true);
    };

    const handleConfirm = () => {
        if (pendingAction) {
            pendingAction();
            setPendingAction(null);
        }
        setOpenConfirmDialog(false);
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
        <>
            {isThreeStepProcess ? (
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
                                    handleMoveWithConfirm(
                                        isSelectedInThirdSlot
                                            ? unreservedApplicants
                                            : standardInterviewees,
                                        selectedIntervieweeId,
                                        selectedInterviewLabel.interviewSlotId ?? '',
                                        isSelectedInThirdSlot
                                            ? ''
                                            : (selectedStandardInterviewLabel.interviewSlotId ??
                                                  ''),
                                        setSelectedIntervieweeId,
                                    )
                                }
                                onMoveRight={() =>
                                    handleMoveWithConfirm(
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
                                    handleMoveWithConfirm(
                                        unreservedApplicants,
                                        selectedIntervieweeId,
                                        selectedStandardInterviewLabel.interviewSlotId ?? '',
                                        '',
                                        setSelectedIntervieweeId,
                                    )
                                }
                                onMoveRight={() =>
                                    handleMoveWithConfirm(
                                        isSelectedInFirstSlot
                                            ? intervieweesToMove
                                            : standardInterviewees,
                                        selectedIntervieweeId,
                                        '',
                                        isSelectedInFirstSlot
                                            ? (selectedInterviewLabel.interviewSlotId ?? '')
                                            : (selectedStandardInterviewLabel.interviewSlotId ??
                                                  ''),
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
                    <ErrorDialog
                        open={errorDialogOpen}
                        handleClose={() => setErrorDialogOpen(false)}
                        errorStatusCode={500}
                    />
                </div>
            ) : (
                <div css={s_warningPageContainer}>
                    <div css={s_textBox}>
                        <div css={s_iconContainer}>
                            <div css={s_warningIconWrapper}>
                                <AttentionTriangle css={s_warningIcon} />
                            </div>
                        </div>
                        <Text type="h4Semibold" sx={s_captionText}>
                            면접 전형이 존재하지 않아요!
                        </Text>
                    </div>
                </div>
            )}
            {openConfirmDialog && (
                <ConfirmDialog
                    type="confirm"
                    title="예약변경 알림"
                    content={confirmMessage}
                    open={true}
                    cancelButton={true}
                    handleClose={() => setOpenConfirmDialog(false)}
                    actionHandler={handleConfirm}
                    actionPosition="center"
                />
            )}
        </>
    );
}

export default ApplicantSchedulePage;
