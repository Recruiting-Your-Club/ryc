import { HttpError } from '@api/common/httpError';
import { useUserMutation } from '@api/hooks/userMutations';
import { myClubQueries } from '@api/queryFactory';
import { userQueries } from '@api/queryFactory/userQueries';
import { ImageRegister } from '@components';
import { BASE_URL } from '@constants/api';
import { useSuspenseQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

import { useRouter } from '@ssoc/hooks';
import { useFileUpload } from '@ssoc/hooks';
import { Avatar, Button, Text, useToast } from '@ssoc/ui';
import { blobUrlToFile } from '@ssoc/utils';

import BasicImage from '../../../../../packages/assets/images/basicImage.png';
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
    s_profileImage,
    s_profileInfo,
    s_profileSection,
    s_userInfoBox,
    s_userPageContainer,
} from './UserSettingPage.style';

function UserSettingPage() {
    //props destruction
    //lib hooks
    const { goTo } = useRouter();
    const { toast } = useToast();
    //initial values
    //state, ref, querystring hooks
    const [showEmail, setShowEmail] = useState(false);
    const [isProfileModifyMode, setIsProfileModifyMode] = useState(false);
    const [image, setImage] = useState<string>(BasicImage);
    const [croppedImage, setCroppedImage] = useState<string>(BasicImage);
    //form hooks
    //query hooks
    const { data: myClubs } = useSuspenseQuery(myClubQueries.all());
    const { data: adminInfo } = useSuspenseQuery(userQueries.getMyInformation());
    const { uploadFiles } = useFileUpload(BASE_URL);
    const { updateUserInfo } = useUserMutation({
        onSuccess: (data) => {
            toast.success('프로필 사진이 업데이트되었습니다.');
            setIsProfileModifyMode(false);
            if (data.representativeImage?.url) {
                setImage(data.representativeImage.url);
                setCroppedImage(data.representativeImage.url);
            }
        },
        onError: (error) => {
            if (error instanceof HttpError && error.statusCode === 500) {
                return;
            }
            toast.error('프로필 사진 업데이트에 실패했습니다.');
        },
    });
    //calculated values
    const updateProfileImage = () => {
        if (adminInfo.representativeImage?.url) {
            setImage(adminInfo.representativeImage.url);
            setCroppedImage(adminInfo.representativeImage.url);
        } else {
            setImage(BasicImage);
            setCroppedImage(BasicImage);
        }
    };
    //handlers
    const toggleEmailVisibility = () => {
        setShowEmail(!showEmail);
    };
    const toggleProfileModifyMode = () => {
        setIsProfileModifyMode(!isProfileModifyMode);
    };

    const handleClickMoveClub = (clubId: string) => {
        goTo(`/clubs/${clubId}`);
    };

    const handleUpdateProfile = async () => {
        if (croppedImage === BasicImage) {
            updateUserInfo({ representativeImage: null });
            return;
        }

        if (croppedImage && croppedImage !== adminInfo.representativeImage?.url) {
            try {
                if (croppedImage.startsWith('blob:')) {
                    const file = await blobUrlToFile(croppedImage, 'profile_image');
                    const uploadResults = await uploadFiles(file, 'USER_PROFILE');
                    const fileMetadataId = uploadResults[0]?.fileMetadataId;

                    if (fileMetadataId) {
                        updateUserInfo({ representativeImage: fileMetadataId });
                    } else {
                        toast.error('이미지 업로드에 실패했습니다.');
                    }
                } else {
                    updateUserInfo({ representativeImage: croppedImage });
                }
            } catch (error) {
                toast.error('프로필 이미지 업데이트에 실패했습니다.');
            }
        }
    };

    //effects
    useEffect(() => {
        updateProfileImage();
    }, [adminInfo]);

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
                                <Avatar
                                    shape="round"
                                    size="md"
                                    imageURL={croppedImage || undefined}
                                />
                            )}
                        </div>
                        <div css={s_profileInfo}>
                            <Text as={'div'} textAlign="left">
                                {adminInfo.name}
                            </Text>
                        </div>
                        <div css={s_detailActions}>
                            {isProfileModifyMode ? (
                                <>
                                    <button css={s_actionButton} onClick={handleUpdateProfile}>
                                        완료
                                    </button>
                                    <button
                                        css={s_actionButton}
                                        onClick={() => {
                                            setIsProfileModifyMode(false);
                                            if (adminInfo.representativeImage?.url) {
                                                setCroppedImage(adminInfo.representativeImage.url);
                                            }
                                        }}
                                    >
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

                            <Text type="subCaptionRegular" color="helper" sx={s_detailValue}>
                                {showEmail ? adminInfo.email : '*******@*********'}
                            </Text>

                            <div css={s_detailActions}>
                                <button css={s_actionButton} onClick={toggleEmailVisibility}>
                                    {showEmail ? '숨기기' : '보이기'}
                                </button>
                            </div>
                        </div>
                    </section>
                    <section css={s_clubSection}>
                        <Text as={'div'} type="bodySemibold">
                            소속된 동아리
                        </Text>
                        {myClubs.length === 0 ? (
                            <div css={s_emptyState}>
                                <Text type="subCaptionRegular" color="helper">
                                    아직 소속된 동아리가 없습니다.
                                </Text>
                            </div>
                        ) : (
                            <div css={s_clubGrid}>
                                {myClubs.map((club) => (
                                    <div key={club.myClubResponse.id} css={s_clubCard}>
                                        <Avatar
                                            shape="square"
                                            radius="6px"
                                            size="s"
                                            imageURL={club.myClubResponse.representativeImage?.url}
                                        />
                                        <div css={s_clubInfo}>
                                            <Text as={'div'} type="captionRegular">
                                                {club.myClubResponse.name}
                                            </Text>
                                            <Text
                                                as={'div'}
                                                type="subCaptionRegular"
                                                color="helper"
                                            >
                                                {club.myRole === 'OWNER' ? '회장' : '동아리원'}
                                            </Text>
                                        </div>
                                        <div css={{ marginLeft: 'auto' }}>
                                            <button
                                                css={s_actionButton}
                                                onClick={() =>
                                                    handleClickMoveClub(club.myClubResponse.id)
                                                }
                                            >
                                                이동
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </div>
            {isProfileModifyMode && (
                <Button
                    variant="primary"
                    size="full"
                    onClick={handleUpdateProfile}
                    sx={{ marginTop: '2.5rem', maxWidth: '80rem' }}
                    disabled={!isProfileModifyMode}
                >
                    수정완료
                </Button>
            )}
        </div>
    );
}

export { UserSettingPage };
