import React, { useState } from 'react';
import { BaseInput } from '@components/Input';
import { passwordContainer } from './PasswordInput.style';
import { css } from '@emotion/react';
import { Button } from '@components/Button';
import type { InputProps } from '@components/Input';
function PasswordInput({ ...props }: InputProps) {
    const [isVisible, setIsVisible] = useState(false);
    const handleVisible = () => {
        setIsVisible(!isVisible);
    };

    return (
        <BaseInput
            variant="primary"
            type={isVisible ? 'text' : 'password'}
            endNode={
                <Button size="xs" variant="primary" onClick={handleVisible}>
                    asd
                </Button>
            }
            {...props}
        />
    );
}
export { PasswordInput };
