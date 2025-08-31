import React, { useEffect, useState } from 'react';

import CalenarIcon from '@ssoc/assets/images/calendar.svg';
import { Button, Calendar, Dropdown } from '@ssoc/ui';

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

export const DEFAULT_ALWAYS_OPEN_SENTINEL_START = '0001-01-01';
const DEFAULT_ALWAYS_OPEN_SENTINEL_END = '9999-12-31';

function isAlwaysOpen(selectedDate: string[], sentinel: { start: string; end: string }) {
    return (
        selectedDate.length === 2 &&
        selectedDate[0] === sentinel.start &&
        selectedDate[1] === sentinel.end
    );
}

function DatePicker({
    mode = 'single',
    selectedDate,
    onChange,
    placeholder,
    showAlwaysOpenToggle,
    disabled,
    alwaysOpenLabel = '상시 모집',
    alwaysOpenSentinel = {
        start: DEFAULT_ALWAYS_OPEN_SENTINEL_START,
        end: DEFAULT_ALWAYS_OPEN_SENTINEL_END,
    },
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
        onChange?.([alwaysOpenSentinel.start, alwaysOpenSentinel.end]);
        setDropdownOpen(false);
    };

    useEffect(() => {
        if (selectedDate.length === 2 && mode === 'range') setDropdownOpen(false);
        else if (selectedDate.length === 1 && mode === 'single') setDropdownOpen(false);
    }, [selectedDate]);

    return (
        <Dropdown open={dropdownOpen} onOpenChange={setDropdownOpen} sx={s_dropdown}>
            <Dropdown.Trigger asChild disabled={disabled}>
                <Button sx={s_triggerButton(selectedDate, disabled)} variant="outlined">
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
