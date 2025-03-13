import React, { useEffect, useState } from 'react';
import { Container, ContainerPosition } from './Toast.style';
import { createPortal } from 'react-dom';
import type { ToastPosition, ToastContainerProps } from './type';
import type { CSSObject } from '@emotion/react';
import { Toast } from './Toast';
import { css } from '@emotion/react';
import type { ToastProps } from './type';

function ToastContainer({ toasts }: { toasts: ToastProps[] }) {
    return (
        <>
            {toasts &&
                createPortal(
                    <div css={[Container, ContainerPosition['topRight']]}>
                        {toasts?.map((data, index) => {
                            return (
                                <div key={index}>
                                    <Toast
                                        id={data.id}
                                        type={data.type}
                                        backgroundColor={data.backgroundColor}
                                        content={data.content}
                                        duration={data.duration}
                                        autoClose={data.autoClose}
                                        status={data.status}
                                    />
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
