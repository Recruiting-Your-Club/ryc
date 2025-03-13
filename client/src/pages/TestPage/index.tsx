import React, { useState } from 'react';
import { BaseInput, PasswordInput } from '@components/Input';
import { Button } from '@components/Button';
import { Stepper } from '@components/Stepper/Stepper';
import { Step } from '@components/Stepper/Step';
import { StepLabel } from '@components/Stepper/StepLabel';
import { css } from '@emotion/react';
import { Select, SelectTrigger, SelectValue } from '@components/Select/Select';
function TestPage() {
    const [value, setValue] = React.useState('apple');

    return (
        <div className="w-full max-w-xs mx-auto p-4">
            <p className="mb-2">Selected value: {value}</p>
            <Select value={value} onValueChange={setValue}>
                <SelectTrigger>
                    <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
            </Select>
        </div>
    );
}
export { TestPage };
