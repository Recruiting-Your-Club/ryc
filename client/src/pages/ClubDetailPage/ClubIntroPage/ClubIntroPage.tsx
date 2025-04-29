import React, { useState } from 'react';
import { ClubBox, Text, ImageDialog } from '@components';
import {
    clubIntroContainer,
    imageItem,
    imageListContainer,
    textContainer,
} from './ClubIntro.style';
import { useDialog } from '@hooks/useDialog';

function ClubIntroPage() {
    // prop destruction
    // lib hooks
    const { open, handleOpen, handleClose } = useDialog();
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

    // 필요한거
    /**
     * 1. 동아리 이미지 리스트
     * 2. 동아리 소개 글
     * 3. ClubBox에 들어갈 정보들
     */
    const images = [
        'https://cdn.pixabay.com/photo/2020/11/12/17/14/concert-5736160_640.jpg',
        'https://cdn.pixabay.com/photo/2025/04/13/21/14/woman-9532283_1280.jpg',
        'https://cdn.pixabay.com/photo/2025/03/20/21/00/vulture-9483838_640.jpg',
        'https://cdn.pixabay.com/photo/2025/03/20/21/00/vulture-9483838_640.jpg',
        'https://cdn.pixabay.com/photo/2025/03/20/21/00/vulture-9483838_640.jpg',
        'https://cdn.pixabay.com/photo/2025/03/20/21/00/vulture-9483838_640.jpg',
        'https://cdn.pixabay.com/photo/2025/03/20/21/00/vulture-9483838_640.jpg',
    ];
    return (
        <div css={clubIntroContainer}>
            <ClubBox />
            <div css={textContainer}>
                <Text textAlign="start">
                    EN#은 설립된 지 올해로 23년 된 역사 깊은 세종대학교 프로그래밍 학술
                    동아리입니다. ‘C#을 즐기자’라는 목적으로 설립된 EN#은 현재 다양한 언어와 기술
                    스택을 공부하며, WEB과 APP 분야에서 활발히 활동 중입니다.최종적으로 실제
                    자기만의 WEB, APP서비스를 구현하여 운영하는 경험을 목표로 하고 있습니다. EN#은
                    설립된 지 올해로 23년 된 역사 깊은 세종대학교 프로그래밍 학술 동아리입니다.
                    ‘C#을 즐기자’라는 목적으로 설립된 EN#은 현재 다양한 언어와 기술 스택을 공부하며,
                    WEB과 APP 분야에서 활발히 활동 중입니다. 최종적으로 실제 자기만의 WEB,
                    APP서비스를 구현하여 운영하는 경험을 목표로 하고 있습니다.
                </Text>
            </div>

            <div css={imageListContainer}>
                {images &&
                    images.map((url) => (
                        <button
                            css={imageItem}
                            key={url}
                            onClick={() => {
                                handleOpen();
                                handleImageClick(url);
                            }}
                        >
                            <img
                                src={url}
                                alt="동아리 사진"
                                width="100%"
                                height="100%"
                                css={{ borderRadius: '10px' }}
                            />
                        </button>
                    ))}
            </div>

            {open && imageUrl && (
                <ImageDialog
                    open={open} // useDialog 훅에서 받은 open 상태 전달
                    handleClose={handleClose} // useDialog 훅에서 받은 handleClose 함수 전달
                    imageUrl={imageUrl} // *** 추가: 새롭게 관리하는 dialogImageUrl 상태 전달 ***
                />
            )}
        </div>
    );
}

export { ClubIntroPage };
