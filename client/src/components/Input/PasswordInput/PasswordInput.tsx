import React, { useState } from 'react';
import { BaseInput } from '@components/Input';
import { Button } from '@components/Button';
import type { InputProps } from '@components/Input';
import PasswordShow from '@assets/images/passwordShow.svg';
import PasswordHide from '@assets/images/passwordHide.svg';

function PasswordInput({ ...props }: InputProps) {
    const [isVisible, setIsVisible] = useState(false);
    const handleVisible = () => {
        setIsVisible(!isVisible);
    };

    return (
        <BaseInput
            type={isVisible ? 'text' : 'password'}
            endNode={
                <Button size="xs" variant="transparent" onClick={handleVisible}>
                    {isVisible ? (
                        <PasswordShow width="15" height="15" alt="hide" />
                    ) : (
                        <PasswordHide width="15" height="15" alt="show" />
                    )}
                </Button>
            }
            {...props}
        />
    );
}
export { PasswordInput };
