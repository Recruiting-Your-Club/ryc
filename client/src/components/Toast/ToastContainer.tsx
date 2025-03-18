import React, { useEffect, useState } from 'react';
import { Container, ContainerPosition } from './Toast.style';
import { createPortal } from 'react-dom';
import type { ToastPosition, ToastContainerProps } from './type';
import type { CSSObject } from '@emotion/react';
import { Toast } from './Toast';
import { css } from '@emotion/react';
import type { ToastProps } from './type';

function ToastContainer({ toasts, props }: { toasts: ToastProps[]; props: ToastContainerProps }) {
    const getToastPosition = () => {
        const positionMap: Record<ToastPosition, ToastProps[]> = {
            topRight: [],
            topCenter: [],
            topLeft: [],
            bottomRight: [],
            bottomCenter: [],
            bottomLeft: [],
        };

        // 각 토스트를 적절한 위치에 추가
        toasts.forEach((toast) => {
            // 토스트의 위치가 정의되어 있으면 해당 위치 사용, 아니면 컨테이너 기본 위치 사용
            const position = toast.position || 'topCenter';
            positionMap[position].push(toast);
        });

        return positionMap;
    };
    const toastsByPosition = getToastPosition();

    return (
        <>
            {Object.entries(toastsByPosition).map(
                ([position, positionToasts]) =>
                    // 해당 위치에 토스트가 있을 때만 컨테이너 렌더링
                    positionToasts.length > 0 &&
                    createPortal(
                        <div
                            key={position}
                            css={[Container, ContainerPosition[position as ToastPosition]]}
                        >
                            {positionToasts.map((toast: ToastProps) => (
                                <div key={toast.id}>
                                    <Toast {...toast} />
                                </div>
                            ))}
                        </div>,
                        document.body,
                    ),
            )}
            {/**
            {toasts &&
                createPortal(
                    <div css={[Container, ContainerPosition[props?.position || 'topCenter']]}>
                        {toasts?.map((toast, id) => {
                            return (
                                <div key={id}>
                                    <Toast {...toast} />
                                </div>
                            );
                        })}
                    </div>,
                    document.body,
                )}
                     */}
        </>
    );
}
export { ToastContainer };
