import { Calendar, Divider, InterviewInformationButton, Text } from '@components';
import React, { useState } from 'react';
import {
    s_calendar,
    s_interviewInformationButtonGroupWrapper,
    s_interviewTimeTableContainer,
    s_timeContentContainer,
} from './InterviewTimeTable.style';
import type { InterviewTimeTableProps } from './types';

function InterviewTimeTable({ interviewSchedules }: InterviewTimeTableProps) {
    const [selectedDate, setSelectedDate] = useState<string[]>([
        interviewSchedules ? interviewSchedules[0].date : '',
    ]);

    const scheduleToShow = interviewSchedules.find((schedule) => schedule.date === selectedDate[0]);
    const enabledDates = interviewSchedules.map((schedule) => schedule.date);

    const convertDate = (date: string) => {
        const [, month, day] = date.split('-');
        return `${month}.${day}`;
    };
    return (
        <div css={s_interviewTimeTableContainer}>
            <Calendar
                mode="custom"
                onSelect={(date) => setSelectedDate(date)}
                selectedDate={selectedDate}
                highlightedDate={enabledDates}
                size="sm"
                sx={s_calendar}
                shadow={false}
            />
            <Divider />
            <div css={s_timeContentContainer}>
                <Text as="span" type="bodyBold" textAlign="center">
                    {selectedDate}
                </Text>
                <div css={s_interviewInformationButtonGroupWrapper(Boolean(scheduleToShow))}>
                    {scheduleToShow ? (
                        scheduleToShow.interviewSets.map((schedule) => (
                            <InterviewInformationButton
                                key={schedule.name}
                                date={convertDate(scheduleToShow.date)}
                                title={schedule.name}
                                startTime={schedule.startTime}
                                endTime={schedule.endTime}
                            />
                        ))
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
