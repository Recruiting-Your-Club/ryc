import { clubQueries } from '@api/queryFactory';
import { ClubBox } from '@components';
import { useSuspenseQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Image, ImageDialog, Text } from '@ssoc/ui';

import {
    clubIntroContainer,
    imageItem,
    imageListContainer,
    textContainer,
} from './ClubIntro.style';

function ClubIntroPage() {
    // prop destruction
    // lib hooks
    const { id } = useParams();
    const { data: club } = useSuspenseQuery(clubQueries.getClub(id || ''));
    // initial values
    // state, ref, querystring hooks
    const [imageUrl, setImageUrl] = useState<string>();
    const [open, setOpen] = useState(false);
    // form hooks
    // query hooks
    // calculated values
    // handlers
    const handleImageClick = (url: string) => {
        setImageUrl(url);
    };
    // effects
    return (
        <div css={clubIntroContainer}>
            <ClubBox data={club?.clubSummaries} />
            <div css={textContainer}>
                <Text textAlign="start">{club?.detailDescription}</Text>
            </div>

            <div css={imageListContainer}>
                {club?.clubDetailImages?.map((images) => (
                    <button
                        css={imageItem}
                        key={images.imageUrl}
                        onClick={() => {
                            setOpen(true);
                            handleImageClick(images.imageUrl);
                        }}
                    >
                        <Image src={images.imageUrl} alt="동아리 사진" />
                    </button>
                ))}
            </div>

            {open && imageUrl && (
                <ImageDialog open={open} handleClose={() => setOpen(false)} imageUrl={imageUrl} />
            )}
        </div>
    );
}

export { ClubIntroPage };
