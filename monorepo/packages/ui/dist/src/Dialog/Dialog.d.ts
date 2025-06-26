import type { BaseDialogProps, DialogActionProps, DialogContentProps, DialogHeaderProps } from './types';
declare function BaseDialog({ children, open, size, sx, backdrop, handleClose, }: BaseDialogProps): import("@emotion/react/jsx-runtime").JSX.Element;
declare function DialogHeader({ border, children, sx, position, handleClose, closeIcon, }: DialogHeaderProps): import("@emotion/react/jsx-runtime").JSX.Element;
declare function DialogContent({ children, sx }: DialogContentProps): import("@emotion/react/jsx-runtime").JSX.Element;
declare function DialogAction({ children, sx, border, position }: DialogActionProps): import("@emotion/react/jsx-runtime").JSX.Element;
declare const Dialog: typeof BaseDialog & {
    Header: typeof DialogHeader;
    Content: typeof DialogContent;
    Action: typeof DialogAction;
};
export { Dialog };
//# sourceMappingURL=Dialog.d.ts.map