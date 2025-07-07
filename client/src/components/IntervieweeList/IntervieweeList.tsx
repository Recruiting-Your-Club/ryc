import Search from '@assets/images/search.svg';
import { Button, Dropdown, Input, IntervieweeCard, InterviewTimeTable, Text } from '@components';
import { convertDate } from '@utils/convertDate';
import React, { useCallback, useState } from 'react';
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
import type { IntervieweeInformation, IntervieweeListProps } from './types';
import { filterQuery } from './utils/searchValue';

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
    const [selectedInterviewLabel, setSelectedInterviewLabel] = useState(
        `${convertDate(interviewSchedules[0].date)} ${interviewSchedules[0].interviewSets[0].name}` ||
            '지원자 없음',
    );
    const [query, setQuery] = useState('');

    // form hooks
    // query hooks
    // calculated values
    const selectedInterviewees = selectedInterviewLabel
        ? intervieweeList.filter(
              (interviewee) =>
                  `${convertDate(interviewee.interviewDate)} ${interviewee.interviewName}` ===
                  selectedInterviewLabel,
          )
        : intervieweeList;

    const filterInterviewees = useCallback(
        (applicants: IntervieweeInformation[]) => filterQuery(applicants, query),
        [query],
    );
    const filteredInterviewees: IntervieweeInformation[] = filterInterviewees(selectedInterviewees);

    // handlers
    // effects
    return (
        <div css={s_listContainer(height)}>
            <div css={s_titleContainer}>
                <span css={s_titleTextAndSelectionButtonContainer}>
                    <Text as="span" type="captionSemibold" textAlign="start">
                        {title}
                    </Text>
                    <Dropdown>
                        <Dropdown.Trigger asChild>
                            <Button variant="outlined" sx={s_selectionButton}>
                                {selectedInterviewLabel}
                            </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Content offsetX={11.7} offsetY={44}>
                            <InterviewTimeTable
                                interviewSchedules={interviewSchedules}
                                selectedInterviewLabel={selectedInterviewLabel}
                                onSelect={(label) => setSelectedInterviewLabel(label)}
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
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </span>
            </div>
            <div css={s_intervieweeCardGroupWrapper}>
                <div css={s_invervieweeCardContainer(filteredInterviewees.length !== 0)}>
                    {filteredInterviewees.length > 0 ? (
                        filteredInterviewees.map((interviewee) => (
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
