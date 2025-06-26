import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { baseCard } from './Card.style';
function CardRoot({ width = '35rem', radius = '0.3125rem', hover = false, customCss, children, onClick, onClickHandler, }) {
    return (_jsx("div", { onClick: onClick, onKeyDown: onClickHandler, css: [baseCard(width, radius, hover), customCss], tabIndex: 0, role: "button", children: children }));
}
export { CardRoot };
//# sourceMappingURL=CardRoot.js.map