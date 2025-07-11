import XIcon from '@assets/images/xIcon.svg';
import {
    Button,
    Calendar,
    Dialog,
    Divider,
    Input,
    InterviewTimeBox,
    Select,
    Text,
    TextArea,
} from '@components';
import { s_textareaInner } from '@components/PlainEmailDialog/PlainEmailDialog.style';
import {
    DEFAULT_END_TIME,
    DEFAULT_NUMBER_VALUE,
    DEFAULT_START_TIME,
    DEFAULT_TIME_VALUE,
    INITIAL_FORM,
    numberOptions,
    timeOptions,
} from '@constants/InterviewSettingDialog';
import React, { useEffect, useMemo, useState } from 'react';
import {
    calendarCss,
    contentCss,
    contentWrapper,
    dialogCss,
    headerCss,
    informationContainer,
    inputCss,
    submitButtonWrapper,
    s_emailContainer,
    s_emptyPlace,
    s_perInformationContainer,
    s_resetButton,
    s_select,
    s_selectContainer,
    s_selectTrigger,
    s_textAreaOuter,
    titleInputCss,
    titleWrapper,
    verticalDivider,
} from './InterviewSettingDialog.style';
import { InterviewSettingDialogContext } from './InterviewSettingDialogContext';
import type { InterviewInformation, InterviewSettingDialogProps } from './types';

function InterviewSettingDialog({ open, handleClose }: InterviewSettingDialogProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    const [numberValue, setNumberValue] = useState<string>(DEFAULT_NUMBER_VALUE);
    const [timeValue, setTimeValue] = useState<string>(DEFAULT_TIME_VALUE);
    const [startTime, setStartTime] = useState<string>(DEFAULT_START_TIME);
    const [endTime, setEndTime] = useState<string>(DEFAULT_END_TIME);

    const [timeButtonList, setTimeButtonList] = useState<string[]>([]);
    const [selectedDates, setSelectedDates] = useState<string[]>([]);
    const [currentDate, setCurrentDate] = useState<string>('');
    const [interviewInformation, setInterviewInformation] = useState<
        Record<string, InterviewInformation>
    >({});

    const [emailTitle, setEmailTitle] = useState<string>('');
    const [emailContent, setEmailContent] = useState<string>(INITIAL_FORM);

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

    // handler
    const handleReset = () => {
        setTimeValue(DEFAULT_TIME_VALUE);
        setNumberValue(DEFAULT_NUMBER_VALUE);
        setStartTime(DEFAULT_START_TIME);
        setEndTime(DEFAULT_END_TIME);
        setInterviewInformation({});
    };

    // effects
    useEffect(() => {
        setCurrentDate(selectedDates.at(-1)!);
        setTimeButtonList([]);
    }, [selectedDates]);

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
            <Dialog open={open} handleClose={handleClose} size="full" sx={dialogCss}>
                <Dialog.Header position="start" sx={headerCss}>
                    <Text as="span" type="bodyBold" sx={{ paddingTop: '0.3rem' }}>
                        면접 일정 보내기
                    </Text>
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
                <Dialog.Content sx={contentCss}>
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
                    <div css={informationContainer}>
                        <Calendar
                            // isMultiple
                            size="md"
                            selectedDate={selectedDates}
                            onSelect={setSelectedDates}
                            sx={calendarCss}
                        />
                        <InterviewTimeBox />
                    </div>
                    <div css={verticalDivider} />
                    <div css={s_emailContainer}>
                        <div css={titleWrapper}>
                            <Text as="span" type="h4Semibold" textAlign="start">
                                제목
                            </Text>
                            <Input
                                value={emailTitle}
                                onChange={(e) => setEmailTitle(e.target.value)}
                                height="4rem"
                                placeholder="이메일 제목을 입력해주세요."
                                inputSx={titleInputCss}
                                sx={inputCss}
                            />
                        </div>
                        <div css={contentWrapper}>
                            <Text as="span" type="h4Semibold" textAlign="start">
                                내용
                            </Text>
                            <TextArea
                                value={emailContent}
                                onChange={(e) => setEmailContent(e.target.value)}
                                size="md"
                                placeholder="이메일 내용을 입력해주세요."
                                textAreaSx={s_textareaInner}
                                wrapperSx={s_textAreaOuter}
                            />
                        </div>
                        <div css={submitButtonWrapper}>
                            <Button>이메일 보내기</Button>
                        </div>
                    </div>
                </Dialog.Content>
                <Dialog.Action>{''}</Dialog.Action>
            </Dialog>
        </InterviewSettingDialogContext.Provider>
    );
}
export { InterviewSettingDialog };
