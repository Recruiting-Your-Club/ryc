import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { ToastPosition, ToastType } from './type';

interface ToastProps {
    duration?: number;
    position?: ToastPosition;
    message?: string;
    type?: ToastType;
}
function Toast({ duration, position, message, type }: ToastProps) {
    const [container, setContainer] = useState<Element | null>(null);
    return <>{container && createPortal(<div>test</div>, document.body)}</>;
}
export { Toast };
