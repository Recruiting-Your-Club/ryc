import { Avatar } from '@components/Avatar/Avatar';
import React from 'react';
import type { AvatarShape, AvatarSize } from '../Avatar';
import { CardBottomBody } from './CardBottomBody';
import { CardDescription } from './CardDescription';
import { CardDivider } from './CardDivider';
import { CardFooter } from './CardFooter';
import { CardRoot } from './CardRoot';
import { CardTopBody } from './CardTopBody';
import { DescriptionText } from './DescriptionText';

interface CardProps {
    width?: string;
    radius?: string;
    avatarShape: AvatarShape;
    avatarSize: AvatarSize;
    avatarRadius?: string;
    footerHeight?: string;
    imageURL?: string;
    imageName: string;
    title: string;
    subTitle: string;
    description?: string;
}

function Card({
    width = '35rem',
    radius = '0.3125rem',
    avatarShape = 'square',
    avatarSize = 'xl',
    avatarRadius = '0.3125rem',
    footerHeight = '3.75rem',
    imageURL,
    imageName,
    title,
    subTitle,
    description = '세계 최고의 동아리라고 확신할 수 있습니다.',
}: CardProps) {
    return (
        <CardRoot width={width} radius={radius}>
            <CardTopBody>
                <Avatar
                    shape={avatarShape}
                    size={avatarSize}
                    radius={avatarRadius}
                    imageURL={imageURL}
                    imageName={imageName}
                />
                <CardDescription title={title} subTitle={subTitle} />
            </CardTopBody>
            <CardBottomBody>
                <DescriptionText description={description} />
            </CardBottomBody>
            <CardDivider />
            <CardFooter footerHeight={footerHeight} />
        </CardRoot>
    );
}
export { Card };
