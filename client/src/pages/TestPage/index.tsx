import React, { useState } from 'react';
import { Calendar, Button } from '@components';
import dayjs from 'dayjs';
import { MainCard } from '@components';

function TestPage() {
    const [selectedDate, setSelectedDate] = useState<string[]>([]);

    const handleButton = () => {
        //console.log('선택한 날짜', selectedDate);
    };
    return (
        <>
            <MainCard />
        </>
    );
}
export { TestPage };
