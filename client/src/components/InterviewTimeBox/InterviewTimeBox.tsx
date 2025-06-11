import { useInterviewSettingDialogContext } from '@components/InterviewSettingDialog/interviewSettingDialogContext';
import { Select } from '@components/Select';
import { Button, Divider, Text } from '@components/_common';
import { useToast } from '@hooks/useToast';
import { generateTimeRange } from '@utils/InterviewTimeBox/generateTime';
import React, { useState } from 'react';
import {
    baseBox,
    dividerCss,
    selectedTimeSection,
    s_applyButton,
    s_select,
    s_selectContent,
    s_selectTrigger,
    s_timeRangeSettingContainer,
    timeButtonCss,
    timeSelectSection,
} from './InterviewTimeBox.style';
import type { InterviewTimeBoxProps } from './types';

function InterviewTimeBox({
    selectedDate,
    selectedTimes,
    interval,
    isSelected,
    handleClick,
}: InterviewTimeBoxProps) {
    // prop destruction
    // lib hooks
    // initial values
    const { toast } = useToast();

    // state, ref, querystring hooks
    const { timeButtonList, setTimeButtonList } = useInterviewSettingDialogContext();
    const [startTime, setStartTime] = useState<string>('08:00');
    const [endTime, setEndTime] = useState<string>('22:00');

    // form hooks
    // query hooks
    // calculated values
    const timeItems = generateTimeRange('08:00', '22:00', interval);
    // handler
    // console.log(isSelected);
    const handleApply = () => {
        if (!interval) return;
        if (!isSelected) {
            toast.info('캘린더에서 날짜를 선택해주세요!', {
                toastTheme: 'white',
                position: 'topCenter',
            });
            alert('캘린더에서 날짜를 선택해주세요!');
            return;
        }
        const result = generateTimeRange(startTime, endTime, interval);
        setTimeButtonList(result);
    };

    // effects
    // useEffect(() => {
    //     if (selectedDate) {
    //         handleApply();
    //     }
    // }, [selectedDate]);

    return (
        <div css={baseBox}>
            <div css={timeSelectSection}>
                <Text as="span" type="captionSemibold">
                    면접 진행 시간
                </Text>
                <div css={s_timeRangeSettingContainer}>
                    <Select value={startTime} onValueChange={setStartTime} size="xs" sx={s_select}>
                        <Select.Trigger sx={s_selectTrigger}>
                            <Select.Value />
                        </Select.Trigger>
                        <Select.Content>
                            {timeItems.map((item) => (
                                <Select.Item key={item} value={item}>
                                    {item}
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select>
                    -
                    <Select value={endTime} onValueChange={setEndTime} size="xs" sx={s_select}>
                        <Select.Trigger sx={s_selectTrigger}>
                            <Select.Value />
                        </Select.Trigger>
                        <Select.Content sx={s_selectContent}>
                            {timeItems.map((item) => (
                                <Select.Item key={item} value={item}>
                                    {item}
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
                {selectedDate && (
                    <>
                        {timeButtonList.map((time) => (
                            <Button
                                key={time}
                                variant="outlined"
                                onClick={() => handleClick(time)}
                                sx={timeButtonCss(selectedTimes.includes(time))}
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
