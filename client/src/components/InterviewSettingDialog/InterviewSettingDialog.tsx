import XIcon from '@assets/images/xIcon.svg';
import { InterviewTimeBox } from '@components/InterviewTimeBox';
import { Select } from '@components/Select';
import { Button, Calendar, Dialog, Divider, Input, Text } from '@components/_common';
import { TextArea } from '@components/_common/TextArea';
import { INITIAL_FORM } from '@constants/InterviewSettingDialog';
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
    textareaCss,
    titleInputCss,
    titleWrapper,
    verticalDivider,
} from './InterviewSettingDialog.style';
import { InterviewSettingDialogContext } from './interviewSettingDialogContext';
import type { InterviewSettingDialogProps } from './types';

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
const times = ['15분', '30분', '1시간'];

function InterviewSettingDialog({ open, handleClose }: InterviewSettingDialogProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    const [timeValue, setTimeValue] = useState<string>('15분');
    const [number, setNumber] = useState<string>('1');
    const [timeButtonList, setTimeButtonList] = useState<string[]>([]);
    const [selectedDates, setSelectedDates] = useState<string[]>([]);
    const [currentDate, setCurrentDate] = useState<string>('');
    const [selectedTimesByDate, setSelectedTimesByDate] = useState<Record<string, string[]>>({});

    // form hooks
    // query hooks
    // calculated values
    const contextValue = useMemo(() => ({ timeButtonList, setTimeButtonList }), [timeButtonList]);

    const interval = useMemo((): number => {
        const value = Number(timeValue.replace(/분|시간/g, ''));
        if (value === 1) return 60;
        return value;
    }, [timeValue]);

    // handler
    const handleTimeClick = (time: string) => {
        setSelectedTimesByDate((prev) => {
            const prevSelected = prev[currentDate] || [];
            const updated = prevSelected.includes(time)
                ? prevSelected.filter((t) => t !== time)
                : [...prevSelected, time];
            return {
                ...prev,
                [currentDate]: updated,
            };
        });
    };

    const handleTimeReset = () => {
        setSelectedTimesByDate((prev) => ({ ...prev, [currentDate]: [] }));
    };

    const handleSelectReset = () => {
        setTimeValue('15분');
        setNumber('1');
    };

    // effects
    useEffect(() => {
        setCurrentDate(selectedDates.at(-1)!);
        setTimeButtonList([]);
    }, [selectedDates]);

    return (
        <InterviewSettingDialogContext.Provider value={contextValue}>
            <Dialog open={open} handleClose={handleSelectReset} size="full" sx={dialogCss}>
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
                                value={number}
                                onValueChange={setNumber}
                                size="xs"
                                sx={s_select}
                            >
                                <Select.Trigger sx={s_selectTrigger}>
                                    <Select.Value />
                                </Select.Trigger>
                                <Select.Content>
                                    {numbers.map((number) => (
                                        <Select.Item key={number} value={number}>
                                            {number}
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
                            >
                                <Select.Trigger sx={s_selectTrigger}>
                                    <Select.Value />
                                </Select.Trigger>
                                <Select.Content>
                                    {times.map((time) => (
                                        <Select.Item key={time} value={time}>
                                            {time}
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
                                onClick={handleSelectReset}
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
                        <InterviewTimeBox
                            interval={interval}
                            selectedDate={currentDate}
                            selectedTimes={selectedTimesByDate[currentDate] || []}
                            isSelected={Boolean(currentDate)}
                            handleClick={handleTimeClick}
                        />
                    </div>
                    <div css={verticalDivider} />
                    <div css={s_emailContainer}>
                        <div css={titleWrapper}>
                            <Text as="span" type="h4Semibold" textAlign="start">
                                제목
                            </Text>
                            <Input
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
                                defaultValue={INITIAL_FORM}
                                size="md"
                                placeholder="이메일 내용을 입력해주세요."
                                sx={textareaCss}
                                textAreaSx={{ height: '100%', margin: '0' }}
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
