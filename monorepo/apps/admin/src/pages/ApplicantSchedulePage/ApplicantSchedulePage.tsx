import type {
    ApplicantForInterviewSlot,
    ApplicantReservedInterview,
    InterviewSlot,
} from '@api/domain/interview/types';
import type { StepApplicant } from '@api/domain/step/types';
import { interviewQueries } from '@api/queryFactory';
import Alert from '@assets/images/alert.svg';
import { ApplicantList, ComponentMover, InterviewSlotDropdown } from '@components';
import { interviewMutations } from '@hooks/mutations/interviewMutations';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import type { Dispatch, SetStateAction } from 'react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useToast } from '@ssoc/ui';
import { Tooltip } from '@ssoc/ui';
import { convertDate } from '@ssoc/utils';

import {
    s_alertSvg,
    s_alertSvgWrapper,
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
        interviewQueries.interviewSlot(announcementId!, clubId!),
    );
    const { data: slot0Applicants } = useQuery({
        ...interviewQueries.interviewInformation(announcementId!, slot0Id ?? '', clubId!),
        enabled: !!slot0Id && slot0Id !== '',
    });
    const { data: slot1Applicants } = useQuery({
        ...interviewQueries.interviewInformation(announcementId!, slot1Id ?? '', clubId!),
        enabled: !!slot1Id && slot1Id !== '',
    });
    const { data: unreservedApplicants } = useSuspenseQuery(
        interviewQueries.unreservedApplicant(announcementId!, clubId!),
    );

    const { mutate: updateIntervieweeList } = interviewMutations.useUpdateInterviewReservation(
        announcementId!,
    );

    // calculated values
    const standardInterviewees = slot0Applicants?.interviewReservations ?? [];
    const intervieweesToMove = slot1Applicants?.interviewReservations ?? [];

    // handlers
    const labelSelectHandler =
        (
            getTargetLabelId: () => string | null,
            setTargetLabel: Dispatch<SetStateAction<SelectedLabel>>,
            setSlotId: Dispatch<SetStateAction<string | null>>,
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
        interviewees: ApplicantReservedInterview[] | ApplicantForInterviewSlot[],
        applicantId: string,
        targetSlotId: string,
        currentSlotId: string,
        resetSelectedId: Dispatch<SetStateAction<string>>,
    ) => {
        const selected = interviewees.find(
            (interviewee) => interviewee.applicantId === applicantId,
        );
        if (!selected) return;

        const reserved = selected as ApplicantReservedInterview;
        updateIntervieweeList({
            applicantId: reserved.applicantId,
            interviewSlotId: targetSlotId,
            clubId: clubId!,
            oldInterviewSlotId: currentSlotId,
        });

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
            <span css={s_alertSvgWrapper}>
                <Tooltip
                    content="카드를 클릭한 뒤, 화살표 버튼으로 다른 일정에 옮겨보세요!"
                    direction="right"
                >
                    <Alert css={s_alertSvg} />
                </Tooltip>
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
                                standardInterviewees,
                                selectedStandardIntervieweeId,
                                selectedInterviewLabel.interviewSlotId ?? '',
                                selectedStandardInterviewLabel.interviewSlotId ?? '',
                                setSelectedStandardIntervieweeId,
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
                        selectedApplicantId={selectedStandardIntervieweeId}
                        onSelectApplicantId={setSelectedStandardIntervieweeId}
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
                                unreservedApplicants.unreservedApplicants,
                                unreservedIntervieweeId,
                                selectedStandardInterviewLabel.interviewSlotId ?? '',
                                '',
                                setUnreservedIntervieweeId,
                            )
                        }
                        onMoveRight={() =>
                            handleMove(
                                standardInterviewees,
                                selectedStandardIntervieweeId,
                                '',
                                selectedStandardInterviewLabel.interviewSlotId ?? '',
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
                        sx={s_applicantList}
                    />
                </div>
            </div>
        </div>
    );
}

export { ApplicantSchedulePage };
