import React, { createContext, useContext, useState } from 'react';
import { Toast } from './Toast';
import type { PropsWithChildren } from 'react';
import type { ToastPosition, ToastType, ToastProps, ToastContainerProps } from './type';
import { ToastContainer } from './ToastContainer';
import type { ReactNode } from 'react';

interface ToastContextType {
    toasts: ToastProps[];
    createToast: (
        message: ReactNode,
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
    status: 'entering',
    duration: 3000,
    autoClose: true,
};

const defaultContainerOptions: ToastContainerProps = {
    position: 'topCenter',
    limit: 4,
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
        // 객체가 존재하면서 객체가 비어있지 않을 때 ex) {}면 불가능
        if (containerOptions && Object.keys(containerOptions).length > 0) {
            setContainer({ ...defaultContainerOptions, ...containerOptions });
        }
        const id = Date.now();
        const mergeOptions = { ...defaultOptions, ...options };
        const newToast = {
            id: id,
            content: content,
            ...mergeOptions,
        };

        const isExceed = checkLimitAndRemoveToast();
        if (!isExceed) {
            // 값 추가
            setToasts((prev) => [...prev, newToast]);
        }
        if (mergeOptions?.autoClose) AutoRemoveToast(id, { ...mergeOptions });
    };

    const checkLimitAndRemoveToast = (): boolean => {
        if (toasts.length >= (container?.limit || 3)) {
            toasts.map((toast, index) => {
                if (index === 0) {
                    toast.status = 'exiting';
                }
            });

            const removeToast = () => setToasts((prev) => prev.slice(1));
            animation(removeToast, 500);
            return true;
        }
        return false;
    };

    const AutoRemoveToast = (id: number, mergeOptions: ToastProps) => {
        const removeAnimation = () =>
            setToasts((prev) =>
                prev.map((toast) => (toast.id === id ? { ...toast, status: 'exiting' } : toast)),
            );
        animation(removeAnimation, mergeOptions.duration || 3000);

        const removeToast = () => setToasts((prev) => prev.filter((toast) => toast.id !== id));
        animation(removeToast, (mergeOptions.duration || 3000) + 1000);
    };

    const animation = (method: () => void, duration: number) => {
        setTimeout(method, duration);
    };

    return (
        <ToastContext.Provider value={{ toasts, createToast }}>
            {children}
            <ToastContainer toasts={toasts} props={container} />
        </ToastContext.Provider>
    );
}

export { ToastProvider, ToastContext };
