import React, { useState } from 'react';
import { ClubBox, Text, ImageDialog, Image } from '@components';
import {
    clubIntroContainer,
    imageItem,
    imageListContainer,
    textContainer,
} from './ClubIntroPage.style';
import { useDialog } from '@hooks/useDialog';
import { useSuspenseQuery } from '@tanstack/react-query';
import { clubQueries } from '@api/queryFactory';
import { useParams } from 'react-router-dom';

function ClubIntroPage() {
    // prop destruction
    // lib hooks
    const { open, openDialog, closeDialog } = useDialog();
    const { id } = useParams();
    const { data: club } = useSuspenseQuery(clubQueries.getClub(id || ''));
    // initial values
    // state, ref, querystring hooks
    const [imageUrl, setImageUrl] = useState<string>();
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
                            openDialog();
                            handleImageClick(images.imageUrl);
                        }}
                    >
                        <Image src={images.imageUrl} alt="동아리 사진" />
                    </button>
                ))}
            </div>

            {open && imageUrl && (
                <ImageDialog open={open} handleClose={closeDialog} imageUrl={imageUrl} />
            )}
        </div>
    );
}

export { ClubIntroPage };
