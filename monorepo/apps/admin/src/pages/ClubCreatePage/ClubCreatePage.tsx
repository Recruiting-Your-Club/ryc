import type { CreateClub } from '@api/domain/club/types';
import { useCreateClub } from '@api/hooks/clubMutation';
import { ImageRegister } from '@components';
import { BASE_URL } from '@constants/api';
import React, { useState } from 'react';

import { useFileUpload } from '@ssoc/hooks';
import { useRouter } from '@ssoc/hooks';
import { Avatar, Button, Dropdown, Input, Select, Text, useToast } from '@ssoc/ui';
import { blobUrlToFile } from '@ssoc/utils';

import {
    clubContainer,
    clubContainerLayout,
    clubContentContainer,
    clubContentTextContainer,
    clubCreateBox,
    clubCreateExampleText,
    clubCreateInputBox,
    clubCreatetitle,
    clubListContainer,
    clubPreviewBox,
    createInputLabel,
    createSubmitButton,
    s_createClubTagDropdown,
} from './ClubCreatePage.style';

const clubList = [
    {
        name: '동아리 이름',
        category: '동아리 태그입니다.',
        avatar: null,
    },
    {
        name: 'En#(엔샵)',
        category: '학술 동아리',
    },
    {
        name: 'CCC',
        category: '종교 동아리',
        avatar: 'CCC 아멘',
    },
    {
        name: '농구왕',
        category: '문화 동아리',
        avatar: '농구가 젤 좋아',
    },
];
function ClubCreatePage() {
    // prop destruction
    // lib hooks
    const { toast } = useToast();
    const { removeHistoryAndGo } = useRouter();
    // initial values
    const clubCategoryOptions = [
        { value: 'PERFORMANCE_ARTS', label: '공연 동아리' },
        { value: 'CULTURE', label: '문화 동아리' },
        { value: 'SPORTS', label: '체육 동아리' },
        { value: 'ACADEMIC', label: '학술 동아리' },
        { value: 'VOLUNTEER', label: '봉사 동아리' },
        { value: 'RELIGION', label: '종교 동아리' },
    ];

    // state, ref, querystring hooks
    const [createClubName, setCreateClubName] = useState('동아리 이름');
    const [clubTag, setClubTag] = useState('동아리의 대표적인 태그를 선택해주세요.');
    const [image, setImage] = useState<string>();
    const [croppedImage, setCroppedImage] = useState<string>();
    // form hooks
    // query hooks
    const { uploadFiles, error } = useFileUpload(BASE_URL);
    const { mutateAsync: createClub, isPending: isCreateLoading } = useCreateClub();

    // calculated values
    const getSelectedLabel = () => {
        const selected = clubCategoryOptions.find((option) => option.label === clubTag);
        return selected ? selected.value : 'PERFORMANCE_ARTS';
    };

    const saveClubImage = async () => {
        if (!croppedImage) return;
        const file = await blobUrlToFile(croppedImage, 'club_logo');
        try {
            return await uploadFiles(file, 'CLUB_CREATE');
        } catch (error) {
            toast.error('이미지 업로드에 실패했어요.', {
                type: 'error',
                toastTheme: 'white',
            });
            throw error;
        }
    };

    const checkClubData = (createdClub: CreateClub) => {
        if (
            !createdClub.name ||
            createdClub.name.trim() === '' ||
            createdClub.name === '동아리 이름'
        ) {
            toast.error('동아리 이름을 입력해주세요.', {
                type: 'error',
                toastTheme: 'white',
            });
            return false;
        }

        if (
            !createdClub.category ||
            createdClub.category === '동아리의 대표적인 태그를 선택해주세요.'
        ) {
            toast.error('동아리 카테고리를 선택해주세요.', {
                type: 'error',
                toastTheme: 'white',
            });
            return false;
        }

        if (!createdClub.representativeImage) {
            toast.error('동아리 대표 이미지를 등록해주세요.', {
                type: 'error',
                toastTheme: 'white',
            });
            return false;
        }
        return true;
    };
    const createClubData = async () => {
        const selectedLabel = getSelectedLabel();
        // 이미지 저장
        const fileMetadataIds = await saveClubImage();
        const createdClub = {
            name: createClubName.trim(),
            category: selectedLabel,
            representativeImage: fileMetadataIds?.[0] ?? '',
        };
        if (!checkClubData(createdClub)) {
            return null;
        }
        return createdClub;
    };

    const resetForm = () => {
        setClubTag('동아리의 대표적인 태그를 선택해주세요.');
        setCreateClubName('동아리 이름');
        setImage('');
        setCroppedImage('');
    };

    const submitCreateClub = async () => {
        const createdClub = await createClubData();
        if (!createdClub) return;
        try {
            const result = await createClub(createdClub);
            toast('동아리 생성이 완료되었습니다.', {
                type: 'success',
                toastTheme: 'white',
            });
            resetForm();
            removeHistoryAndGo(`/clubs/${result.clubId}`);
        } catch (error) {
            if (error instanceof Error) {
                toast(error.message, {
                    type: 'error',
                });
            }
        }
    };

    // effects
    return (
        <div css={clubContainerLayout}>
            <div css={clubContainer}>
                <div>
                    <Text type="bodySemibold" textAlign="start" sx={clubCreateExampleText}>
                        <span css={{ fontSize: '2rem' }}>📝</span> 이렇게 추가될 거예요
                    </Text>
                    <div css={clubPreviewBox}>
                        <Text type="bodyBold" textAlign="start" sx={clubCreatetitle}>
                            나의 동아리 목록
                        </Text>
                        <ul css={clubListContainer}>
                            {clubList.map((club, index) => (
                                <li key={club.name} css={clubContentContainer(index)}>
                                    {index === 0 ? (
                                        <Avatar radius="10px" imageURL={croppedImage} />
                                    ) : (
                                        <Avatar radius="10px" />
                                    )}
                                    <div css={clubContentTextContainer}>
                                        <Text type="bodySemibold" textAlign="start" noWrap cropped>
                                            {index === 0 ? createClubName : club.name}
                                        </Text>
                                        <Text
                                            type="captionRegular"
                                            textAlign="start"
                                            color="caption"
                                        >
                                            {index === 0 ? clubTag : club.category}
                                        </Text>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div css={clubCreateBox}>
                    <ImageRegister
                        image={image}
                        setImage={setImage}
                        croppedImage={croppedImage}
                        setCroppedImage={setCroppedImage}
                    />
                    <div css={clubCreateInputBox}>
                        <Input
                            type="text"
                            placeholder="동아리 이름을 입력해주세요."
                            label="동아리 이름"
                            onChange={(event) => setCreateClubName(event.target.value)}
                            required
                            labelSx={createInputLabel}
                        />
                        <Select
                            sx={s_createClubTagDropdown}
                            options={clubCategoryOptions}
                            value={clubTag}
                            onValueChange={setClubTag}
                        >
                            <Select.Trigger sx={{ border: 'none', width: '100%', height: '100%' }}>
                                <Text type="captionRegular" textAlign="start" color="caption">
                                    {clubTag}
                                </Text>
                            </Select.Trigger>
                            <Select.Content>
                                {clubCategoryOptions.map(({ value, label }) => (
                                    <Select.Item key={value} value={label}>
                                        {label}
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select>
                    </div>
                    <Button
                        variant="primary"
                        size="lg"
                        sx={createSubmitButton}
                        loading={isCreateLoading}
                        onClick={submitCreateClub}
                    >
                        제출하기
                    </Button>
                </div>
            </div>
        </div>
    );
}
export { ClubCreatePage };
