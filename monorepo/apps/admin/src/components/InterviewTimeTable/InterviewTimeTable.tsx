import { InterviewInformationButton } from '@components';
import dayjs from 'dayjs';
import React, { useState } from 'react';

import { Calendar, Divider, Text } from '@ssoc/ui';

import {
    s_calendar,
    s_interviewInformationButtonGroupWrapper,
    s_interviewTimeTableContainer,
    s_timeContentContainer,
} from './InterviewTimeTable.style';
import type { InterviewTimeTableProps } from './types';

function InterviewTimeTable({
    interviewSlots,
    selectedInterviewSlotId,
    onSelect,
    setSelectedLabel,
    onOpenChange,
    sx,
    timeContentSx,
    listSx,
}: InterviewTimeTableProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    const [highlightedDate, setHighlightedDate] = useState<string>(() => {
        if (interviewSlots.length > 0 && interviewSlots[0].period.startDate)
            return dayjs(interviewSlots[0].period.startDate).format('YYYY-MM-DD');
        return '';
    });

    // form hooks
    // query hooks
    // calculated values
    const slotsToShow = interviewSlots.filter(
        (slot) => dayjs(slot.period.startDate).format('YYYY-MM-DD') === highlightedDate,
    );

    const enabledDates = interviewSlots.map((slot) =>
        dayjs(slot.period.startDate).format('YYYY-MM-DD'),
    );

    // handlers
    const handleCalendar = (newSelected: string[]) => {
        setHighlightedDate(newSelected[0] ?? '');
    };

    const handleButtonClick = (slotId: string, label: string) => {
        if (onSelect) {
            onSelect({ slotId, label }); // 외부 제어
        } else if (setSelectedLabel) {
            setSelectedLabel(label); // 내부 기본 동작
            onOpenChange?.(false);
        }
    };
    // effects

    return (
        <div css={[s_interviewTimeTableContainer, sx]}>
            <Calendar
                mode="custom"
                onSelect={handleCalendar}
                selectedDate={enabledDates}
                highlightedDate={[highlightedDate]}
                onlySelected
                size="sm"
                sx={s_calendar}
                shadow={false}
            />
            <Divider />
            <div css={[s_timeContentContainer, timeContentSx]}>
                <Text as="span" type="bodyBold" textAlign="center">
                    {highlightedDate}
                </Text>
                <div css={[s_interviewInformationButtonGroupWrapper(Boolean(slotsToShow)), listSx]}>
                    {slotsToShow.length > 0 ? (
                        slotsToShow.map((slot) => {
                            const startTime = dayjs(slot.period.startDate).format('HH:mm');
                            const endTime = dayjs(slot.period.endDate).format('HH:mm');
                            const label = `${dayjs(highlightedDate).format('MM월 DD일')} ${startTime}`;

                            return (
                                <InterviewInformationButton
                                    key={slot.id}
                                    label={label}
                                    startTime={startTime}
                                    endTime={endTime}
                                    onClick={() => handleButtonClick(slot.id, label)}
                                    isSelected={selectedInterviewSlotId === slot.id}
                                />
                            );
                        })
                    ) : (
                        <Text as="span" type="captionSemibold">
                            등록된 면접 일정이 없습니다.
                        </Text>
                    )}
                </div>
            </div>
        </div>
    );
}

export { InterviewTimeTable };
