import React, { useState } from 'react';
import { ClubBox, Text, ImageDialog, Image } from '@components';
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
    const { open, openDialog, closeDialog } = useDialog();
    // initial values
    const images = [
        'https://ticketimage.interpark.com/Play/image/large/24/24013437_p.gif',
        'https://images.unsplash.com/photo-1496989981497-27d69cdad83e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fCVFQiU4RiU5OSVFQyU5NSU4NCVFQiVBNiVBQ3xlbnwwfHwwfHx8MA%3D%3D',
        'https://plus.unsplash.com/premium_photo-1673795753320-a9df2df4461e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Mnx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1745605443047-ea774bf4a77f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMnx8fGVufDB8fHx8fA%3D%3D',
        'https://cf-ea.everytime.kr/attach/232/74463499/everytime-1741847240041.jpg?Expires=1746087876&Key-Pair-Id=APKAICU6XZKH23IGASFA&Signature=WSpbdOC9ZMACA54-77OBuUediahTLZxr4G0qeFVAuhDAAmjGx1oRoIoqBTSlzIuTB0uP8RGjOg5A~odr7wYgkaeAKJupvvK5~jPj7iv-1KFzSugNXM35l~KExqNlQr8tcyvjeQ7niXb5UkWCkObR2H50zu6RjSpSvZ6l6cvCEXkpryfo6aREwM8YOm1wLoZzyPi3UEmh9uOdipHTaYYoesl~pxXQ8B~Qfcn5FtM1algsXQ3ctXxrW2XSHBCWP-JxwvYykEN8k3ruTcOEqkcxMZQApSLE2Ynr4XFZC4emLx~ui8MiCradQiy35sw0UM4YqbnqdAEZpcFXDL7qD0NZ7Q__',
    ];
    const clubIntroduction = `
EN#은 설립된 지 올해로 23년 된 역사 깊은 세종대학교 프로그래밍 학술
동아리입니다. ‘C#을 즐기자’라는 목적으로 설립된 EN#은 현재 다양한 언어와 기술
스택을 공부하며, WEB과 APP 분야에서 활발히 활동 중입니다.최종적으로 실제
자기만의 WEB, APP서비스를 구현하여 운영하는 경험을 목표로 하고 있습니다. EN#은
설립된 지 올해로 23년 된 역사 깊은 세종대학교 프로그래밍 학술 동아리입니다.
‘C#을 즐기자’라는 목적으로 설립된 EN#은 현재 다양한 언어와 기술 스택을 공부하며,
WEB과 APP 분야에서 활발히 활동 중입니다. 최종적으로 실제 자기만의 WEB,
APP서비스를 구현하여 운영하는 경험을 목표로 하고 있습니다.
        `;
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
            <ClubBox />
            <div css={textContainer}>
                <Text textAlign="start">{clubIntroduction}</Text>
            </div>

            <div css={imageListContainer}>
                {images &&
                    images.map((url) => (
                        <button
                            css={imageItem}
                            key={url}
                            onClick={() => {
                                openDialog();
                                handleImageClick(url);
                            }}
                        >
                            <Image src={url} alt="동아리 사진" />
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
