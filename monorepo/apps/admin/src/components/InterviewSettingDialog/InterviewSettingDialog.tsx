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
import { convertImageToBase64 } from '@utils/convertImageToBase64';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';

import {
    Button,
    Calendar,
    Dialog,
    Divider,
    Editor,
    Input,
    Select,
    Text,
    Tooltip,
    useToast,
} from '@ssoc/ui';

import {
    s_calendar,
    s_content,
    s_contentWrapper,
    s_dialog,
    s_editorRoot,
    s_editorTextarea,
    s_editorToolbar,
    s_emailContainer,
    s_emptyPlace,
    s_header,
    s_informationContainer,
    s_informSvg,
    s_informSvgWrapper,
    s_input,
    s_perInformationContainer,
    s_resetButton,
    s_select,
    s_selectContainer,
    s_selectTrigger,
    s_submitButtonWrapper,
    s_textAndTooltipContainer,
    s_titleInput,
    s_titleWrapper,
    s_tooltipContent,
    s_verticalDivider,
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
    const [numberValue, setNumberValue] = useState<string>(DEFAULT_NUMBER_VALUE);
    const [timeValue, setTimeValue] = useState<string>(DEFAULT_TIME_VALUE);
    const [startTime, setStartTime] = useState<string>(DEFAULT_START_TIME);
    const [endTime, setEndTime] = useState<string>(DEFAULT_END_TIME);

    const [timeButtonList, setTimeButtonList] = useState<string[]>([]);
    const [selectedDates, setSelectedDates] = useState<string[]>([]);
    const [highlightedDate, setHighlightedDate] = useState<string[]>([]);
    const [currentDate, setCurrentDate] = useState<string>('');
    const [interviewInformation, setInterviewInformation] = useState<
        Record<string, InterviewInformation>
    >({});

    const [emailTitle, setEmailTitle] = useState<string>('');
    const [emailContent, setEmailContent] = useState<string>('');

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

    const handleResetContent = () => {
        setEmailTitle('');
        setEmailContent('');
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

    const handleSendEmail = async () => {
        let contentToSend = emailContent;

        try {
            contentToSend = await convertImageToBase64(emailContent);
        } catch (error) {
            // 변환 실패 -> 원본 이미지 사용 (다른 이미지는 변환 계속)
            // eslint-disable-next-line no-empty
        }

        if (handleInterviewEmail(interviewDetailInformationList, emailTitle, contentToSend)) {
            handleReset();
            handleResetContent();
            handleClose();
        }
        // if (
        //     !open &&
        //     interviewDetailInformationList.length !== 0 &&
        //     emailTitle.length !== 0 &&
        //     contentToSend.length !== 0
        // ) {
        //     handleReset();
        //     handleResetContent();
        // }
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
        if (!emailContent) return;

        convertImageToBase64(emailContent).then((convertedHtml) => {
            setEmailContent(convertedHtml);
        });
    }, [emailContent]);

    return (
        <InterviewSettingDialogContext.Provider value={contextValue}>
            <Dialog open={open} handleClose={handleClose} size="full" sx={s_dialog}>
                <Dialog.Header position="start" sx={s_header}>
                    <span css={s_textAndTooltipContainer}>
                        <Text as="span" type="bodyBold" sx={{ paddingTop: '0.3rem' }}>
                            면접 일정 설정 후 보내기
                        </Text>
                        <Tooltip
                            content={`
                                1. 면접 최대 인원 수와 면접 당 진행 시간을 먼저 정해주세요.\n
                                2. 면접 날짜를 선택해주세요. (예: 9월 1일)\n
                                3. 해당 날짜의 첫 시작 시간과 마지막 종료 시간을 선택해주세요. (예: 오전 10시 ~ 오후 3시)\n
                                4. 선택하신 범위 내에서 진행 시간 단위로 슬롯이 자동으로 만들어져요. 원하는 슬롯을 선택해 확정해주세요.\n
                                5. 다른 날짜도 같은 방식으로 설정하시면 모든 면접 일정이 확정돼요.\n
                                6. 마지막으로 이메일 제목과 내용 모두 작성하신 뒤, '이메일 보내기' 버튼을 눌러주세요!\n
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
                        <Text as="span" type="h4Bold" textAlign="start">
                            상세 면접 정보
                        </Text>
                        <div css={s_perInformationContainer}>
                            <Text as="span" type="bodyBold" textAlign="start">
                                면접 최대 인원 수
                            </Text>
                            <Text as="span" type="captionRegular" textAlign="start">
                                한 면접 당 최대 인원 수를 정해요.
                            </Text>
                            <Select
                                value={numberValue}
                                onValueChange={setNumberValue}
                                size="xs"
                                sx={s_select}
                                options={numberOptions}
                            >
                                <Select.Trigger sx={s_selectTrigger}>
                                    <Select.Value />
                                </Select.Trigger>
                                <Select.Content>
                                    {numberOptions.map(({ value, label }) => (
                                        <Select.Item key={value} value={value}>
                                            {label}
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select>
                        </div>
                        <div css={s_perInformationContainer}>
                            <Text as="span" type="bodyBold" textAlign="start">
                                면접 당 진행 시간
                            </Text>
                            <Text as="span" type="captionRegular" textAlign="start">
                                한 면접 당 걸리는 시간을 정해요.
                            </Text>
                            <Select
                                value={timeValue}
                                onValueChange={setTimeValue}
                                size="xs"
                                sx={s_select}
                                options={timeOptions}
                            >
                                <Select.Trigger sx={s_selectTrigger}>
                                    <Select.Value />
                                </Select.Trigger>
                                <Select.Content>
                                    {timeOptions.map(({ value, label }) => (
                                        <Select.Item key={value} value={value}>
                                            {label}
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select>
                        </div>
                        <div css={s_emptyPlace} />
                        <div css={s_perInformationContainer}>
                            <Text as="span" type="bodyBold" textAlign="start">
                                초기화
                            </Text>
                            <Text as="span" type="captionRegular" textAlign="start">
                                지금까지 정한 정보를 초기화해요.
                            </Text>
                            <Button
                                size="md"
                                variant="transparent"
                                onClick={handleReset}
                                sx={s_resetButton}
                            >
                                초기화
                            </Button>
                        </div>
                    </div>
                    <div css={s_informationContainer}>
                        <Calendar
                            mode="custom"
                            size="md"
                            selectedDate={selectedDates}
                            onSelect={handleDates}
                            highlightedDate={highlightedDate}
                            sx={s_calendar}
                        />
                        <InterviewTimeBox />
                    </div>
                    <div css={s_verticalDivider} />
                    <div css={s_emailContainer}>
                        <div css={s_titleWrapper}>
                            <Text as="span" type="h4Semibold" textAlign="start">
                                제목
                            </Text>
                            <Input
                                value={emailTitle}
                                onChange={(e) => setEmailTitle(e.target.value)}
                                height="4rem"
                                placeholder="이메일 제목을 입력해주세요."
                                inputSx={s_titleInput}
                                sx={s_input}
                            />
                        </div>
                        <div css={s_contentWrapper}>
                            <Text as="span" type="h4Semibold" textAlign="start">
                                내용
                            </Text>
                            <Editor.Root sx={s_editorRoot}>
                                <Editor.Toolbar sx={s_editorToolbar} />
                                <Editor.Textarea
                                    sx={s_editorTextarea}
                                    value={emailContent}
                                    onChange={setEmailContent}
                                />
                            </Editor.Root>
                        </div>
                        <div css={s_submitButtonWrapper}>
                            <Button onClick={handleSendEmail}>이메일 보내기</Button>
                        </div>
                    </div>
                </Dialog.Content>
                <Dialog.Action>{''}</Dialog.Action>
            </Dialog>
        </InterviewSettingDialogContext.Provider>
    );
}
export { InterviewSettingDialog };
