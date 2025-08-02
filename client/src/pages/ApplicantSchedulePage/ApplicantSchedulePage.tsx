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
} from './ApplicantSchedulePage.style';
import {
    ApplicantList,
    Button,
    ComponentMover,
    Dropdown,
    InterviewTimeTable,
    Tooltip,
} from '@components';
import { useSuspenseQuery } from '@tanstack/react-query';
import { interviewQueries } from '@api/queryFactory';
import { convertDate } from '@utils/convertDate';
import { useToast } from '@hooks/useToast';
import { interviewMutations } from '@api/mutationFactory/interviewMutations';
import type { Interviewee } from '@api/domain/interview/types';
import type { SelectedLabel } from './types';
import Alert from '@assets/images/alert.svg';

function ApplicantSchedulePage() {
    // prop destruction
    // lib hooks
    const { toast } = useToast();

    // initial values
    // state, ref, querystring hooks
    const [open, setOpen] = useState<boolean>(false);
    const [standardOpen, setStandardOpen] = useState<boolean>(false);

    const [selectedIntervieweeId, setSelectedIntervieweeId] = useState<number>(-1);
    const [selectedStandardIntervieweeId, setSelectedStandardIntervieweeId] = useState<number>(-1);
    const [unspecifiedIntervieweeId, setUnspecifiedIntervieweeId] = useState<number>(-1);

    const [selectedInterviewLabel, setSelectedInterviewLabel] = useState<SelectedLabel>({
        label: '',
        interviewSetId: null,
    });
    const [selectedStandardInterviewLabel, setSelectedStandardInterviewLabel] =
        useState<SelectedLabel>({ label: '', interviewSetId: null });

    // form hooks
    // query hooks
    const { data: intervieweeList = [] } = useSuspenseQuery(interviewQueries.allInterviewees());
    const { data: interviewSchedulelist = [] } = useSuspenseQuery(
        interviewQueries.allInterviewSchedules(),
    );
    const { mutate: updateIntervieweeList } = interviewMutations.useUpdateIntervieweeSchedule();

    // calculated values
    const standardInterviewees = intervieweeList.filter(
        (interviewee) =>
            interviewee.interviewSetId === selectedStandardInterviewLabel.interviewSetId,
    );
    const IntervieweesToMove = intervieweeList.filter(
        (interviewee) => interviewee.interviewSetId === selectedInterviewLabel.interviewSetId,
    );
    const unspecifiedInterviewees = intervieweeList.filter(
        (interviewee) => interviewee.interviewSetId === null,
    );

    function getInitialInterviewLabel(scheduleSetIndex: number): SelectedLabel {
        const schedule = interviewSchedulelist?.[0];
        const set = schedule?.interviewSets?.[scheduleSetIndex];

        if (schedule && set) {
            const date = convertDate(schedule.date);
            const name = set.name;
            return { label: `${date} ${name}`, interviewSetId: set.id };
        }
        return { label: '면접 일정 없음', interviewSetId: null };
    }

    // handlers
    const labelSelectHandler =
        (
            getTargetLabelId: () => number | null,
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
            setTargetLabel({ label, interviewSetId: newSetId });
            setDropdown(false);
        };

    const handleSelectLabel = labelSelectHandler(
        () => selectedStandardInterviewLabel.interviewSetId,
        setSelectedInterviewLabel,
        setOpen,
    );

    const handleSelectStandardLabel = labelSelectHandler(
        () => selectedInterviewLabel.interviewSetId,
        setSelectedStandardInterviewLabel,
        setStandardOpen,
    );

    const handleMove = (
        interviewees: Interviewee[],
        applicantId: number,
        targetSetId: number | null,
        resetSelectedId: Dispatch<SetStateAction<number>>,
    ) => {
        const selected = interviewees.find((interviewee) => interviewee.id === applicantId);
        if (!selected) return;

        updateIntervieweeList({
            intervieweeId: selected.id,
            body: { interviewSetId: targetSetId },
        });
        resetSelectedId(-1);
    };

    // effects
    useEffect(() => {
        if (interviewSchedulelist.length > 0) {
            setSelectedInterviewLabel(getInitialInterviewLabel(1));
            setSelectedStandardInterviewLabel(getInitialInterviewLabel(0));
        }
    }, [interviewSchedulelist]);

    //etc
    const findInterviewSetIdByLabel = (label: string): number | null => {
        for (const schedule of interviewSchedulelist) {
            const date = convertDate(schedule.date);
            for (const set of schedule.interviewSets) {
                const fullLabel = `${date} ${set.name}`;
                if (fullLabel === label) return set.id;
            }
        }
        return null;
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
                        applicantList={IntervieweesToMove}
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
                            <Dropdown.Content offsetX={11.7} offsetY={42}>
                                <InterviewTimeTable
                                    interviewSchedules={interviewSchedulelist}
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
                                selectedInterviewLabel.interviewSetId,
                                setSelectedStandardIntervieweeId,
                            )
                        }
                        onMoveRight={() =>
                            handleMove(
                                IntervieweesToMove,
                                selectedIntervieweeId,
                                selectedStandardInterviewLabel.interviewSetId,
                                setSelectedIntervieweeId,
                            )
                        }
                    />
                </div>
                <div css={s_contentComponentWrapper}>
                    <ApplicantList
                        applicantList={standardInterviewees}
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
                                    interviewSchedules={interviewSchedulelist}
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
                                unspecifiedInterviewees,
                                unspecifiedIntervieweeId,
                                selectedStandardInterviewLabel.interviewSetId,
                                setUnspecifiedIntervieweeId,
                            )
                        }
                        onMoveRight={() =>
                            handleMove(
                                standardInterviewees,
                                selectedStandardIntervieweeId,
                                null,
                                setSelectedStandardIntervieweeId,
                            )
                        }
                    />
                </div>
                <div css={s_contentComponentWrapper}>
                    <ApplicantList
                        title="면접 일정 미지정자"
                        applicantList={unspecifiedInterviewees}
                        selectedApplicantId={unspecifiedIntervieweeId}
                        onSelectApplicantId={setUnspecifiedIntervieweeId}
                    />
                </div>
            </div>
        </div>
    );
}

export { ApplicantSchedulePage };
