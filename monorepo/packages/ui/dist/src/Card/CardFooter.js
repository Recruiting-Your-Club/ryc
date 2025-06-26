import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { footerContainer } from './Card.style';
function CardFooter({ footerHeight = '3.3rem', children }) {
    return _jsx("div", { css: footerContainer(footerHeight), children: children });
}
export { CardFooter };
//# sourceMappingURL=CardFooter.js.map