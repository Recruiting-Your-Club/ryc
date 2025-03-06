import BasicImage from '@assets/images/basicImage.png';
import React from 'react';
import { image } from './Avatar.style';

interface AvatarProps {
    imageURL?: string;
    imageName: string;
    size?: string;
    shape?: string;
}

function Avatar({ imageURL, imageName, size, shape }: AvatarProps) {
    return (
        <>
            <img src={imageURL ? imageURL : BasicImage} alt={imageName} css={image} />
        </>
    );
}

export { Avatar };
