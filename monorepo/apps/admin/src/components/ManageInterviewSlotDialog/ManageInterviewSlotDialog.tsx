import { numberOptions } from '@constants/interviewSettingDialog';
import React, { useState } from 'react';

import { Button, Dialog, Text } from '@ssoc/ui';

import {
    s_buttonGrid,
    s_dialogContent,
    s_numberButton,
    s_perInformationContainer,
} from './ManageInterviewSlotDialog.style';
import type { ManageInterviewSlotDialogProps } from './types';

function ManageInterviewSlotDialog({
    mode,
    open,
    handleClose,
    handlePatchInterviewSlotPeople,
    handleDeleteInterviewSlot,
    handleChangeReminder,
    selectedInterviewSlot,
}: ManageInterviewSlotDialogProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    const [numberValue, setNumberValue] = useState<string>(
        `${selectedInterviewSlot.number.toString()}`,
    );

    // form hooks
    // query hooks
    // calculated values
    // handlers
    const handleEditInterviewSlotPeople = async () => {
        if (await handlePatchInterviewSlotPeople(Number(numberValue))) {
            setNumberValue('');
            handleClose();
        }
    };

    const handleDeleteSelectedInterviewSlot = async () => {
        if (await handleDeleteInterviewSlot()) {
            handleClose();
        }
    };

    // effects
    // etc
    const modeTextMap: Record<string, string> = {
        edit: '면접 최대 인원 수정',
        delete: '면접 일정 삭제',
        reminder: '면접 리마인드 시간 변경',
    };

    return (
        <>
            <Dialog open={open} handleClose={handleClose} size="md">
                <Dialog.Header position="start">
                    <Text as="span" type="bodyBold" sx={{ paddingTop: '0.3rem' }}>
                        {modeTextMap[mode]}
                    </Text>
                </Dialog.Header>
                <Dialog.Content sx={s_dialogContent}>
                    <div css={s_perInformationContainer}>
                        {mode !== 'reminder' && (
                            <Text as="span" type="bodySemibold" sx={{ paddingTop: '0.3rem' }}>
                                {selectedInterviewSlot.date} {selectedInterviewSlot.time}
                            </Text>
                        )}
                        {mode === 'edit' ? (
                            <div css={s_buttonGrid}>
                                {numberOptions.map(({ value, label }) => (
                                    <Button
                                        key={value}
                                        size="md"
                                        variant="outlined"
                                        sx={s_numberButton(numberValue === value)}
                                        onClick={() => {
                                            setNumberValue(value);
                                        }}
                                    >
                                        {label}
                                    </Button>
                                ))}
                            </div>
                        ) : (
                            <Text
                                as="span"
                                type={mode === 'delete' ? 'captionRegular' : 'bodyRegular'}
                                sx={{ paddingTop: '0.3rem' }}
                            >
                                {mode === 'delete'
                                    ? '면접 일정을 정말 삭제하시겠어요?'
                                    : '면접 리마인드 알림 시간을 변경하시겠어요?'}
                            </Text>
                        )}
                    </div>
                </Dialog.Content>
                <Dialog.Action position="center">
                    <Button variant="outlined" onClick={handleClose}>
                        취소
                    </Button>
                    <Button
                        onClick={() => {
                            if (mode === 'edit') {
                                handleEditInterviewSlotPeople();
                            } else if (mode === 'delete') {
                                handleDeleteSelectedInterviewSlot();
                            } else if (mode === 'reminder') {
                                handleChangeReminder();
                            }
                        }}
                    >
                        {mode === 'delete' ? '삭제' : '수정'}
                    </Button>
                </Dialog.Action>
            </Dialog>
        </>
    );
}

export { ManageInterviewSlotDialog };
