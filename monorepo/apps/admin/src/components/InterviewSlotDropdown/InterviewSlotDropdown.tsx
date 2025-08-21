import { InterviewTimeTable } from '@components/InterviewTimeTable';
import React from 'react';

import { Button, Dropdown } from '@ssoc/ui';

import { s_buttonGroup, s_selectionButton } from './InterviewSlotDropdown.style';
import type { InterviewSlotDropdownProps } from './types';

function InterviewSlotDropdown({
    open,
    onOpenChange,
    selectedInterviewLabel,
    interviewSlots,
    onSelectLabel,
}: InterviewSlotDropdownProps) {
    return (
        <>
            <Dropdown open={open} onOpenChange={onOpenChange}>
                <Dropdown.Trigger asChild>
                    <Button variant="outlined" sx={s_selectionButton}>
                        {selectedInterviewLabel.label}
                    </Button>
                </Dropdown.Trigger>
                <Dropdown.Content offsetX={11.7} offsetY={42}>
                    <InterviewTimeTable
                        interviewSlots={interviewSlots}
                        selectedInterviewSlotId={selectedInterviewLabel.interviewSlotId}
                        onSelect={onSelectLabel}
                        onOpenChange={onOpenChange}
                        listSx={s_buttonGroup}
                    />
                </Dropdown.Content>
            </Dropdown>
        </>
    );
}

export { InterviewSlotDropdown };
