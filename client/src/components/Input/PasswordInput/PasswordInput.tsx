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
        <div css={passwordContainer}>
            <BaseInput variant="primary" type={isVisible ? 'text' : 'password'} {...props} />
            <Button onClick={handleVisible} variant="primary" size="xs" type="button">
                검색
            </Button>
        </div>
    );
}
export { PasswordInput };
