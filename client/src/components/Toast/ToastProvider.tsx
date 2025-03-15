import React, { createContext, useContext, useState } from 'react';
import { Toast } from './Toast';
import type { PropsWithChildren } from 'react';
import type { ToastPosition, ToastType, ToastProps, ToastContainerProps } from './type';
import { ToastContainer } from './ToastContainer';
import type { ReactNode } from 'react';

interface ToastContextType {
    toasts: ToastProps[];
    createToast: (
        message: string,
        options?: ToastProps,
        containerOptions?: ToastContainerProps,
    ) => void;
    removeToast?: (id: number) => void;
    clearAllToasts?: () => void;
    setContainer?: (options: ToastContainerProps) => void;
}

const defaultOptions: ToastProps = {
    type: 'info',
    toastTheme: 'white',
    duration: 3000,
    autoClose: true,
};

const defaultContainerOptions: ToastContainerProps = {
    position: 'topCenter',
    max: 3,
};

const ToastContext = createContext<ToastContextType | null>(null);

function ToastProvider({ children }: PropsWithChildren) {
    //prop destruction
    //lib hooks
    //state, ref, querystring hooks
    const [toasts, setToasts] = useState<ToastProps[]>([]);
    const [container, setContainer] = useState<ToastContainerProps>(defaultContainerOptions);

    //form hooks
    //query hooks
    //calculated values
    //effects
    //handlers
    const createToast = (
        content?: ReactNode,
        options?: ToastProps,
        containerOptions?: ToastContainerProps,
    ) => {
        if (containerOptions && Object.keys(containerOptions).length > 0) {
            // 객체가 존재하면서 객체가 비어있지 않을 때 ex) {}면 불가능
            setContainer({ ...defaultContainerOptions, ...containerOptions });
        }
        setToasts((prev) => {
            return [
                ...prev,
                {
                    content: content,
                    ...defaultOptions,
                    ...options,
                },
            ];
        });
    };

    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ toasts, createToast }}>
            {children}
            <ToastContainer toasts={toasts} props={container} />
        </ToastContext.Provider>
    );
}

export { ToastProvider, ToastContext };
