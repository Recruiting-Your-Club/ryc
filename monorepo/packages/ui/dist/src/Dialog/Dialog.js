import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { createPortal } from 'react-dom';
import { backdropContainer, dialogContainer, headerContainer, contentContainer, actionContainer, } from './Dialog.style';
import XIcon from '@assets/images/xIcon.svg';
import { Button } from '@components/_common/Button';
const dialogSize = {
    sm: {
        width: '35rem',
    },
    md: {
        width: '50rem',
    },
    lg: {
        width: '70rem',
    },
    xl: {
        width: '90rem',
    },
    full: {
        width: '100%',
        height: '100%',
    },
};
function BaseDialog({ children, open, size = 'md', sx, backdrop = true, handleClose, }) {
    return (_jsx(_Fragment, { children: open &&
            createPortal(_jsxs(_Fragment, { children: [_jsx("div", { css: backdropContainer, onClick: () => backdrop && handleClose?.(), "aria-hidden": "true" }), _jsx("div", { css: [dialogContainer, dialogSize[size], sx], children: children })] }), document.body) }));
}
function DialogHeader({ border = false, children, sx, position = 'start', handleClose, closeIcon = false, }) {
    return (_jsxs("header", { css: [headerContainer(border, position), sx], children: [children, closeIcon && (_jsx(Button, { variant: "transparent", size: "md", "aria-label": "close", onClick: handleClose, sx: { position: 'absolute', right: '2rem' }, children: _jsx(XIcon, {}) }))] }));
}
function DialogContent({ children, sx }) {
    return _jsx("div", { css: [contentContainer, sx], children: children });
}
function DialogAction({ children, sx, border = false, position = 'center' }) {
    return _jsx("div", { css: [actionContainer(border, position), sx], children: children });
}
const Dialog = Object.assign(BaseDialog, {
    Header: DialogHeader,
    Content: DialogContent,
    Action: DialogAction,
});
export { Dialog };
//# sourceMappingURL=Dialog.js.map