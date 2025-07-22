import type { CSSObject } from '@emotion/react';
export interface ImageRegisterProps {
    image?: string;
    setImage: (imageSrc: string) => void;
    croppedImage?: string;
    setCroppedImage: (imageSrc: string) => void;
    sx?: CSSObject;
}
