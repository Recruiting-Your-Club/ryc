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
    selectedInterviewSlot,
}: ManageInterviewSlotDialogProps) {
    const [numberValue, setNumberValue] = useState<string>(
        `${selectedInterviewSlot.number.toString()}`,
    );

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

    return (
        <>
            <Dialog open={open} handleClose={handleClose} size="md">
                <Dialog.Header position="start">
                    <Text as="span" type="bodyBold" sx={{ paddingTop: '0.3rem' }}>
                        {mode === 'edit' ? '면접 최대 인원 수정' : '면접 일정 삭제'}
                    </Text>
                </Dialog.Header>
                <Dialog.Content sx={s_dialogContent}>
                    <div css={s_perInformationContainer}>
                        <Text as="span" type="bodySemibold" sx={{ paddingTop: '0.3rem' }}>
                            {selectedInterviewSlot.date} {selectedInterviewSlot.time}
                        </Text>
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
                            <Text as="span" type="captionRegular" sx={{ paddingTop: '0.3rem' }}>
                                면접 일정을 정말 삭제하시겠어요?
                            </Text>
                        )}
                    </div>
                </Dialog.Content>
                <Dialog.Action position="center">
                    <Button variant="outlined" onClick={handleClose}>
                        취소
                    </Button>
                    {mode === 'edit' ? (
                        <Button onClick={handleEditInterviewSlotPeople}>수정</Button>
                    ) : (
                        <Button onClick={handleDeleteSelectedInterviewSlot}>삭제</Button>
                    )}
                </Dialog.Action>
            </Dialog>
        </>
    );
}

export { ManageInterviewSlotDialog };
