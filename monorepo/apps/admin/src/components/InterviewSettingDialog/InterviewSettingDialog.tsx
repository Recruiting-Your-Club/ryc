import type { InterviewDetailInformation } from '@api/domain/email/types';
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
    handleInterviewEmail,
}: InterviewSettingDialogProps) {
    // prop destruction
    // lib hooks
    const { toast } = useToast();
    // initial values
    // state, ref, querystring hooks
    const [numberValue, setNumberValue] = useState<string>('');
    const [timeValue, setTimeValue] = useState<string>('');
    const [startTime, setStartTime] = useState<string>(DEFAULT_START_TIME);
    const [endTime, setEndTime] = useState<string>(DEFAULT_END_TIME);

    const [timeButtonList, setTimeButtonList] = useState<string[]>([]);
    const [selectedDates, setSelectedDates] = useState<string[]>([]);
    const [highlightedDate, setHighlightedDate] = useState<string[]>([]);
    const [currentDate, setCurrentDate] = useState<string>('');
    const [interviewInformation, setInterviewInformation] = useState<
        Record<string, InterviewInformation>
    >({});

    const [currentStep, setCurrentStep] = useState(1);

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

    const interviewDetailInformationList = useMemo<InterviewDetailInformation[]>(() => {
        const result: InterviewDetailInformation[] = [];

        Object.entries(interviewInformation).forEach(([date, info]) => {
            info.selectedTimeList.forEach((time) => {
                const startDate = dayjs(`${date}T${time}`).format('YYYY-MM-DDTHH:mm');

                result.push({
                    start: startDate,
                    interviewDuration: Number(info.perTime),
                    numberOfPeople: Number(info.maxNumber),
                });
            });
        });

        return result;
    }, [interviewInformation]);

    // handler
    const handleReset = () => {
        setTimeValue(DEFAULT_TIME_VALUE);
        setNumberValue(DEFAULT_NUMBER_VALUE);
        setStartTime(DEFAULT_START_TIME);
        setEndTime(DEFAULT_END_TIME);
        setInterviewInformation({});
        setSelectedDates([]);
        setHighlightedDate([]);
    };

    const handleDates = (newDates: string[]) => {
        const newDate = newDates[0];
        const prevDate = highlightedDate[0];

        if (dayjs(newDate).isBefore(dayjs(), 'day')) {
            toast('현재 날짜보다 이전의 날짜는 선택할 수 없어요.', {
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

    // const handleSendEmail = async () => {
    //     let contentToSend = emailContent;

    //     try {
    //         contentToSend = await convertImageToBase64(emailContent);
    //     } catch (error) {
    //         // 변환 실패 -> 원본 이미지 사용 (다른 이미지는 변환 계속)
    //         // eslint-disable-next-line no-empty
    //     }

    //     if (await handleInterviewEmail(interviewDetailInformationList, emailTitle, contentToSend)) {
    //         handleReset();
    //         handleResetContent();
    //         handleClose();
    //     }
    // };

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
                                4. 선택하신 범위 내에서 진행 시간 단위로 슬롯이 자동으로 만들어져요. 원하는 슬롯을 선택해주세요.'
                                5. 다른 날짜도 같은 방식으로 설정하신 후 추가되면 일정이 확정돼요.\n
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
                                            onClick={() => {
                                                setTimeValue(value);
                                                setCurrentStep(2);
                                            }}
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
                    <Button size="md" variant="outlined" onClick={handleReset} sx={s_actionButton}>
                        초기화
                    </Button>
                    <Button size="md" onClick={handleClose} sx={s_actionButton}>
                        추가
                    </Button>
                </Dialog.Action>
            </Dialog>
        </InterviewSettingDialogContext.Provider>
    );
}
export { InterviewSettingDialog };
