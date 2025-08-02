import type { Dispatch, SetStateAction } from 'react';
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
import type { CSSObject } from '@emotion/react';

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
    const [unspecifiedApplicantId, setUnspecifiedApplicantId] = useState<number>(1);

    const [selectedInterviewLabel, setSelectedInterviewLabel] = useState<string>(() =>
        getInitialInterviewLabel(1),
    );
    const [selectedStandardInterviewLabel, setSelectedStandardInterviewLabel] = useState<string>(
        () => getInitialInterviewLabel(0),
    );

    // form hooks
    // query hooks
    const { data: applicantList = [] } = useSuspenseQuery(applicantQueries.allApplicants());

    // calculated values
    function getInitialInterviewLabel(scheduleSetIndex: number): string {
        if (interviewSchedulelist[0]) {
            const date = convertDate(interviewSchedulelist[0].date);
            const name = interviewSchedulelist[0].interviewSets[scheduleSetIndex].name;
            return `${date} ${name}`;
        }
        return '면접 일정 없음';
    }

    // handlers
    const labelSelectHandler =
        (
            getTargetLabel: () => string,
            setTargetLabel: Dispatch<SetStateAction<string>>,
            setDropdown: Dispatch<SetStateAction<boolean>>,
        ) =>
        (label: string) => {
            const targetLabel = getTargetLabel();
            const isSame = label === targetLabel && label !== '면접 일정 없음';

            if (isSame) {
                toast('같은 면접 일정은 선택할 수 없어요!', { type: 'error', toastTheme: 'black' });
                setDropdown(true);
                return;
            }
            setTargetLabel(label);
            setDropdown(false);
        };

    const handleSelectLabel = labelSelectHandler(
        () => selectedStandardInterviewLabel,
        setSelectedInterviewLabel,
        setOpen,
    );

    const handleSelectStandardLabel = labelSelectHandler(
        () => selectedInterviewLabel,
        setSelectedStandardInterviewLabel,
        setStandardOpen,
    );

    // effects
    // etc
    const renderApplicantSection = (
        applicantId: number,
        setApplicantId: Dispatch<SetStateAction<number>>,
        open: boolean,
        setOpen: Dispatch<SetStateAction<boolean>>,
        label: string,
        onSelect: (label: string) => void,
        sx?: CSSObject,
    ) => (
        <div css={s_contentComponentWrapper}>
            <ApplicantList
                applicantList={applicantList}
                selectedApplicantId={applicantId}
                onSelectApplicantId={setApplicantId}
                titleMode="titleNode"
                sx={sx}
            >
                <Dropdown open={open} onOpenChange={setOpen}>
                    <Dropdown.Trigger asChild>
                        <Button variant="outlined" sx={s_selectionButton}>
                            {label}
                        </Button>
                    </Dropdown.Trigger>
                    <Dropdown.Content offsetX={11.7} offsetY={42}>
                        <InterviewTimeTable
                            interviewSchedules={interviewSchedulelist}
                            selectedInterviewLabel={label}
                            onSelect={onSelect}
                            onOpenChange={setOpen}
                            listSx={s_buttonGroup}
                        />
                    </Dropdown.Content>
                </Dropdown>
            </ApplicantList>
        </div>
    );

    return (
        <div css={s_applicantSchedulePageContainer}>
            <div css={s_contentComponentWrapper}>
                {renderApplicantSection(
                    selectedApplicantId,
                    setSelectedApplicantId,
                    open,
                    setOpen,
                    selectedInterviewLabel,
                    handleSelectLabel,
                )}
            </div>
            <div css={s_arrowContainer}>
                <ComponentMover></ComponentMover>
            </div>
            <div css={s_contentComponentWrapper}>
                {renderApplicantSection(
                    selectedStandardApplicantId,
                    setSelectedStandardApplicantId,
                    standardOpen,
                    setStandardOpen,
                    selectedStandardInterviewLabel,
                    handleSelectStandardLabel,
                    s_highlightedApplicantList,
                )}
            </div>
            <div css={s_arrowContainer}>
                <ComponentMover />
            </div>
            <div css={s_contentComponentWrapper}>
                <ApplicantList
                    title="면접 일정 미지정자"
                    applicantList={applicantList}
                    selectedApplicantId={unspecifiedApplicantId}
                    onSelectApplicantId={setUnspecifiedApplicantId}
                />
            </div>
        </div>
    );
}

export { ApplicantSchedulePage };
