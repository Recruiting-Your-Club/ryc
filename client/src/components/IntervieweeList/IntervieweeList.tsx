import Search from '@assets/images/search.svg';
import { Button, Dropdown, Input, IntervieweeCard, InterviewTimeTable, Text } from '@components';
import { convertDate } from '@utils/convertDate';
import React, { useCallback, useEffect, useState } from 'react';
import {
    s_intervieweeCardGroupWrapper,
    s_invervieweeCardContainer,
    s_listContainer,
    s_searchButton,
    s_searchInput,
    s_searchSvg,
    s_selectionButton,
    s_titleContainer,
    s_titleTextAndSelectionButtonContainer,
} from './IntervieweeList.style';
import type { EnrichedInterviewee, IntervieweeListProps } from './types';

function IntervieweeList({
    title = '지원자 목록',
    height,
    intervieweeList,
    interviewSchedules,
    selectedApplicantId,
    onSelectApplicant,
}: IntervieweeListProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    const [selectedInterviewLabel, setSelectedInterviewLabel] = useState<string>(() => {
        if (interviewSchedules[0]) {
            const date = convertDate(interviewSchedules[0].date);
            const name = interviewSchedules[0].interviewSets[0].name;
            return `${date} ${name}`;
        }
        return '면접 일정 없음';
    });

    const [searchText, setSearchText] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);

    // form hooks
    // query hooks
    // calculated values
    const selectedInterviewees =
        selectedInterviewLabel !== '면접 일정 없음'
            ? intervieweeList.filter(
                  (interviewee) =>
                      `${convertDate(interviewee.interviewDate)} ${interviewee.interviewName}` ===
                      selectedInterviewLabel,
              )
            : [];

    const searchInterviewees = useCallback(
        (applicants: EnrichedInterviewee[]) => {
            return applicants.filter((value) =>
                value.name.toLowerCase().includes(searchText.toLowerCase()),
            );
        },
        [searchText],
    );

    const visibleInterviewees: EnrichedInterviewee[] = searchInterviewees(selectedInterviewees);

    // handlers
    // effects
    useEffect(() => {
        if (visibleInterviewees.length <= 0) return;
        const interviewee = visibleInterviewees.reduce((min, current) => {
            return current.id < min.id ? current : min;
        }, visibleInterviewees[0]);
        onSelectApplicant(interviewee.id);
    }, [selectedInterviewLabel]);

    return (
        <div css={s_listContainer(height)}>
            <div css={s_titleContainer}>
                <span css={s_titleTextAndSelectionButtonContainer}>
                    <Text as="span" type="captionSemibold" textAlign="start">
                        {title}
                    </Text>
                    <Dropdown open={open} onOpenChange={setOpen}>
                        <Dropdown.Trigger asChild>
                            <Button variant="outlined" sx={s_selectionButton}>
                                {selectedInterviewLabel}
                            </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Content offsetX={11.7} offsetY={42}>
                            <InterviewTimeTable
                                interviewSchedules={interviewSchedules}
                                selectedInterviewLabel={selectedInterviewLabel}
                                onSelect={(label) => setSelectedInterviewLabel(label)}
                                onOpenChange={setOpen}
                            />
                        </Dropdown.Content>
                    </Dropdown>
                </span>
                <span>
                    <Input
                        variant="transparent"
                        startNode={
                            <Button variant="text" size="s" sx={s_searchButton}>
                                <Search width="1.5rem" height="1.5rem" css={s_searchSvg} />
                            </Button>
                        }
                        height="3rem"
                        inputSx={s_searchInput}
                        placeholder="이름 검색"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </span>
            </div>
            <div css={s_intervieweeCardGroupWrapper}>
                <div css={s_invervieweeCardContainer(visibleInterviewees.length !== 0)}>
                    {visibleInterviewees.length > 0 ? (
                        visibleInterviewees.map((interviewee) => (
                            <IntervieweeCard
                                key={interviewee.id}
                                name={interviewee.name}
                                email={interviewee.email}
                                onClick={() => onSelectApplicant(interviewee.id)}
                                isActivated={selectedApplicantId === interviewee.id}
                            />
                        ))
                    ) : (
                        <Text as="span" type="captionSemibold">
                            지원자가 없습니다.
                        </Text>
                    )}
                </div>
            </div>
        </div>
    );
}

export { IntervieweeList };
