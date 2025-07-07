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
    applicantList,
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
    const selectedApplicants = selectedInterviewLabel
        ? applicantList.filter(
              (applicant) =>
                  `${convertDate(applicant.interviewDate)} ${applicant.interviewName}` ===
                  selectedInterviewLabel,
          )
        : applicantList;

    const filterApplicants = useCallback(
        (applicants: IntervieweeInformation[]) => filterQuery(applicants, query),
        [query],
    );
    const filteredApplicants: IntervieweeInformation[] = filterApplicants(selectedApplicants);

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
                <div css={s_invervieweeCardContainer(filteredApplicants.length !== 0)}>
                    {filteredApplicants.length > 0 ? (
                        filteredApplicants.map((applicant) => (
                            <IntervieweeCard
                                key={applicant.id}
                                name={applicant.name}
                                email={applicant.email}
                                onClick={() => onSelectApplicant(applicant.id)}
                                isActivated={selectedApplicantId === applicant.id}
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
