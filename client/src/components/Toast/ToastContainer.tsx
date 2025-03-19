import React, { useEffect, useState } from 'react';
import { Container, ContainerPosition } from './Toast.style';
import { createPortal } from 'react-dom';
import type { ToastPosition } from './type';
import { Toast } from './Toast';
import type { ToastProps, getToastAndPositionProps } from './type';

function ToastContainer({ getToastPosition }: getToastAndPositionProps) {
    return (
        <>
            {Object.entries(getToastPosition()).map(
                ([position, toasts]) =>
                    toasts &&
                    createPortal(
                        <div
                            key={position}
                            css={[Container, ContainerPosition[position as ToastPosition]]}
                        >
                            {toasts.map((toast: ToastProps) => (
                                <div key={toast.id}>
                                    <Toast {...toast} />
                                </div>
                            ))}
                        </div>,
                        document.body,
                    ),
            )}
        </>
    );
}
export { ToastContainer };
