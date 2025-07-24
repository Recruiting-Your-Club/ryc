import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { Toast } from './Toast';
import { Container, ContainerPosition } from './Toast.style';
import type { ToastPosition } from './type';
import type { getToastAndPositionProps, ToastProps } from './type';

function ToastContainer({ getToastPosition }: getToastAndPositionProps) {
    return (
        <>
            {Object.entries(getToastPosition()).map(([position, toasts]) =>
                createPortal(
                    <div
                        key={position}
                        css={[Container, ContainerPosition[position as ToastPosition]]}
                    >
                        {toasts.map((toast: ToastProps) => (
                            <Toast key={toast.id} {...toast} />
                        ))}
                    </div>,
                    document.body,
                ),
            )}
        </>
    );
}
export { ToastContainer };
