import React, { useState } from 'react';

import PasswordHide from '@ssoc/assets/images/passwordHide.svg';
import PasswordShow from '@ssoc/assets/images/passwordShow.svg';

import { Button } from '../Button';
import { Input } from '../Input';
import type { InputProps } from '../Input/types';
import { passwordIconContainer } from './PasswordInput.style';

function PasswordInput({ ...props }: InputProps) {
    const [isVisible, setIsVisible] = useState(false);
    const handleVisible = () => {
        setIsVisible(!isVisible);
    };

    return (
        <Input
            type={isVisible ? 'text' : 'password'}
            endNode={
                <Button size="xs" variant="transparent" onClick={handleVisible}>
                    {isVisible ? (
                        <PasswordShow css={passwordIconContainer} aria-label="비밀번호 보이기" />
                    ) : (
                        <PasswordHide css={passwordIconContainer} aria-label="비밀번호 숨기기" />
                    )}
                </Button>
            }
            {...props}
        />
    );
}
export { PasswordInput };
