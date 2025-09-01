import type { InterviewInformation } from '@components/InterviewSettingDialog/types';
import { DEFAULT_END_TIME, DEFAULT_START_TIME } from '@constants/interviewSettingDialog';
import React, { useCallback, useEffect, useMemo } from 'react';

import { useToast } from '@ssoc/ui';
import { Button, Divider, Select, Text } from '@ssoc/ui';

import { useInterviewSettingDialogContext } from '../InterviewSettingDialog/InterviewSettingDialogContext';
import {
    baseBox,
    dividerCss,
    s_applyButton,
    s_select,
    s_selectContent,
    s_selectTrigger,
    s_timeRangeSettingContainer,
    selectedTimeSection,
    timeButtonCss,
    timeSelectSection,
} from './InterviewTimeBox.style';
import { generateTimeRange } from './utils/generateTime';

const getIntervalInMinutes = (perTime: string): number => {
    const numeric = Number(perTime.replace(/[^0-9]/g, '')); // 숫자만 추출
    if (perTime.includes('시간')) return numeric * 60;
    return numeric;
};

function InterviewTimeBox() {
    // prop destruction
    // lib hooks
    const {
        numberValue,
        timeValue,
        timeButtonList,
        setTimeButtonList,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        interviewInformation,
        setInterviewInformation,
        currentDate,
    } = useInterviewSettingDialogContext();
    const { toast } = useToast();

    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    const selectedTimes = useMemo(() => {
        return interviewInformation[currentDate]?.selectedTimeList || [];
    }, [interviewInformation, currentDate]);

    const interval = useMemo((): number => {
        const value = Number(timeValue.replace(/분|시간/g, ''));
        if (value === 1) return 60;
        return value;
    }, [timeValue]);

    const timeItems = useMemo(() => {
        return generateTimeRange(DEFAULT_START_TIME, DEFAULT_END_TIME, interval).map((time) => ({
            value: time,
            label: time,
        }));
    }, [interval]);

    // handler
    const handleApply = () => {
        if (!interval) return;
        if (!currentDate) {
            toast('캘린더에서 날짜를 선택해주세요!', { type: 'error' });
            return;
        }
        const result = generateTimeRange(startTime, endTime, interval).slice(0, -1);

        setInterviewInformation((prev) => {
            if (prev[currentDate]) {
                return {
                    ...prev,
                    [currentDate]: {
                        ...prev[currentDate],
                        maxNumber: numberValue,
                        perTime: timeValue,
                        startTime: startTime,
                        endTime: endTime,
                        selectedTimeList: [],
                    },
                };
            }

            return { ...prev };
        });
        setTimeButtonList(result);
    };

    const handleTimeClick = useCallback(
        (time: string) => {
            // 적용 버튼이 눌린 후 시간을 클릭한 상황
            // 시간을 눌러야 데이터가 저장되기 시작함
            setInterviewInformation((prev) => {
                const prevInfo: InterviewInformation = prev[currentDate] ?? {
                    date: currentDate,
                    maxNumber: numberValue,
                    perTime: timeValue,
                    startTime: startTime,
                    endTime: endTime,
                    selectedTimeList: [],
                };

                const isSelected = prevInfo.selectedTimeList.includes(time);
                const updatedTimes = isSelected
                    ? prevInfo.selectedTimeList.filter((t) => t !== time)
                    : [...prevInfo.selectedTimeList, time];

                return { ...prev, [currentDate]: { ...prevInfo, selectedTimeList: updatedTimes } };
            });
        },
        [currentDate, numberValue, timeValue, startTime, endTime],
    );

    // effects
    useEffect(() => {
        // 날짜 선택을 변경하였는데, 기존 데이터를 불러와야하는 경우
        if (currentDate && selectedTimes?.length > 0) {
            const { perTime, startTime, endTime } = interviewInformation[currentDate];
            const newInterval = getIntervalInMinutes(perTime);
            const result = generateTimeRange(startTime, endTime, newInterval);
            setTimeButtonList(result);
        }
    }, [currentDate]);

    return (
        <div css={baseBox}>
            <div css={timeSelectSection}>
                <Text as="span" type="captionSemibold">
                    면접 진행 시간
                </Text>
                <div css={s_timeRangeSettingContainer}>
                    <Select
                        value={startTime}
                        onValueChange={setStartTime}
                        options={timeItems}
                        size="xs"
                        sx={s_select}
                    >
                        <Select.Trigger sx={s_selectTrigger}>
                            <Select.Value />
                        </Select.Trigger>
                        <Select.Content>
                            {timeItems.map(({ value, label }) => (
                                <Select.Item key={value} value={value}>
                                    {label}
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select>
                    -
                    <Select
                        value={endTime}
                        onValueChange={setEndTime}
                        options={timeItems}
                        size="xs"
                        sx={s_select}
                    >
                        <Select.Trigger sx={s_selectTrigger}>
                            <Select.Value />
                        </Select.Trigger>
                        <Select.Content sx={s_selectContent}>
                            {timeItems.map(({ value, label }) => (
                                <Select.Item key={value} value={value}>
                                    {label}
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select>
                    <Button onClick={handleApply} size="xl" sx={s_applyButton}>
                        적용
                    </Button>
                </div>
            </div>
            <Divider sx={dividerCss} />
            <div css={selectedTimeSection}>
                {currentDate && (
                    <>
                        {timeButtonList.map((time) => (
                            <Button
                                key={time}
                                variant="outlined"
                                onClick={() => handleTimeClick(time)}
                                sx={timeButtonCss(selectedTimes?.includes(time))}
                            >
                                {time}
                            </Button>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}

export { InterviewTimeBox };
