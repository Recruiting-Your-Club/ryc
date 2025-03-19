import React, { createContext, useState } from 'react';
import type { PropsWithChildren } from 'react';
import type { Type, ToastProps, ToastContainerProps, ToastType } from './type';
import { ToastContainer } from './ToastContainer';
import type { ReactNode } from 'react';

interface ToastContextType {
    toast: ToastType;
}

const defaultOptions: ToastProps = {
    type: 'default',
    toastTheme: 'white',
    status: 'entering',
    progressBar: true,
    duration: 3000,
    autoClose: true,
};

const defaultContainerOptions: ToastContainerProps = {
    limit: 3,
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

    // 기본 토스트 발행
    function toast(
        content?: ReactNode,
        options?: ToastProps,
        containerOptions?: ToastContainerProps,
    ) {
        return createToast(content, mergeOptions('default', options), containerOptions);
    }

    // 토스트 타입별로 분류해서 발행
    function createToastByType(type: Type) {
        return (
            content?: ReactNode,
            options?: ToastProps,
            containerOptions?: ToastContainerProps,
        ) => createToast(content, mergeOptions(type, options), containerOptions);
    }

    // default옵션 + 사용자 정의 옵션 + 타입 합치기
    function mergeOptions(type: Type, options?: ToastProps) {
        return {
            ...defaultOptions,
            type: type,
            ...options,
        };
    }

    // 토스트 생성
    function createToast(
        content?: ReactNode,
        options?: ToastProps,
        containerOptions?: ToastContainerProps,
    ) {
        // 객체가 존재하면서 객체가 비어있지 않을 때 ex) {}면 불가능 && Container 세팅
        if (containerOptions && Object.keys(containerOptions).length > 0) {
            setContainer({ ...defaultContainerOptions, ...containerOptions });
        }
        const id = Date.now();
        const newToast = {
            id: id,
            content: content,
            ...options,
        };

        checkLimitAndRemoveToast();
        setToasts((prev) => [...prev, newToast]);

        if (options?.autoClose) AutoRemoveToast(id, options);
    }

    // 사용자가 제한 둔 toast 개수 넘어가면 삭제
    function checkLimitAndRemoveToast() {
        if (toasts.length >= (container?.limit || 3)) {
            toasts.map((toast, index) => {
                if (index === 0) {
                    toast.status = 'exiting';
                }
            });

            const removeToast = () => setToasts((prev) => prev.slice(1));
            animation(removeToast, 500);
        }
    }

    // 시간 지나면 자동삭제
    function AutoRemoveToast(id: number, options: ToastProps) {
        const removeAnimation = () =>
            setToasts((prev) =>
                prev.map((toast) => (toast.id === id ? { ...toast, status: 'exiting' } : toast)),
            );
        animation(removeAnimation, options.duration || 3000);

        const removeToast = () => setToasts((prev) => prev.filter((toast) => toast.id !== id));
        animation(removeToast, (options.duration || 3000) + 1000); // 애니메이션 끝난 후 제거해야해서 1000ms 추가
    }

    // 애니메이션
    function animation(method: () => void, duration: number) {
        setTimeout(method, duration);
    }

    toast.info = createToastByType('info');
    toast.success = createToastByType('success');
    toast.error = createToastByType('error');

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            <ToastContainer toasts={toasts} />
        </ToastContext.Provider>
    );
}

export { ToastProvider, ToastContext };
