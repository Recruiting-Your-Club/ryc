import React, { useState } from 'react';
import { Container } from './Toast.style';
import { createPortal } from 'react-dom';
import type { ToastPosition } from './type';
import type { CSSObject } from '@emotion/react';
import { css } from '@emotion/react';

export interface ToastContainerProps {
    /**
     * An optional css class to set.
     */
    sx?: CSSObject;

    position?: ToastPosition;
}

function ToastContainer({ sx, position = 'topCenter' }: ToastContainerProps) {
    const [running, setRunning] = useState<Element | null>(null);
    const sampleData = ['info', 'success', 'error'];

    return (
        <>
            {true &&
                createPortal(
                    <div css={[Container, sx]}>
                        {sampleData.map((data, index) => {
                            return <div key={index}>{data}</div>;
                        })}
                    </div>,
                    document.body,
                )}
        </>
    );
}
export { ToastContainer };
