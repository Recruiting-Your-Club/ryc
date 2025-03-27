import React, { useEffect, useState } from 'react';
import { Container, ContainerPosition } from './Toast.style';
import { createPortal } from 'react-dom';
import type { ToastPosition } from './type';
import { Toast } from './Toast';
import type { ToastProps, getToastAndPositionProps } from './type';

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
