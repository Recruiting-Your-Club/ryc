import type { Dispatch, SetStateAction } from 'react';
import React, { useEffect, useState } from 'react';
import {
    s_applicantSchedulePageContainer,
    s_contentComponentWrapper,
    s_buttonGroup,
    s_arrowContainer,
    s_selectionButton,
    s_highlightedApplicantList,
    s_alertSvg,
    s_contentContainer,
    s_alertSvgWrapper,
    s_dropdownContent,
} from './ApplicantSchedulePage.style';
import {
    ApplicantList,
    Button,
    ComponentMover,
    Dropdown,
    InterviewTimeTable,
    Tooltip,
} from '@components';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { interviewQueries } from '@api/queryFactory';
import { convertDate } from '@utils/convertDate';
import { useToast } from '@hooks/useToast';
import { interviewMutations } from '@hooks/mutations/interviewMutations';
import type {
    ApplicantForInterviewSlot,
    ApplicantReservedInterview,
} from '@api/domain/interview/types';
import type { SelectedLabel } from './types';
import Alert from '@assets/images/alert.svg';
import dayjs from 'dayjs';
import type { StepApplicant } from '@api/domain/step/types';

export const CLUB_ID = '69cab5c5-c2ff-4bcf-8048-9307c214e566-42';
export const ANNOUNCEMENT_ID = 'd3f1c5e2-8a90-4b6c-9c45-6d2a1c8e5d3f';

