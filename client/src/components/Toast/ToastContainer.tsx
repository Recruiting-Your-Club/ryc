import React, { useEffect, useState } from 'react';
import { Container, ContainerPosition } from './Toast.style';
import { createPortal } from 'react-dom';
import type { ToastPosition } from './type';
import { Toast } from './Toast';
import type { ToastProps } from './type';

function ToastContainer({ toasts }: { toasts: ToastProps[] }) {
    const getToastPosition = () => {
        const positionMap: Record<ToastPosition, ToastProps[]> = {
            topRight: [],
            topCenter: [],
            topLeft: [],
            bottomRight: [],
            bottomCenter: [],
            bottomLeft: [],
        };

        // 각 토스트를 key값에 맞는 위치에 추가
        toasts.forEach((toast) => {
            const position = toast.position || 'topCenter';
            positionMap[position].push(toast);
        });

        return positionMap;
    };

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
