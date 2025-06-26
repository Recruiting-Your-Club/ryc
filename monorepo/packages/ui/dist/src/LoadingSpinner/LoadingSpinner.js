import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import { loadingSpinnerContainer, pulseContainer, spinSpinnerContainer, } from './LoadingSpinner.style';
import theme from '@styles/theme';
function SpinSpinner(props) {
    const defaultProps = {
        size: 'xs',
        backgroundColor: '#f3f3f3',
        color: theme.colors.defaultHover,
    };
    const mergeProps = { ...defaultProps, ...props };
    return _jsx("div", { css: [spinSpinnerContainer(mergeProps), mergeProps.sx] });
}
function PulseSpinner(props) {
    const defaultProps = {
        size: 'xs',
        color: theme.colors.white,
    };
    const mergeProps = { ...defaultProps, ...props };
    return (_jsx(_Fragment, { children: _jsxs("div", { css: loadingSpinnerContainer, children: [_jsx("div", { css: [pulseContainer(0, mergeProps), mergeProps.sx] }), _jsx("div", { css: [pulseContainer(0.2, mergeProps), mergeProps.sx] }), _jsx("div", { css: [pulseContainer(0.4, mergeProps), mergeProps.sx] })] }) }));
}
export { PulseSpinner, SpinSpinner };
//# sourceMappingURL=LoadingSpinner.js.map