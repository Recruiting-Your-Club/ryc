import React from 'react';
import { Tooltip } from '@components/_common/Tooltip';
import { FileUpLoader } from '@components/FileUpLoader';
import { Calendar } from '@components';
import dayjs from 'dayjs';

function TestPage() {
    const [selectedDate2, setSelectedDate2] = React.useState<string[]>([
        '2025-06-01',
        '2025-06-07',
    ]);

    const [selectedDate3, setSelectedDate3] = React.useState<string[]>([
        '2025-06-04',
        '2025-06-05',
        '2025-06-06',
    ]);

    const [clicked, setClicked] = React.useState<string[]>([]);

    const [selectedDate, setSelectedDate] = React.useState<string[]>(['2025-06-01', '2025-06-09']);
    const handleCalendar = (newSelected: string[]) => {
        // newSelected는 달력에서 클릭한 날짜를 의미합니다.
    };

    return (
        <>
            <div style={{ display: 'flex' }}>
                <Calendar
                    mode="custom"
                    selectedDate={selectedDate}
                    onSelect={handleCalendar}
                    size="md"
                />
                <Calendar
                    mode="single"
                    selectedDate={selectedDate}
                    onSelect={setSelectedDate}
                    size="md"
                />
                <Calendar
                    mode="custom"
                    selectedDate={selectedDate3}
                    onSelect={handleCalendar}
                    size="md"
                    onlySelected={true}
                    highlightedDate={clicked}
                />
            </div>
        </>
    );
}
export { TestPage };

//<Calendar selectedDate={[clicked, ...select]} setClickedDate={setClicked} />