function ApplicantSchedulePage() {
    // prop destruction
    // lib hooks
    const { toast } = useToast();

    // initial values
    // state, ref, querystring hooks
    const [open, setOpen] = useState<boolean>(false);
    const [standardOpen, setStandardOpen] = useState<boolean>(false);

    const [selectedIntervieweeId, setSelectedIntervieweeId] = useState<string>('');
    const [selectedStandardIntervieweeId, setSelectedStandardIntervieweeId] = useState<string>('');
    const [unreservedIntervieweeId, setUnreservedIntervieweeId] = useState<string>('');

    const [slot0Id, setSlot0Id] = useState<string | null>(null);
    const [slot1Id, setSlot1Id] = useState<string | null>(null);

    const [selectedInterviewLabel, setSelectedInterviewLabel] = useState<SelectedLabel>({
        label: '',
        interviewSlotId: null,
    });
    const [selectedStandardInterviewLabel, setSelectedStandardInterviewLabel] =
        useState<SelectedLabel>({ label: '', interviewSlotId: null });

    // form hooks
    // query hooks
    const { data: interviewSlots = [] } = useSuspenseQuery(
        interviewQueries.interviewSlot(ANNOUNCEMENT_ID, CLUB_ID),
    );
    const { data: slot0Applicants } = useQuery({
        ...interviewQueries.interviewInformation(ANNOUNCEMENT_ID, slot0Id ?? '', CLUB_ID),
        enabled: !!slot0Id,
    });
    const { data: slot1Applicants } = useQuery({
        ...interviewQueries.interviewInformation(ANNOUNCEMENT_ID, slot0Id ?? '', CLUB_ID),
        enabled: !!slot1Id,
    });
    const { data: unreservedApplicants } = useSuspenseQuery(
        interviewQueries.unreservedApplicant(ANNOUNCEMENT_ID, CLUB_ID),
    );

    const { mutate: updateIntervieweeList } = interviewMutations.useUpdateInterviewReservation();

    // calculated values
    const standardInterviewees = slot0Applicants?.interviewReservations ?? [];
    const intervieweesToMove = slot1Applicants?.interviewReservations ?? [];

    // handlers
    const labelSelectHandler =
        (
            getTargetLabelId: () => string | null,
            setTargetLabel: Dispatch<SetStateAction<SelectedLabel>>,
            setDropdown: Dispatch<SetStateAction<boolean>>,
        ) =>
        (label: string) => {
            const targetSetId = getTargetLabelId();
            const newSetId = findInterviewSetIdByLabel(label);

            const isSame = newSetId !== null && newSetId === targetSetId;

            if (isSame) {
                toast('같은 면접 일정은 선택할 수 없어요!', { type: 'error', toastTheme: 'black' });
                setDropdown(true);
                return;
            }
            setTargetLabel({ label, interviewSlotId: newSetId });
            setDropdown(false);
        };

    const handleSelectLabel = labelSelectHandler(
        () => selectedStandardInterviewLabel.interviewSlotId,
        setSelectedInterviewLabel,
        setOpen,
    );

    const handleSelectStandardLabel = labelSelectHandler(
        () => selectedInterviewLabel.interviewSlotId,
        setSelectedStandardInterviewLabel,
        setStandardOpen,
    );

    const handleMove = (
        interviewees: ApplicantReservedInterview[] | ApplicantForInterviewSlot[],
        applicantId: string,
        targetSlotId: string,
        resetSelectedId: Dispatch<SetStateAction<string>>,
    ) => {
        const selected = interviewees.find(
            (interviewee) => interviewee.applicantId === applicantId,
        );
        if (!selected) return;

        if ('interviewReservationId' in selected) {
            const reserved = selected as ApplicantReservedInterview;
            updateIntervieweeList({
                reservationId: reserved.interviewReservationId,
                interviewSlotId: targetSlotId,
                clubId: CLUB_ID,
            });
        } else {
            // 임시
            console.warn('이 타입에는 예약 ID가 없습니다.');
        }
        resetSelectedId('');
    };

    // effects
    useEffect(() => {
        if (slot0Id === null && slot1Id === null && interviewSlots.length > 0) {
            setSlot0Id(interviewSlots[0]?.id ?? '');
            setSlot1Id(interviewSlots[1]?.id ?? '');

            setSelectedInterviewLabel(getInitialInterviewLabel()); // 밑 두 줄은 정확히는 아이디가 null이 아니어도됨
            setSelectedStandardInterviewLabel(getInitialInterviewLabel());
        }
    }, [interviewSlots]);

    //etc
    function getInitialInterviewLabel(): SelectedLabel {
        const slot = interviewSlots?.[0];

        if (slot) {
            const date = convertDate(dayjs(slot.period.startDate).format('YYYY-MM-DD'));
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

    const toStepApplicants = (
        interviewees: ApplicantReservedInterview[] | ApplicantForInterviewSlot[],
    ): StepApplicant[] => {
        return interviewees.map(({ applicantId, applicantName, applicantEmail }) => ({
            applicantId,
            name: applicantName,
            email: applicantEmail,
            status: '',
            submittedAt: '',
        }));
    };

    return (
        <div css={s_applicantSchedulePageContainer}>
            <div css={s_alertSvgWrapper}>
                <Tooltip
                    content="카드를 클릭한 뒤, 화살표 버튼으로 다른 일정에 옮겨보세요!"
                    direction="right"
                >
                    <Alert css={s_alertSvg} />
                </Tooltip>
            </div>
            <div css={s_contentContainer}>
                <div css={s_contentComponentWrapper}>
                    <ApplicantList
                        applicantList={toStepApplicants(intervieweesToMove)}
                        selectedApplicantId={selectedIntervieweeId}
                        onSelectApplicantId={setSelectedIntervieweeId}
                        titleMode="titleNode"
                    >
                        <Dropdown open={open} onOpenChange={setOpen}>
                            <Dropdown.Trigger asChild>
                                <Button variant="outlined" sx={s_selectionButton}>
                                    {selectedInterviewLabel.label}
                                </Button>
                            </Dropdown.Trigger>
                            <Dropdown.Content offsetX={11.7} offsetY={42} sx={s_dropdownContent}>
                                <InterviewTimeTable
                                    interviewSlots={interviewSlots}
                                    selectedInterviewLabel={selectedInterviewLabel.label}
                                    onSelect={handleSelectLabel}
                                    onOpenChange={setOpen}
                                    listSx={s_buttonGroup}
                                />
                            </Dropdown.Content>
                        </Dropdown>
                    </ApplicantList>
                </div>
                <div css={s_arrowContainer}>
                    <ComponentMover
                        onMoveLeft={() =>
                            handleMove(
                                standardInterviewees,
                                selectedStandardIntervieweeId,
                                selectedInterviewLabel.interviewSlotId ?? '',
                                setSelectedStandardIntervieweeId,
                            )
                        }
                        onMoveRight={() =>
                            handleMove(
                                intervieweesToMove,
                                selectedIntervieweeId,
                                selectedStandardInterviewLabel.interviewSlotId ?? '',
                                setSelectedIntervieweeId,
                            )
                        }
                    />
                </div>
                <div css={s_contentComponentWrapper}>
                    <ApplicantList
                        applicantList={toStepApplicants(standardInterviewees)}
                        selectedApplicantId={selectedStandardIntervieweeId}
                        onSelectApplicantId={setSelectedStandardIntervieweeId}
                        titleMode="titleNode"
                        sx={s_highlightedApplicantList}
                    >
                        <Dropdown open={standardOpen} onOpenChange={setStandardOpen}>
                            <Dropdown.Trigger asChild>
                                <Button variant="outlined" sx={s_selectionButton}>
                                    {selectedStandardInterviewLabel.label}
                                </Button>
                            </Dropdown.Trigger>
                            <Dropdown.Content offsetX={11.7} offsetY={42}>
                                <InterviewTimeTable
                                    interviewSlots={interviewSlots}
                                    selectedInterviewLabel={selectedStandardInterviewLabel.label}
                                    onSelect={handleSelectStandardLabel}
                                    onOpenChange={setStandardOpen}
                                    listSx={s_buttonGroup}
                                />
                            </Dropdown.Content>
                        </Dropdown>
                    </ApplicantList>
                </div>
                <div css={s_arrowContainer}>
                    <ComponentMover
                        onMoveLeft={() =>
                            handleMove(
                                unreservedApplicants.unreservedApplicants,
                                unreservedIntervieweeId,
                                selectedStandardInterviewLabel.interviewSlotId ?? '',
                                setUnreservedIntervieweeId,
                            )
                        }
                        onMoveRight={() =>
                            handleMove(
                                standardInterviewees,
                                selectedStandardIntervieweeId,
                                '',
                                setSelectedStandardIntervieweeId,
                            )
                        }
                    />
                </div>
                <div css={s_contentComponentWrapper}>
                    <ApplicantList
                        title="면접 일정 미지정자"
                        applicantList={toStepApplicants(unreservedApplicants.unreservedApplicants)}
                        selectedApplicantId={unreservedIntervieweeId}
                        onSelectApplicantId={setUnreservedIntervieweeId}
                    />
                </div>
            </div>
        </div>
    );
}

export { ApplicantSchedulePage };
