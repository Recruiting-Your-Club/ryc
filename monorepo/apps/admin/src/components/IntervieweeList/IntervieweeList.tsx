import { IntervieweeCard, InterviewTimeTable } from '@components';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';

import Search from '@ssoc/assets/images/search.svg';
import { Button, Dropdown, Input, Text } from '@ssoc/ui';

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
import type { EnrichedInterviewee, IntervieweeListProps, SelectedLabel } from './types';

function IntervieweeList({
    title = '지원자 목록',
    height,
    intervieweeList,
    interviewSlots,
    selectedApplicantId,
    onSelectApplicantId,
    onInterviewSlotId,
}: IntervieweeListProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    const [selectedInterviewLabel, setSelectedInterviewLabel] = useState<SelectedLabel>(() => {
        if (interviewSlots[0]) {
            const date = dayjs(interviewSlots[0].period.startDate).format('MM월 DD일');
            const name = dayjs(interviewSlots[0].period.startDate).format('HH:mm');
            return { label: `${date} ${name}`, interviewSlotId: interviewSlots[0].id };
        }
        return { label: '면접 일정 없음', interviewSlotId: '' };
    });

    const [searchText, setSearchText] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);

    // form hooks
    // query hooks
    // calculated values
    const selectedInterviewees = useMemo(() => {
        if (!selectedInterviewLabel.interviewSlotId) return [];
        return intervieweeList.filter(
            (interviewee) => interviewee.interviewName === selectedInterviewLabel.interviewSlotId,
        );
    }, [selectedInterviewLabel.interviewSlotId, intervieweeList]);

    const visibleInterviewees: EnrichedInterviewee[] = useMemo(() => {
        return selectedInterviewees.filter((value) =>
            value.name.toLowerCase().includes(searchText.toLowerCase()),
        );
    }, [selectedInterviewees, searchText]);

    // handlers
    // effects
    useEffect(() => {
        if (visibleInterviewees.length <= 0) return;

        onSelectApplicantId(visibleInterviewees[0].applicantId);
    }, [visibleInterviewees]);

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
                                {selectedInterviewLabel.label}
                            </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <InterviewTimeTable
                                interviewSlots={interviewSlots}
                                selectedInterviewSlotId={selectedInterviewLabel.interviewSlotId}
                                onSelect={(label) => {
                                    const matchedSlot = interviewSlots.find((slot) => {
                                        const date = dayjs(slot.period.startDate).format(
                                            'MM월 DD일',
                                        );
                                        const time = dayjs(slot.period.startDate).format('HH:mm');
                                        return `${date} ${time}` === label;
                                    });

                                    setSelectedInterviewLabel({
                                        label,
                                        interviewSlotId: matchedSlot ? matchedSlot.id : '',
                                    });
                                    onInterviewSlotId(matchedSlot ? matchedSlot.id : '');
                                }}
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
                                key={interviewee.applicantId}
                                name={interviewee.name}
                                email={interviewee.email}
                                imageUrl={
                                    interviewee.imageAllowed && interviewee.imagePresent
                                        ? interviewee.profileImage?.url
                                        : ''
                                }
                                onClick={() => onSelectApplicantId(interviewee.applicantId)}
                                isActivated={selectedApplicantId === interviewee.applicantId}
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
