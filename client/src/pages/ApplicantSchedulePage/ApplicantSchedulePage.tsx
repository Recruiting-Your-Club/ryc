import React, { useState } from 'react';
import {
    s_applicantSchedulePageContainer,
    s_contentComponentWrapper,
    s_buttonGroup,
    s_arrowContainer,
    s_selectionButton,
    s_highlightedApplicantList,
} from './ApplicantSchedulePage.style';
import { ApplicantList, Button, ComponentMover, Dropdown, InterviewTimeTable } from '@components';
import { useSuspenseQuery } from '@tanstack/react-query';
import { interviewQueries } from '@api/queryFactory';
import { convertDate } from '@utils/convertDate';
import { applicantQueries } from '@api/queryFactory/applicantQueries';
import { useToast } from '@hooks/useToast';

function ApplicantSchedulePage() {
    // prop destruction
    // lib hooks
    const { toast } = useToast();
    // initial values
    const { data: interviewSchedulelist = [] } = useSuspenseQuery(
        interviewQueries.allInterviewSchedules(),
    );
    // state, ref, querystring hooks
    const [open, setOpen] = useState<boolean>(false);
    const [standardOpen, setStandardOpen] = useState<boolean>(false);

    const [selectedApplicantId, setSelectedApplicantId] = useState<number>(1);
    const [selectedStandardApplicantId, setSelectedStandardApplicantId] = useState<number>(1);
    const [selectedInterviewLabel, setSelectedInterviewLabel] = useState<string>(() => {
        if (interviewSchedulelist[0]) {
            const date = convertDate(interviewSchedulelist[0].date);
            const name = interviewSchedulelist[0].interviewSets[1].name;
            return `${date} ${name}`;
        }
        return '면접 일정 없음';
    });
    const [selectedStandardInterviewLabel, setSelectedStandardInterviewLabel] = useState<string>(
        () => {
            if (interviewSchedulelist[0]) {
                const date = convertDate(interviewSchedulelist[0].date);
                const name = interviewSchedulelist[0].interviewSets[0].name;
                return `${date} ${name}`;
            }
            return '면접 일정 없음';
        },
    );

    // form hooks
    // query hooks
    const { data: applicantList = [] } = useSuspenseQuery(applicantQueries.allApplicants());

    // calculated values
    // handlers
    const handleSelectStandardLabel = (label: string) => {
        const isSame = label === selectedInterviewLabel && label !== '면접 일정 없음';

        if (isSame) {
            toast('같은 면접 일정은 선택할 수 없어요!', { type: 'error', toastTheme: 'black' });
            setStandardOpen(true);
            return;
        }

        setSelectedStandardInterviewLabel(label);
        setStandardOpen(false);
    };

    const handleSelectLabel = (label: string) => {
        const isSame = label === selectedStandardInterviewLabel && label !== '면접 일정 없음';

        if (isSame) {
            toast('같은 면접 일정은 선택할 수 없어요!', { type: 'error', toastTheme: 'black' });
            setOpen(true);
            return;
        }

        setSelectedInterviewLabel(label);
        setOpen(false);
    };
    // effects
    return (
        <div css={s_applicantSchedulePageContainer}>
            <div css={s_contentComponentWrapper}>
                <ApplicantList
                    applicantList={applicantList}
                    selectedApplicantId={selectedApplicantId}
                    onSelectApplicantId={setSelectedApplicantId}
                    titleMode="titleNode"
                >
                    <Dropdown key="wannaChange" open={open} onOpenChange={setOpen}>
                        <Dropdown.Trigger asChild>
                            <Button variant="outlined" sx={s_selectionButton}>
                                {selectedInterviewLabel}
                            </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Content offsetX={11.7} offsetY={42}>
                            <InterviewTimeTable
                                interviewSchedules={interviewSchedulelist}
                                selectedInterviewLabel={selectedInterviewLabel}
                                onSelect={handleSelectLabel}
                                onOpenChange={setOpen}
                                listSx={s_buttonGroup}
                            />
                        </Dropdown.Content>
                    </Dropdown>
                </ApplicantList>
            </div>
            <div css={s_arrowContainer}>
                <ComponentMover></ComponentMover>
            </div>
            <div css={s_contentComponentWrapper}>
                <ApplicantList
                    applicantList={applicantList}
                    selectedApplicantId={selectedStandardApplicantId}
                    onSelectApplicantId={setSelectedStandardApplicantId}
                    titleMode="titleNode"
                    sx={s_highlightedApplicantList}
                >
                    <Dropdown key="standard" open={standardOpen} onOpenChange={setStandardOpen}>
                        <Dropdown.Trigger asChild>
                            <Button variant="outlined" sx={s_selectionButton}>
                                {selectedStandardInterviewLabel}
                            </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Content offsetX={11.7} offsetY={42}>
                            <InterviewTimeTable
                                interviewSchedules={interviewSchedulelist}
                                selectedInterviewLabel={selectedStandardInterviewLabel}
                                onSelect={handleSelectStandardLabel}
                                onOpenChange={setStandardOpen}
                                listSx={s_buttonGroup}
                            />
                        </Dropdown.Content>
                    </Dropdown>
                </ApplicantList>
            </div>
            <div css={s_arrowContainer}>
                <ComponentMover />
            </div>
            <div css={s_contentComponentWrapper}>
                <ApplicantList
                    title="면접 일정 미지정자"
                    applicantList={applicantList}
                    selectedApplicantId={selectedApplicantId}
                    onSelectApplicantId={setSelectedApplicantId}
                />
            </div>
        </div>
    );
}

export { ApplicantSchedulePage };
