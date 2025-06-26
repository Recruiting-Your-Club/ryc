import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { tag } from './Tag.style';
function Tag({ text = 'sample', variant = 'primary', sx }) {
    return (_jsx("div", { children: _jsx("span", { css: [tag(variant), sx], children: text }) }));
}
export { Tag };
//# sourceMappingURL=Tag.js.map