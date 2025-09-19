import type { InterviewRequest, SlotDetailRequest } from '@api/domain/interview/types';
import Info from '@assets/images/info.svg';
import XIcon from '@assets/images/xIcon.svg';
import { InterviewTimeBox } from '@components';
import {
    DEFAULT_END_TIME,
    DEFAULT_NUMBER_VALUE,
    DEFAULT_START_TIME,
    DEFAULT_TIME_VALUE,
    numberOptions,
    timeOptions,
} from '@constants/interviewSettingDialog';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';

import { Button, Calendar, Dialog, Divider, Text, Tooltip, useToast } from '@ssoc/ui';

import {
    s_action,
    s_actionButton,
    s_buttonGrid,
    s_calendar,
    s_content,
    s_contentText,
    s_dialog,
    s_header,
    s_informationContainer,
    s_informSvg,
    s_informSvgWrapper,
    s_numberButton,
    s_perInformationContainer,
    s_selectContainer,
    s_stepContainer,
    s_textAndTooltipContainer,
    s_tooltipContent,
} from './InterviewSettingDialog.style';
import { InterviewSettingDialogContext } from './InterviewSettingDialogContext';
import type { InterviewInformation, InterviewSettingDialogProps } from './types';

function InterviewSettingDialog({
    open,
    handleClose,
    handlePostInterviewSlot,
    initialTimePeriod,
}: InterviewSettingDialogProps) {
    // prop destruction
    // lib hooks
    const { toast } = useToast();
    // initial values
    // state, ref, querystring hooks
    const [numberValue, setNumberValue] = useState<string>('');
    const [timeValue, setTimeValue] = useState<string>(initialTimePeriod);
    const [startTime, setStartTime] = useState<string>(DEFAULT_START_TIME);
    const [endTime, setEndTime] = useState<string>(DEFAULT_END_TIME);

    const [timeButtonList, setTimeButtonList] = useState<string[]>([]);
    const [selectedDates, setSelectedDates] = useState<string[]>([]);
    const [highlightedDate, setHighlightedDate] = useState<string[]>([]);
    const [currentDate, setCurrentDate] = useState<string>('');
    const [interviewInformation, setInterviewInformation] = useState<
        Record<string, InterviewInformation>
    >({});

    const [currentStep, setCurrentStep] = useState(initialTimePeriod === '' ? 1 : 2);

    // form hooks
    // query hooks
    // calculated values
    const contextValue = useMemo(
        () => ({
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
        }),
        [
            numberValue,
            timeValue,
            timeButtonList,
            startTime,
            endTime,
            interviewInformation,
            currentDate,
        ],
    );

    const interviewDetailInformationList = useMemo<InterviewRequest>(() => {
        const slotDetailRequests: SlotDetailRequest[] = [];

        Object.entries(interviewInformation).forEach(([date, info]) => {
            info.selectedTimeList.forEach((time) => {
                const start = dayjs(`${date}T${time}`).format('YYYY-MM-DDTHH:mm');

                slotDetailRequests.push({
                    start,
                    maxPeopleCount: Number(info.maxNumber),
                });
            });
        });

        const interviewDuration = Object.values(interviewInformation)[0]?.perTime
            ? Number(Object.values(interviewInformation)[0].perTime)
            : 0;

        return {
            slotDetailRequests,
            interviewDuration,
        };
    }, [interviewInformation]);

    // handler
    const handleResetToBlank = () => {
        setTimeValue(initialTimePeriod);
        setNumberValue('');
        setCurrentStep(initialTimePeriod === '' ? 1 : 2);
        setStartTime(DEFAULT_START_TIME);
        setEndTime(DEFAULT_END_TIME);
        setInterviewInformation({});
        setSelectedDates([]);
        setHighlightedDate([]);
    };

    const handleReset = (resetNumberValue: boolean = true) => {
        setTimeValue(DEFAULT_TIME_VALUE);
        if (resetNumberValue) setNumberValue(DEFAULT_NUMBER_VALUE);
        setCurrentStep(initialTimePeriod === '' ? 1 : 2);
        setStartTime(DEFAULT_START_TIME);
        setEndTime(DEFAULT_END_TIME);
        setInterviewInformation({});
        setSelectedDates([]);
        setHighlightedDate([]);
    };

    const handleDates = (newDates: string[]) => {
        const newDate = newDates[0];
        const prevDate = highlightedDate[0];

        if (dayjs(newDate).isSame(dayjs(), 'day') || dayjs(newDate).isBefore(dayjs(), 'day')) {
            toast('오늘 또는 이전 날짜는 선택할 수 없어요.', {
                type: 'error',
                toastTheme: 'black',
            });
            return;
        }

        if (prevDate) {
            const shouldRemovePrev =
                !interviewInformation[prevDate] ||
                interviewInformation[prevDate].selectedTimeList.length === 0;

            if (shouldRemovePrev)
                setSelectedDates((prev) => prev.filter((date) => date !== prevDate));
        }

        setHighlightedDate([newDate]);
        setSelectedDates((prev) => (prev.includes(newDate) ? prev : [...prev, newDate]));
    };

    const handleAddInterviewSlot = async () => {
        if (await handlePostInterviewSlot(interviewDetailInformationList)) {
            handleResetToBlank();
            handleClose();
        }
    };

    const handlePerTime = (value: string) => {
        const hasInterviewInfo = Object.keys(interviewInformation).length > 0;

        if (currentStep === 3 && hasInterviewInfo && initialTimePeriod === '') {
            handleReset(false);
            toast('면접 날짜와 시간이 초기화 되었어요!', {
                toastTheme: 'black',
                type: 'info',
            });
        }

        setTimeValue(value);
        setCurrentStep(currentStep === 3 ? 3 : 2);
    };

    // effects
    useEffect(() => {
        setCurrentDate(highlightedDate.at(-1)!);
        setTimeButtonList([]);
    }, [highlightedDate]);

    // 현재 날짜에 알맞은 정보를 불러옴
    useEffect(() => {
        const info = interviewInformation[currentDate];
        if (!info) return;

        setTimeValue(info.perTime);
        setNumberValue(info.maxNumber);
        setStartTime(info.startTime);
        setEndTime(info.endTime);
    }, [currentDate, interviewInformation]);

    // 면접 당 진행 시간 변경 시 startTime과 endTime 초기화
    useEffect(() => {
        const info = interviewInformation[currentDate];

        // 기존 값이 없거나 기존 perTime 값에서 사용자가 직접 변경하는 경우
        if (!info || info?.perTime !== timeValue) {
            setStartTime(DEFAULT_START_TIME);
            setEndTime(DEFAULT_END_TIME);
        }
    }, [timeValue]);

    useEffect(() => {
        setTimeValue(initialTimePeriod);
        setCurrentStep(initialTimePeriod === '' ? 1 : 2);
    }, [initialTimePeriod]);

    return (
        <InterviewSettingDialogContext.Provider value={contextValue}>
            <Dialog open={open} handleClose={handleClose} size="full" sx={s_dialog}>
                <Dialog.Header position="start" sx={s_header}>
                    <span css={s_textAndTooltipContainer}>
                        <Text as="span" type="bodyBold" sx={{ paddingTop: '0.3rem' }}>
                            면접 일정 추가
                        </Text>
                        <Tooltip
                            content={`
                                1. 면접 당 진행 시간과 면접 당 최대 인원 수를 먼저 정해주세요.\n
                                2. 면접 날짜를 선택해주세요. (예: 9월 1일)\n
                                3. 해당 날짜의 첫 시작 시간과 마지막 종료 시간을 선택해주세요. (예: 오전 10시 ~ 오후 3시)\n
                                4. 선택하신 범위 내에서 진행 시간 단위로 슬롯이 자동으로 만들어져요. 원하는 슬롯을 선택해주세요.'\n
                                5. 다른 날짜도 같은 방식으로 설정하신 후 추가되면 일정이 확정돼요.\n
                                🚨 주의! 면접 당 진행 시간은 항상 동일하게 설정해주셔야 해요 🚨\n
                                `}
                            direction="bottom"
                            wrapperSx={s_informSvgWrapper}
                            tooltipSx={s_tooltipContent}
                        >
                            <Info css={s_informSvg} />
                        </Tooltip>
                    </span>
                    <Button
                        variant="transparent"
                        size="xs"
                        aria-label="close"
                        onClick={handleClose}
                    >
                        <XIcon alt="close" />
                    </Button>
                </Dialog.Header>
                <Divider color="black" sx={{ borderTop: '1px solid' }} />
                <Dialog.Content sx={s_content}>
                    <div css={s_selectContainer}>
                        {currentStep >= 1 && (
                            <div css={[s_perInformationContainer, s_stepContainer]}>
                                <Text
                                    as="span"
                                    type="captionSemibold"
                                    textAlign="start"
                                    sx={s_contentText}
                                >
                                    면접을 보는 시간 간격은 어떻게 되나요?
                                </Text>
                                <div css={s_buttonGrid}>
                                    {timeOptions.map(({ value, label }) => (
                                        <Button
                                            key={value}
                                            size="md"
                                            variant="outlined"
                                            sx={s_numberButton(timeValue === value)}
                                            onClick={() => handlePerTime(value)}
                                            disabled={
                                                initialTimePeriod !== '' &&
                                                value !== initialTimePeriod
                                            }
                                        >
                                            {label}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {currentStep >= 2 && (
                            <div css={[s_perInformationContainer, s_stepContainer]}>
                                <Text
                                    as="span"
                                    type="captionSemibold"
                                    textAlign="start"
                                    sx={s_contentText}
                                >
                                    면접을 보는 인원은 시간 당 몇 명인가요?
                                </Text>
                                <div css={s_buttonGrid}>
                                    {numberOptions.map(({ value, label }) => (
                                        <Button
                                            key={value}
                                            size="md"
                                            variant="outlined"
                                            sx={s_numberButton(numberValue === value)}
                                            onClick={() => {
                                                setNumberValue(value);
                                                setCurrentStep(3);
                                            }}
                                        >
                                            {label}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {currentStep >= 3 && (
                            <div css={[s_informationContainer, s_stepContainer]}>
                                <Text as="span" type="captionSemibold" textAlign="start">
                                    면접 날짜와 시간을 선택해주세요.
                                </Text>
                                <Calendar
                                    mode="custom"
                                    size="sm"
                                    selectedDate={selectedDates}
                                    onSelect={handleDates}
                                    highlightedDate={highlightedDate}
                                    sx={s_calendar}
                                />
                                <InterviewTimeBox />
                            </div>
                        )}
                    </div>
                </Dialog.Content>
                <Dialog.Action sx={s_action}>
                    <Button
                        size="md"
                        variant="outlined"
                        onClick={() => {
                            handleResetToBlank();
                            toast('설정하신 면접 정보가 초기화 되었어요!', {
                                toastTheme: 'black',
                                type: 'info',
                            });
                        }}
                        sx={s_actionButton}
                    >
                        초기화
                    </Button>
                    <Button size="md" onClick={handleAddInterviewSlot} sx={s_actionButton}>
                        추가
                    </Button>
                </Dialog.Action>
            </Dialog>
        </InterviewSettingDialogContext.Provider>
    );
}
export { InterviewSettingDialog };
