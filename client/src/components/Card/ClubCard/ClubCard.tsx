import { Avatar } from '@components/Avatar/Avatar';
import type { tagVariant } from '@components/Tag';
import { Tag } from '@components/Tag';
import { useRouter } from '@hooks/useRouter';
import React from 'react';
import type { AvatarShape, AvatarSize } from '../../Avatar';
import { CardBottomBody } from '../CardBottomBody';
import { CardDescription } from '../CardDescription';
import { CardDivider } from '../CardDivider';
import { CardFooter } from '../CardFooter';
import { CardRoot } from '../CardRoot';
import { CardTopBody } from '../CardTopBody';
import { statusTag } from './ClubCard.style';
import { TagList } from './TagList';

interface ClubCardProps {
    width?: string;
    radius?: string;
    avatarShape: AvatarShape;
    avatarSize: AvatarSize;
    avatarRadius?: string;
    footerHeight?: string;
    imageURL?: string;
    imageName: string;
    title: string;
    type: string;
    status: tagVariant;
    tag: string[];
    path: string;
}

const RECRUITMENT_STATUS: Record<tagVariant, string> = {
    primary: '모집예정',
    progress: '모집중',
    end: '모집마감',
};

function ClubCard({
    width = '35rem',
    radius = '0.3125rem',
    footerHeight = '3.75rem',
    avatarShape = 'square',
    avatarSize = 'xl',
    avatarRadius = '0.3125rem',
    imageURL,
    imageName,
    title,
    type,
    status,
    tag,
    path,
}: ClubCardProps) {
    const { goTo } = useRouter();

    return (
        <CardRoot width={width} radius={radius} onClick={() => goTo(path)}>
            <CardTopBody>
                <Avatar
                    shape={avatarShape}
                    size={avatarSize}
                    radius={avatarRadius}
                    imageURL={imageURL}
                    imageName={imageName}
                />
                <CardDescription title={title} subTitle={type} />
                <div css={statusTag}>
                    <Tag text={RECRUITMENT_STATUS[status]} variant={status} />
                </div>
            </CardTopBody>
            <CardBottomBody />
            <CardDivider />
            <CardFooter footerHeight={footerHeight}>
                <TagList tag={tag} />
            </CardFooter>
        </CardRoot>
    );
}
export { ClubCard };
