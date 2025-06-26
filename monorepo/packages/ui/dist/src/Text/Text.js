import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { textStyle, highlightStyle } from './Text.style';
function HighLight({ children, sx }) {
    return _jsx("span", { css: [highlightStyle, sx], children: children });
}
function Text({ type = 'bodyRegular', color = 'black', textAlign = 'center', noWrap = false, cropped = false, children, sx, as: Tag = 'p', }) {
    return _jsx(Tag, { css: [textStyle({ type, color, textAlign, noWrap, cropped }), sx], children: children });
}
Text.HighLight = HighLight;
export { Text };
//# sourceMappingURL=Text.js.map