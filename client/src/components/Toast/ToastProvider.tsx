import React, { createContext, useContext, useState } from 'react';
import { Toast } from './Toast';
import type { PropsWithChildren } from 'react';
import type { ToastPosition, ToastType, ToastProps } from './type';
import { ToastContainer } from './ToastContainer';

interface ToastContextType {
    toasts: ToastProps[];
    createToast: (message: string, options?: Partial<ToastProps>) => void;
    removeToast: (id: number) => void;
    clearAllToasts: () => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

function ToastProvider({ children }: PropsWithChildren) {
    const [toasts, setToasts] = useState<ToastProps[]>([]);

    return <div></div>;
}

export { ToastProvider };
