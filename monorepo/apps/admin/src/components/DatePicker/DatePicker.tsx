import React, { useEffect, useState } from 'react';

import CalenarIcon from '@ssoc/assets/images/calendar.svg';
import { Button, Calendar, Dropdown, Text } from '@ssoc/ui';

import {
    s_alwaysButtonContainer,
    s_calendar,
    s_calendarIcon,
    s_dropdown,
    s_dropdownContent,
    s_labelWithIcon,
    s_triggerButton,
} from './DatePicker.style';
import type { DatePickerProps } from './types';

const DEFAULT_ALWAYS_OPEN_SENTINEL = '9999-12-31';

function isAlwaysOpen(selectedDate: string[], sentinel: string) {
    return (
        selectedDate.length === 2 && selectedDate[0] === sentinel && selectedDate[1] === sentinel
    );
}

function DatePicker({
    mode = 'single',
    selectedDate,
    onChange,
    placeholder,
    showAlwaysOpenToggle,
    alwaysOpenLabel = '상시 모집',
    alwaysOpenSentinel = DEFAULT_ALWAYS_OPEN_SENTINEL,
}: DatePickerProps) {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const formatLabel = () => {
        if (isAlwaysOpen(selectedDate, alwaysOpenSentinel)) {
            return alwaysOpenLabel;
        }
        if (selectedDate.length === 0) return placeholder;
        if (selectedDate.length === 1) return selectedDate[0];
        if (selectedDate.length === 2 && mode === 'range') {
            return `${selectedDate[0]} ~ ${selectedDate[1]}`;
        }
        return selectedDate.join(', ');
    };

    const handleAlwaysOpenClick = () => {
        onChange?.([alwaysOpenSentinel, alwaysOpenSentinel]);
        setDropdownOpen(false);
    };

    useEffect(() => {
        if (selectedDate.length === 2 && mode === 'range') setDropdownOpen(false);
        else if (selectedDate.length === 1 && mode === 'single') setDropdownOpen(false);
    }, [selectedDate]);

    return (
        <Dropdown open={dropdownOpen} onOpenChange={setDropdownOpen} sx={s_dropdown}>
            <Dropdown.Trigger asChild>
                <Button sx={s_triggerButton(selectedDate)} variant="outlined">
                    <div css={s_labelWithIcon}>
                        <CalenarIcon css={s_calendarIcon} />
                        {formatLabel()}
                    </div>
                </Button>
            </Dropdown.Trigger>
            <Dropdown.Content sx={s_dropdownContent}>
                <Calendar
                    mode={mode}
                    selectedDate={selectedDate}
                    onSelect={onChange}
                    sx={s_calendar}
                />
                {showAlwaysOpenToggle && (
                    <div css={s_alwaysButtonContainer}>
                        <Button sx={s_alwaysButtonContainer} onClick={handleAlwaysOpenClick}>
                            {alwaysOpenLabel}
                        </Button>
                    </div>
                )}
            </Dropdown.Content>
        </Dropdown>
    );
}

export { DatePicker };
