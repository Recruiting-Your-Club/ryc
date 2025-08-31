import Info from '@assets/images/info.svg';
import type { InterviewInformation } from '@components/InterviewSettingDialog/types';
import { DEFAULT_END_TIME, DEFAULT_START_TIME } from '@constants/interviewSettingDialog';
import React, { useCallback, useEffect, useMemo } from 'react';

import { Tooltip, useToast } from '@ssoc/ui';
import { Button, Divider, Select, Text } from '@ssoc/ui';

import { useInterviewSettingDialogContext } from '../InterviewSettingDialog/InterviewSettingDialogContext';
import {
    baseBox,
    dividerCss,
    s_applyButton,
    s_informSvg,
    s_informSvgWrapper,
    s_select,
    s_selectContent,
    s_selectTrigger,
    s_textAndTooltipContainer,
    s_timeRangeSettingContainer,
    s_tooltipContent,
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
                <span css={s_textAndTooltipContainer}>
                    <Text as="span" type="captionSemibold">
                        면접 진행 시간
                    </Text>
                    <Tooltip
                        content={`1. 면접 날짜를 선택하세요. (예: 9월 1일)\n
                            2. 각 면접의 진행 시간을 정하세요. (예: 30분)\n
                            3. 해당 날짜의 첫 시작 시간과 마지막 종료 시간을 선택하세요. (예: 오전 10시 ~ 오후 3시)\n
                            4. 선택된 범위 내에서 진행 시간 단위로 슬롯이 자동 생성됩니다. 원하는 슬롯을 선택해 확정하세요.\n
                            5. 다른 날짜도 동일한 방식으로 설정하면, 모든 면접 일정이 확정됩니다.`}
                        direction="right"
                        wrapperSx={s_informSvgWrapper}
                        tooltipSx={s_tooltipContent}
                    >
                        <Info css={s_informSvg} />
                    </Tooltip>
                </span>
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
