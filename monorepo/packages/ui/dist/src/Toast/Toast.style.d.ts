import type { CSSObject } from '@emotion/react';
import type { ToastPosition, ToastTheme, Type } from './type';
export declare const Container: import("@emotion/react").SerializedStyles;
export declare const ContainerPosition: Record<ToastPosition, CSSObject>;
export declare const toastStyle: (status: string, toastTheme: ToastTheme, type: Type) => import("@emotion/react").SerializedStyles;
export declare const svgStyle: (type: Type) => import("@emotion/react").SerializedStyles;
export declare const progressBarStyle: (toastTheme: ToastTheme, type: Type, duration: number) => import("@emotion/react").SerializedStyles;
//# sourceMappingURL=Toast.style.d.ts.map