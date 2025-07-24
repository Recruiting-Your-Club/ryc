import React from 'react';

import AlertFilled from '@ssoc/assets/images/alert-filled.svg';
import Alert from '@ssoc/assets/images/alert.svg';
import CheckFilled from '@ssoc/assets/images/check-filled.svg';
import Check from '@ssoc/assets/images/check.svg';

import { progressBarStyle, svgStyle, toastStyle } from './Toast.style';
import type { ToastProps, ToastTheme, Type } from './type';

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
    const Icon =
        iconMap[type === 'default' ? 'info' : type][
            toastTheme === 'colored' ? 'filled' : 'outline'
        ];
    return <Icon css={svgStyle(type)} />;
}
export { Toast };
