import { jsx as _jsx, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import { divider } from './Divider.style';
function Divider({ width = 'full', color = 'gray', weight = '1', sx, ...props }) {
    return (_jsx(_Fragment, { children: _jsx("hr", { css: [divider({ width, color, weight }), sx], ...props }) }));
}
export { Divider };
//# sourceMappingURL=Divider.js.map