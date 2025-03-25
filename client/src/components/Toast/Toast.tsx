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

const iconMap = {
    info: { outline: Alert, filled: AlertFilled },
    success: { outline: Check, filled: CheckFilled },
    error: { outline: Alert, filled: AlertFilled },
    default: null,
};
function getSVG(type: Type, toastTheme: ToastTheme) {
    const Icon = iconMap[type]?.[toastTheme === 'colored' ? 'filled' : 'outline'];
    return <Icon css={svgStyle(type)} />;
}
export { Toast };
