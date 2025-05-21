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
    emailWrapper,
    headerCss,
    informationContainer,
    informationInput,
    informationInputCss,
    inputCss,
    inputFormSection,
    perInformationInput,
    submitButtonWrapper,
    textareaCss,
    timeSelectCss,
    titleInputCss,
    titleWrapper,
    verticalDivider,
} from './InterviewSettingDialog.style';
import type { InterviewSettingDialogProps } from './types';

function InterviewSettingDialog({ open, handleClose }: InterviewSettingDialogProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    const [inputValue, setInputValue] = useState<string>('');
    const [unit, setUnit] = useState<string>('hour');
    const [selectedDates, setSelectedDates] = useState<string[]>([]);
    const [currentDate, setCurrentDate] = useState<string>('');
    const [selectedTimesByDate, setSelectedTimesByDate] = useState<Record<string, string[]>>({});

    // form hooks
    // query hooks
    // calculated values
    const interval = useMemo((): number => {
        const value = Number(inputValue);
        if (isNaN(value) || value <= 0) return 0;
        return unit === 'hour' ? value * 60 : value;
    }, [inputValue, unit]);

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
        handleClose();
        setSelectedTimesByDate({});
        setSelectedDates([]);
        setUnit('시간');
        setInputValue('');
    };

    // effects
    useEffect(() => {
        setCurrentDate(selectedDates.at(-1)!);
    }, [selectedDates]);

    return (
        <Dialog open={open} handleClose={handleSelectReset} size="full" sx={dialogCss}>
            <Dialog.Header position="start" sx={headerCss}>
                <Text as="span" type="bodyBold" sx={{ paddingTop: '0.3rem' }}>
                    면접 일정 설정
                </Text>
                <Button
                    variant="transparent"
                    size="xs"
                    aria-label="close"
                    onClick={handleSelectReset}
                >
                    <XIcon alt="close" />
                </Button>
            </Dialog.Header>
            <Divider color="black" sx={{ borderTop: '1px solid' }} />
            <Dialog.Content sx={contentCss}>
                <div css={informationContainer}>
                    <Text as="span" type="h4Bold" textAlign="start">
                        상세 면접 정보
                    </Text>
                    <div css={informationInput}>
                        <div css={perInformationInput}>
                            <Text as="span" type="bodyBold" textAlign="start">
                                면접 당 최대 정원 수
                            </Text>
                            <div css={inputFormSection}>
                                <Input inputSx={informationInputCss} />
                                <Text
                                    as="span"
                                    type="captionSemibold"
                                    sx={{ marginLeft: '-7.5rem' }}
                                >
                                    명
                                </Text>
                            </div>
                        </div>
                        <div css={perInformationInput}>
                            <Text as="span" type="bodyBold" textAlign="start">
                                면접 당 진행 시간
                            </Text>
                            <div css={inputFormSection}>
                                <Input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    inputSx={informationInputCss}
                                />
                                <Select value={unit} onValueChange={setUnit} size="xs">
                                    <Select.Trigger sx={timeSelectCss}>
                                        <Select.Value placeholder="시간" />
                                    </Select.Trigger>
                                    <Select.Content>
                                        <Select.Item value="hour">시간</Select.Item>
                                        <Select.Item value="min">분</Select.Item>
                                    </Select.Content>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <Calendar
                        // isMultiple
                        size="sm"
                        selectedDate={selectedDates}
                        onSelect={setSelectedDates}
                        sx={calendarCss}
                    />
                    <InterviewTimeBox
                        interval={interval}
                        selectedDate={currentDate}
                        selectedTimes={selectedTimesByDate[currentDate] || []}
                        handleClick={handleTimeClick}
                        handleReset={handleTimeReset}
                    />
                </div>
                <div css={verticalDivider}></div>
                <div css={emailWrapper}>
                    <div css={titleWrapper}>
                        <Text as="span" type="h4Bold" textAlign="start">
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
                        <Text as="span" type="h4Bold" textAlign="start">
                            내용
                        </Text>
                        <TextArea
                            defaultValue={INITIAL_FORM}
                            size="md"
                            placeholder="이메일 내용을 입력해주세요."
                            sx={textareaCss}
                            wrapperSx={{ height: '100%', margin: '0' }}
                        />
                    </div>
                    <div css={submitButtonWrapper}>
                        <Button>이메일 보내기</Button>
                    </div>
                </div>
            </Dialog.Content>
            <Dialog.Action>{''}</Dialog.Action>
        </Dialog>
    );
}
export { InterviewSettingDialog };
