import React from 'react';

import { Calendar, Dropdown, Text } from '@ssoc/ui';

import { s_triggerButton } from './DatePicker.style';
import type { DatePickerProps } from './types';

function DatePicker({ mode = 'single', selectedDate, onChange, placeholder }: DatePickerProps) {
    const formatLabel = () => {
        if (selectedDate.length === 0) return placeholder;
        if (selectedDate.length === 1) return selectedDate[0];
        if (selectedDate.length === 2 && mode === 'range') {
            return `${selectedDate[0]} ~ ${selectedDate[1]}`;
        }
        return selectedDate.join(', ');
    };

    return (
        <Dropdown>
            <Dropdown.Trigger asChild>
                <button css={s_triggerButton(selectedDate)}>
                    <Text>{formatLabel()}</Text>
                </button>
            </Dropdown.Trigger>
            <Dropdown.Content>
                <Calendar mode={mode} selectedDate={selectedDate} onSelect={onChange} />
            </Dropdown.Content>
        </Dropdown>
    );
}

export { DatePicker };
