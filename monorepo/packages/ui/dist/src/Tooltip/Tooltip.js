import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { useRef, useState, useEffect } from 'react';
import { tooltipContainter, tooltipStyle } from './Tooltip.style';
function Tooltip({ content, direction = 'bottom', delay = 100, disabled = false, children, sx, }) {
    const [visible, setVisible] = useState();
    const timeoutRef = useRef();
    const showTooltip = () => {
        timeoutRef.current = setTimeout(() => {
            setVisible(true);
        }, delay);
    };
    const hideTooltip = () => {
        if (timeoutRef.current)
            clearTimeout(timeoutRef.current);
        setVisible(false);
    };
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);
    return (_jsxs("div", { css: tooltipContainter, onMouseEnter: showTooltip, onMouseLeave: hideTooltip, children: [children, !disabled && visible && _jsx("div", { css: [tooltipStyle(direction), sx], children: content })] }));
}
export { Tooltip };
//# sourceMappingURL=Tooltip.js.map