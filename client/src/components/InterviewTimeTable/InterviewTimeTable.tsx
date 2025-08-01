import { Calendar, Divider, InterviewInformationButton, Text } from '@components';
import { convertDate } from '@utils/convertDate';
import React, { useCallback, useMemo, useState } from 'react';
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
        if (interviewSchedules.length > 0 && interviewSchedules[0].date)
            return interviewSchedules[0].date;
        return '';
    });

    // form hooks
    // query hooks
    // calculated values
    const scheduleMap = useMemo(() => {
        return new Map(interviewSchedules.map((schedule) => [schedule.date, schedule]));
    }, [interviewSchedules]);
    const scheduleToShow = scheduleMap.get(highlightedDate);

    const enabledDates = interviewSchedules.map((schedule) => schedule.date);

    // handlers
    const handleCalendar = (newSelected: string[]) => {
        setHighlightedDate(newSelected[0] ?? '');
    };

    const handleButtonClick = (label: string) => {
        if (onSelect) {
            onSelect(label); // 외부 제어
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
                <div
                    css={[
                        s_interviewInformationButtonGroupWrapper(Boolean(scheduleToShow)),
                        listSx,
                    ]}
                >
                    {scheduleToShow ? (
                        scheduleToShow.interviewSets.map((schedule) => {
                            const label = `${convertDate(scheduleToShow.date)} ${schedule.name}`;
                            return (
                                <InterviewInformationButton
                                    key={label}
                                    label={label}
                                    startTime={schedule.startTime}
                                    endTime={schedule.endTime}
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
