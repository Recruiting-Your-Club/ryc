import React, { useState } from 'react';
import { Calendar, Button } from '@components';
import dayjs from 'dayjs';

function TestPage() {
    return (
        <>
            <Calendar isMultiple={false} />
        </>
    );
}
export { TestPage };
