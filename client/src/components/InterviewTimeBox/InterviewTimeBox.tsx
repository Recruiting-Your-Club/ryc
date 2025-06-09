import { Button, Divider, Text } from '@components/_common';
import { generateTimeRange } from '@utils/InterviewTimeBox/generateTime';
import React, { useEffect, useState } from 'react';
import {
    baseBox,
    buttonCss,
    dividerCss,
    resetButtonWrapper,
    selectedTimeSection,
    timeButtonCss,
    timeSelectSection,
} from './InterviewTimeBox.style';
import type { InterviewTimeBoxProps } from './types';

function InterviewTimeBox({
    selectedDate,
    selectedTimes,
    interval,
    handleClick,
    handleReset,
}: InterviewTimeBoxProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    const [timeButtonList, setTimeButtonList] = useState<string[]>([]);

    // form hooks
    // query hooks
    // calculated values
    // handler
    const handleApply = () => {
        if (!interval) return;
        const result = generateTimeRange('00:00', '24:00', interval);
        setTimeButtonList(result);
    };

    // effects
    useEffect(() => {
        if (selectedDate) {
            handleApply();
        }
    }, [selectedDate]);

    return (
        <div css={baseBox}>
            <div css={timeSelectSection}>
                <Text as="span" type="captionSemibold">
                    면접 진행 시간
                </Text>
                <div css={resetButtonWrapper}>
                    <Button onClick={handleReset} variant="transparent" size="xl" sx={buttonCss}>
                        초기화
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
