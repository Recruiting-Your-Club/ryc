import type { SerializedStyles } from '@emotion/react';
import React from 'react';
interface CardRootProps {
    width?: string;
    radius?: string;
    hover?: boolean;
    customCss?: SerializedStyles;
    children?: React.ReactNode;
    onClick?: () => void;
    onClickHandler?: () => void;
}
declare function CardRoot({ width, radius, hover, customCss, children, onClick, onClickHandler, }: CardRootProps): import("@emotion/react/jsx-runtime").JSX.Element;
export { CardRoot };
//# sourceMappingURL=CardRoot.d.ts.map