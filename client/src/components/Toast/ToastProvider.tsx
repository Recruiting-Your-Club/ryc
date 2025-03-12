import React, { createContext, useContext, useState } from 'react';
import { Toast } from './Toast';
import type { PropsWithChildren } from 'react';
import type { ToastPosition, ToastType } from './type';

interface ToastProviderProps {
    children: React.ReactNode;
    duration?: number;
    position?: ToastPosition;
    message?: string;
    type: ToastType;
}
const ToastContext = createContext({});

function ToastProvider({ children }: PropsWithChildren) {
    const [toasts, setToasts] = useState([]);

    const addToast = (message = 'test', type = 'info', duration = 3000) => {
        const id = Date.now();
    };
    return (
        <ToastContext.Provider value={{ toasts, addToast }}>
            <div className="toast-container">
                {toasts.map((toast, index) => (
                    <Toast key={index} />
                ))}
            </div>
            {children}
        </ToastContext.Provider>
    );
}

export { ToastProvider };
