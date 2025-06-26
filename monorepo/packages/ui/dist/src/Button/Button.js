import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { s_size, s_base, s_variant } from './Button.style';
import { PulseSpinner } from '../LoadingSpinner';
function Button({ variant = 'primary', size = 'xl', children, disabled = false, radius = '0.6rem', zIndex = 0, loading = false, sx, type = 'button', 'aria-label': ariaLabel, onClick, }) {
    const cssProp = [s_base(radius, zIndex), s_size(size)];
    if (variant)
        cssProp.push(s_variant(variant));
    return (_jsxs("button", { disabled: disabled, onClick: onClick, type: type, "aria-label": ariaLabel, css: [cssProp, sx], children: [loading && _jsx(PulseSpinner, {}), !loading && children] }));
}
export { Button };
//# sourceMappingURL=Button.js.map