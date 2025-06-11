import type { CSSObject } from '@emotion/react';
export interface ImageRegisterProps {
    imageSrc?: string;
    setImageSrc: (imageSrc: string) => void;
    sx?: CSSObject;
}
