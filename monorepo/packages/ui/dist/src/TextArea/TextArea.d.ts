import type { CSSObject } from '@emotion/react';
import type { TextareaHTMLAttributes } from 'react';
import type { TextAreaSize, TextAreaVariant } from './TextArea.style';
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    size?: TextAreaSize;
    variant?: TextAreaVariant;
    width?: string;
    error?: boolean;
    errorText?: string;
    wrapperSx?: CSSObject;
    textAreaSx?: CSSObject;
}
declare function TextArea({ size, variant, width, error, errorText, wrapperSx, textAreaSx, value, maxLength, disabled, ...props }: TextAreaProps): import("@emotion/react/jsx-runtime").JSX.Element;
export { TextArea };
//# sourceMappingURL=TextArea.d.ts.map