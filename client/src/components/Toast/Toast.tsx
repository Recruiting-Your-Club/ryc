import React from 'react';
import type { Type, ToastProps, ToastTheme } from './type';
import { toastStyle, svgStyle } from './Toast.style';
import Alert from '@assets/images/alert.svg';
import Check from '@assets/images/check.svg';
import CheckFilled from '@assets/images/check-filled.svg';
import AlertFilled from '@assets/images/alert-filled.svg';

function Toast({
    type = 'default',
    content,
    status = 'entering',
    toastTheme = 'white',
}: ToastProps) {
    return (
        <div css={[toastStyle(status, toastTheme, type)]}>
            {getSVG(type, toastTheme)}
            <div>{content}</div>
        </div>
    );
}

function getSVG(type: Type, toastTheme: ToastTheme) {
    if (toastTheme === 'dark' || toastTheme === 'white') {
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
    } else if (toastTheme === 'colored') {
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
    }
}
export { Toast };
