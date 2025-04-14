import React, { useState } from 'react';
import { Button } from '@components/_common/Button';
import PasswordShow from '@assets/images/passwordShow.svg';
import PasswordHide from '@assets/images/passwordHide.svg';
import { Input } from '@components/_common';
import type { InputProps } from '@components/_common';

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
