import React from 'react';
import { Tooltip } from '@components/_common/Tooltip';
import { FileUpLoader } from '@components/FileUpLoader';
import { Calendar } from '@components';
import dayjs from 'dayjs';

function TestPage() {
    const [select, setSelect] = React.useState<string[]>([]);
    const [clicked, setClicked] = React.useState<string>('');
    const handleCalendar = () => {
        setSelect([...select, clicked]);
    };
    return (
        <>
            <div>
                <Calendar selectedDate={[clicked, ...select]} setClickedDate={setClicked} />
                <button onClick={handleCalendar}>날짜 적용</button>
                <br />
                <button onClick={() => setSelect([])}>초기화</button>
            </div>
        </>
    );
}
export { TestPage };
