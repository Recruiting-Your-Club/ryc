import React from 'react';
import type { Type, ToastProps, ToastTheme } from './type';
import { toastStyle, svgStyle, progressBarStyle } from './Toast.style';
import Alert from '@assets/images/alert.svg';
import Check from '@assets/images/check.svg';
import CheckFilled from '@assets/images/check-filled.svg';
import AlertFilled from '@assets/images/alert-filled.svg';

function Toast({
    type = 'default',
    toastTheme = 'white',
    status = 'entering',
    duration = 3000,
    autoClose = true,
    progressBar = true,
    content,
    sx,
}: ToastProps) {
    return (
        <div css={[toastStyle(status, toastTheme, type), sx]}>
            {type !== 'default' && getSVG(type, toastTheme)}
            {autoClose && progressBar && <div css={progressBarStyle(toastTheme, type, duration)} />}
            <div>{content}</div>
        </div>
    );
}

function getSVG(type: Type, toastTheme: ToastTheme) {
    if (toastTheme === 'colored') {
        switch (type) {
            case 'info':
                return <AlertFilled css={svgStyle(type)} />;
            case 'success':
                return <CheckFilled css={svgStyle(type)} />;
            case 'error':
                return <AlertFilled css={svgStyle(type)} />;
            default:
                return null;
        }
    } else {
        switch (type) {
            case 'info':
                return <Alert css={svgStyle(type)} />;
            case 'success':
                return <Check css={svgStyle(type)} />;
            case 'error':
                return <Alert css={svgStyle(type)} />;
            default:
                return null;
        }
    }
}
export { Toast };
