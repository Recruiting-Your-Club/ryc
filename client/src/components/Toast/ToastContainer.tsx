import React, { useEffect, useState } from 'react';
import { Container, ContainerPosition } from './Toast.style';
import { createPortal } from 'react-dom';
import type { ToastPosition, ToastContainerProps } from './type';
import type { CSSObject } from '@emotion/react';
import { Toast } from './Toast';
import { css } from '@emotion/react';
import type { ToastProps } from './type';

function ToastContainer({ toasts, props }: { toasts: ToastProps[]; props: ToastContainerProps }) {
    return (
        <>
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
        </>
    );
}
export { ToastContainer };
