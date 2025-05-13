import React, { useState } from 'react';
import { Text, Button, Tag, ClubBox, Image, ImageDialog } from '@components';
import {
    clubNameContainer,
    contentContainer,
    recruitmentContainer,
    imageListContainer,
    imageItem,
    contentHeader,
    contentBody,
    headerSubContainer,
    applyButtonAtDesktop,
    textContainer,
    applyButtonAtMobile,
} from './RecruitmentPage.style';
import { useDialog } from '@hooks/useDialog';

function RecruitmentPage() {
    // prop destruction
    const { open, openDialog, closeDialog } = useDialog();
    // lib hooks
    // initial values
    const images = [
        'https://ticketimage.interpark.com/Play/image/large/24/24013437_p.gif',
        'https://images.unsplash.com/photo-1496989981497-27d69cdad83e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fCVFQiU4RiU5OSVFQyU5NSU4NCVFQiVBNiVBQ3xlbnwwfHwwfHx8MA%3D%3D',
        'https://plus.unsplash.com/premium_photo-1673795753320-a9df2df4461e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Mnx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1745605443047-ea774bf4a77f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMnx8fGVufDB8fHx8fA%3D%3D',
        'https://d32gkk464bsqbe.cloudfront.net/JTI08fg3oWjuMKWf6pO94MCxv5M=/400x300/company-profiles/o/b23a5925970125281c7ad70138c1bee3d79df7ca.png',
    ];
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
        <div css={recruitmentContainer}>
            <div css={contentContainer}>
                <div css={contentHeader}>
                    <Text as="h1" type="h1Semibold" textAlign="start">
                        프론트엔드 모집
                    </Text>
                    <div css={headerSubContainer}>
                        <div css={clubNameContainer}>
                            <Text as="h4" type="h4Light" color="caption">
                                EN#
                            </Text>
                            <Tag variant="progress" text="모집중" />
                        </div>
                        <Button variant="primary" size="xl" sx={applyButtonAtDesktop}>
                            지원하기
                        </Button>
                    </div>
                </div>

                <div css={contentBody}>
                    <ClubBox />
                    <Text textAlign="start" sx={textContainer}>
                        ` EN#은 설립된 지 올해로 23년 된 역사 깊은 세종대학교 프로그래밍 학술
                        동아리입니다. ‘C#을 즐기자’라는 목적으로 설립된 EN#은 현재 다양한 언어와
                        기술 스택을 공부하며, WEB과 APP 분야에서 활발히 활동 중입니다.최종적으로
                        실제 자기만의 WEB, APP서비스를 구현하여 운영하는 경험을 목표로 하고
                        있습니다. EN#은 설립된 지 올해로 23년 된 역사 깊은 세종대학교 프로그래밍
                        학술 동아리입니다. ‘C#을 즐기자’라는 목적으로 설립된 EN#은 현재 다양한
                        언어와 기술 스택을 공부하며, WEB과 APP 분야에서 활발히 활동 중입니다.
                        최종적으로 실제 자기만의 WEB, APP서비스를 구현하여 운영하는 경험을 목표로
                        하고 있습니다. ` 동아리입니다. ‘C#을 즐기자’라는 목적으로 설립된 EN#은 현재
                        다양한 언어와 기술 스택을 공부하며, WEB과 APP 분야에서 활발히 활동
                        중입니다.최종적으로 실제 자기만의 WEB, APP서비스를 구현하여 운영하는 경험을
                        목표로 하고 있습니다. EN#은 설립된 지 올해로 23년 된 역사 깊은 세종대학교
                        프로그래밍 학술 동아리입니다. ‘C#을 즐기자’라는 목적으로 설립된 EN#은 현재
                        다양한 언어와 기술 스택을 공부하며, WEB과 APP 분야에서 활발히 활동 중입니다.
                        최종적으로 실제 자기만의 WEB, APP서비스를 구현하여 운영하는 경험을 목표로
                        하고 있습니다. ` 스택을 공부하며, WEB과 APP 분야에서 활발히 활동
                        중입니다.최종적으로 실제 자기만의 WEB, APP서비스를 구현하여 운영하는 경험을
                        목표로 하고 있습니다. EN#은 설립된 지 올해로 23년 된 역사 깊은 세종대학교
                        프로그래밍 학술 동아리입니다. ‘C#을 즐기자’라는 목적으로 설립된 EN#은 현재
                        다양한 언어와 기술 스택을 공부하며, WEB과 APP 분야에서 활발히 활동 중입니다.
                        최종적으로 실제 자기만의 WEB, APP서비스를 구현하여 운영하는 경험을 목표로
                        하고 있습니다. ` 스택을 공부하며, WEB과 APP 분야에서 활발히 활동
                        중입니다.최종적으로 실제 자기만의 WEB, APP서비스를 구현하여 운영하는 경험을
                        목표로 하고 있습니다. EN#은 설립된 지 올해로 23년 된 역사 깊은 세종대학교
                        프로그래밍 학술 동아리입니다. ‘C#을 즐기자’라는 목적으로 설립된 EN#은 현재
                        다양한 언어와 기술 스택을 공부하며, WEB과 APP 분야에서 활발히 활동 중입니다.
                        최종적으로 실제 자기만의 WEB, APP서비스를 구현하여 운영하는 경험을 목표로
                        하고 있습니다. `
                    </Text>

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
                </div>

                <div css={applyButtonAtMobile}>
                    <Button size="full">지원하기</Button>
                </div>

                {open && imageUrl && (
                    <ImageDialog open={open} handleClose={closeDialog} imageUrl={imageUrl} />
                )}
            </div>
        </div>
    );
}
export { RecruitmentPage };
