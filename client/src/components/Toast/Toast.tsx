import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { ToastPosition, ToastType, ToastProps } from './type';
import { ToastStyle } from './Toast.style';
import type { ReactNode } from 'react';
import { Text } from '@components/Text';

function Toast({
    id,
    type,
    backgroundColor,
    content,
    duration,
    autoClose,
    status = 'entering',
}: ToastProps) {
    return (
        <div css={ToastStyle(status)}>
            <Text type="bodyBold" color="black">
                {content}
            </Text>
        </div>
    );
}
export { Toast };
