import React, { useState } from 'react';
import { Calendar, Button } from '@components';
import dayjs from 'dayjs';

function TestPage() {
    const [selectedDate, setSelectedDate] = useState<string[]>([]);

    const handleButton = () => {
        //console.log('선택한 날짜', selectedDate);
    };
    return (
        <>
            <div>asadasdasd</div>
            <br />
            <br />
            <Calendar
                isMultiple={true}
                selectedDate={selectedDate}
                onSelect={setSelectedDate}
                size="sm"
            />
            <button onClick={handleButton}>선택한 날짜를 확인해보아요</button>
        </>
    );
}
export { TestPage };
