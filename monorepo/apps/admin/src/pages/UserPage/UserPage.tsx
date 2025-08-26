import { ImageRegister } from '@components';
import React, { useState } from 'react';

import { Avatar, Button, Input, Text } from '@ssoc/ui';

import {
    s_accountDetails,
    s_actionButton,
    s_clubCard,
    s_clubGrid,
    s_clubInfo,
    s_clubSection,
    s_content,
    s_detailActions,
    s_detailItem,
    s_detailLabel,
    s_detailValue,
    s_emptyState,
    s_header,
    s_headerTitle,
    s_profileImage,
    s_profileInfo,
    s_profileSection,
    s_userInfoBox,
    s_userPageContainer,
} from './UserPage.style';

function UserPage() {
    const [showEmail, setShowEmail] = useState(false);
    const [isProfileModifyMode, setIsProfileModifyMode] = useState(false);
    const [isEmailModifyMode, setIsEmailModifyMode] = useState(false);

    // image register states
    const [image, setImage] = useState<string>('');
    const [croppedImage, setCroppedImage] = useState<string>('');

    // email editing state (mock default)
    const [email, setEmail] = useState<string>('example@naver.com');

    const toggleEmailVisibility = () => {
        setShowEmail(!showEmail);
    };
    const toggleProfileModifyMode = () => {
        setIsProfileModifyMode(!isProfileModifyMode);
    };

    const toggleEmailModifyMode = () => {
        setIsEmailModifyMode(!isEmailModifyMode);
    };

    // mock clubs data - replace with API/store later
    const clubs = [
        { id: '1', name: 'EN#', role: '회장', logo: '' },
        { id: '2', name: '소울트레인', role: '멤버', logo: '' },
        { id: '3', name: '한울림', role: '멤버', logo: '' },
    ];

    return (
        <div css={s_userPageContainer}>
            <div css={s_userInfoBox}>
                <div css={s_header}>
                    <Text as={'div'} type="h4Semibold">
                        내 계정
                    </Text>
                </div>
                <div css={s_content}>
                    <section css={s_profileSection}>
                        <div css={s_profileImage}>
                            {isProfileModifyMode ? (
                                <ImageRegister
                                    image={image}
                                    setImage={setImage}
                                    croppedImage={croppedImage}
                                    setCroppedImage={setCroppedImage}
                                />
                            ) : (
                                <Avatar shape="round" size="md" imageURL={croppedImage} />
                            )}
                        </div>
                        <div css={s_profileInfo}>
                            <Text as={'div'} textAlign="left">
                                윤의종
                            </Text>
                        </div>
                        <div css={s_detailActions}>
                            {isProfileModifyMode ? (
                                <>
                                    <button css={s_actionButton} onClick={toggleProfileModifyMode}>
                                        완료
                                    </button>
                                    <button css={s_actionButton} onClick={toggleProfileModifyMode}>
                                        취소
                                    </button>
                                </>
                            ) : (
                                <button css={s_actionButton} onClick={toggleProfileModifyMode}>
                                    수정
                                </button>
                            )}
                        </div>
                    </section>
                    <section css={s_accountDetails}>
                        <div css={s_detailItem}>
                            <Text as={'div'} type="bodyRegular" sx={s_detailLabel}>
                                이메일
                            </Text>
                            {isEmailModifyMode ? (
                                <div css={s_detailValue}>
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="이메일을 입력하세요"
                                        sx={{ width: '24rem' }}
                                    />
                                </div>
                            ) : (
                                <Text type="subCaptionRegular" color="helper" sx={s_detailValue}>
                                    {showEmail ? email : '*********@naver.com'}
                                </Text>
                            )}
                            <div css={s_detailActions}>
                                {!isEmailModifyMode && (
                                    <button css={s_actionButton} onClick={toggleEmailVisibility}>
                                        {showEmail ? '숨기기' : '보이기'}
                                    </button>
                                )}
                                {isEmailModifyMode ? (
                                    <>
                                        <button
                                            css={s_actionButton}
                                            onClick={toggleEmailModifyMode}
                                        >
                                            완료
                                        </button>
                                        <button
                                            css={s_actionButton}
                                            onClick={toggleEmailModifyMode}
                                        >
                                            취소
                                        </button>
                                    </>
                                ) : (
                                    <button css={s_actionButton} onClick={toggleEmailModifyMode}>
                                        수정
                                    </button>
                                )}
                            </div>
                        </div>
                    </section>
                    <section css={s_clubSection}>
                        <Text as={'div'} type="bodySemibold">
                            소속된 동아리
                        </Text>
                        {clubs.length === 0 ? (
                            <div css={s_emptyState}>
                                <Text type="subCaptionRegular" color="helper">
                                    아직 소속된 동아리가 없습니다.
                                </Text>
                            </div>
                        ) : (
                            <div css={s_clubGrid}>
                                {clubs.map((club) => (
                                    <div key={club.id} css={s_clubCard}>
                                        <Avatar shape="square" radius="6px" size="s" />
                                        <div css={s_clubInfo}>
                                            <Text as={'div'} type="captionRegular">
                                                {club.name}
                                            </Text>
                                            <Text
                                                as={'div'}
                                                type="subCaptionRegular"
                                                color="helper"
                                            >
                                                {club.role}
                                            </Text>
                                        </div>
                                        <div css={{ marginLeft: 'auto' }}>
                                            <button css={s_actionButton}>이동</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </div>
            <Button
                variant="primary"
                size="full"
                onClick={toggleProfileModifyMode}
                sx={{ marginTop: '2.5rem', maxWidth: '80rem' }}
            >
                수정완료
            </Button>
        </div>
    );
}

export { UserPage };
