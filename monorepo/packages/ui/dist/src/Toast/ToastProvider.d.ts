import React from 'react';
import type { ToastContainerProps, ToastType } from './type';
interface ToastContextType {
    toast: ToastType;
}
declare const ToastContext: React.Context<ToastContextType | null>;
declare function ToastProvider({ children, limit }: ToastContainerProps): import("@emotion/react/jsx-runtime").JSX.Element;
export { ToastProvider, ToastContext };
//# sourceMappingURL=ToastProvider.d.ts.map