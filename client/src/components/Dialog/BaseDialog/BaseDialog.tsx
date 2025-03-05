import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
    overlay,
    dialogContainer,
    titleContainer,
    contentContainer,
    actionContainer,
} from './BaseDialog.style';

function BaseDialog({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const handleDialog = () => {
        setIsOpen((open) => !open);
    };

    return (
        <>
            <button onClick={handleDialog}>테스트 버튼 입니다.</button>
            {isOpen &&
                createPortal(
                    <>
                        <div css={overlay}>
                            <div css={dialogContainer}>{children}</div>
                        </div>
                    </>,
                    document.body,
                )}
        </>
    );
}

function DialogTitle({ children }: { children: React.ReactNode }) {
    return <h2 css={titleContainer}>{children}</h2>;
}

function DialogContent({ children }: { children: React.ReactNode }) {
    return <div css={contentContainer}>{children}</div>;
}

function DialogAction({ children }: { children: React.ReactNode }) {
    return <div css={actionContainer}>{children}</div>;
}

const Dialog = Object.assign(BaseDialog, {
    Header: DialogTitle,
    Content: DialogContent,
    Action: DialogAction,
});

export { Dialog };
