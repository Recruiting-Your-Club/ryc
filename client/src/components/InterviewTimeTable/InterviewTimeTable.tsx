import { Calendar, Divider, InterviewInformationButton, Text } from '@components';
import { convertDate } from '@utils/convertDate';
import React, { useState } from 'react';
import {
    s_calendar,
    s_interviewInformationButtonGroupWrapper,
    s_interviewTimeTableContainer,
    s_timeContentContainer,
} from './InterviewTimeTable.style';
import type { InterviewTimeTableProps } from './types';

function InterviewTimeTable({
    interviewSchedules,
    selectedInterviewLabel,
    onSelect,
    onOpenChange,
}: InterviewTimeTableProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    const [date, setDate] = useState<string[]>(() => {
        if (interviewSchedules.length > 0 && interviewSchedules[0].date) {
            return [interviewSchedules[0].date];
        }
        return [''];
    });

    // form hooks
    // query hooks
    // calculated values
    const scheduleToShow = interviewSchedules.find((schedule) => schedule.date === date[0]);
    const enabledDates = interviewSchedules.map((schedule) => schedule.date);

    // handlers
    const handleCalendar = (newSelected: string[]) => {
        setDate(newSelected);
    };

    const handleButtonClick = (label: string) => {
        onSelect(label);
        onOpenChange((prev) => !prev);
    };

    // effects

    return (
        <div css={s_interviewTimeTableContainer}>
            <Calendar
                mode="custom"
                onSelect={handleCalendar}
                selectedDate={enabledDates}
                highlightedDate={date}
                onlySelected
                size="sm"
                sx={s_calendar}
                shadow={false}
            />
            <Divider />
            <div css={s_timeContentContainer}>
                <Text as="span" type="bodyBold" textAlign="center">
                    {date}
                </Text>
                <div css={s_interviewInformationButtonGroupWrapper(Boolean(scheduleToShow))}>
                    {scheduleToShow ? (
                        scheduleToShow.interviewSets.map((schedule) => {
                            const label = `${convertDate(scheduleToShow.date)} ${schedule.name}`;
                            return (
                                <InterviewInformationButton
                                    key={label}
                                    label={label}
                                    startTime={schedule.startTime}
                                    endTime={schedule.endTime}
                                    // onClick={() => onSelect(label)}
                                    onClick={() => handleButtonClick(label)}
                                    isSelected={selectedInterviewLabel === label}
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
