import type { Club } from '@api/domain/club/types';
import { useUpdateClub } from '@api/mutationFactory';
import { myClubQueries } from '@api/queryFactory';
import ssoc from '@assets/images/ssoc.png';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Divider } from '@ssoc/ui';
import { Editor, Image, ImageDialog, Input, Select, Text, useToast } from '@ssoc/ui';
import { getCategory } from '@ssoc/utils';

import { ClubBox, FileUpLoader, ImageRegister } from '../../components';
import type { ClubBoxItem } from '../../components/ClubBox/types';
import {
    s_buttonWrapper,
    s_clubDetailPageContainer,
    s_clubHeader,
    s_clubHeaderTextContainer,
    s_clubImage,
    s_contentContainer,
    s_editButtonContainer,
    s_imageItem,
    s_imageListContainer,
    s_introduceContainer,
} from './ClubEditPage.style';

function ClubEditPage() {
    // lib hooks
    const { clubId } = useParams();
    const { toast } = useToast();
    // initial values
    // state, ref, querystring hooks
    const [isEditMode, setIsEditMode] = useState(false);
    const [image, setImage] = useState<string>(ssoc);
    const [open, setOpen] = useState(false);
    const [croppedImage, setCroppedImage] = useState<string>('');
    const [clubName, setClubName] = useState<string>('');
    const [clubCategory, setClubCategory] = useState<string>('');
    const [introText, setIntroText] = useState<string>('');
    const [expandedImage, setExpandedImage] = useState<string>();
    const [clubSummaries, setClubSummaries] = useState<ClubBoxItem[] | undefined>([]);
    const [clubDetailImages, setClubDetailImages] = useState<string[]>([]);
    // form hooks
    // query hooks
    const { data: club } = useQuery(myClubQueries.getClub(clubId ?? ''));
    const { mutateAsync: updateClub, isPending: isUpdateLoading } = useUpdateClub();

    // calculated values
    const editModeLogo = (
        <ImageRegister
            image={image}
            setImage={setImage}
            croppedImage={croppedImage}
            setCroppedImage={setCroppedImage}
            sx={{ width: '6rem', height: '6rem' }}
        />
    );
    const readModeLogo = (
        <img
            src={image}
            alt="대표이미지"
            width="100%"
            height="100%"
            css={{ borderRadius: '10px' }}
        />
    );
    //FIXME: Select value 값 리팩토링한 Select로 바꿔줘야함
    const editModeClubNameAndCategory = (
        <>
            <Input
                value={clubName}
                onChange={(event) => setClubName(event.target.value)}
                inputSx={{ height: '3rem' }}
            />
            <Select value={clubCategory} onValueChange={setClubCategory} size="s">
                <Select.Trigger sx={{ height: '2.8rem', width: '10rem' }}>
                    <Select.Value />
                </Select.Trigger>
                <Select.Content>
                    <Select.Item value="PERFORMANCE_ARTS">공연동아리</Select.Item>
                    <Select.Item value="CULTURE">문화동아리</Select.Item>
                    <Select.Item value="SPORTS">체육동아리</Select.Item>
                    <Select.Item value="ACADEMIC">학술동아리</Select.Item>
                    <Select.Item value="VOLUNTEER">봉사동아리</Select.Item>
                    <Select.Item value="RELIGION">종교동아리</Select.Item>
                </Select.Content>
            </Select>
        </>
    );
    const readModeClubNameAndCategory = (
        <>
            <Text as="h4" type="h1Semibold" textAlign="start" noWrap>
                {club?.name}
            </Text>
            <Text
                as="div"
                type="captionSemibold"
                color="helper"
                textAlign="start"
                noWrap
                sx={{ marginLeft: '0.4rem' }}
            >
                {getCategory(club?.category || '')}
            </Text>
        </>
    );
    const editModeIntroduce = (
        <Editor.Root sx={{ marginTop: '5rem' }}>
            <Editor.Toolbar />
            <Editor.Textarea value={introText} onChange={setIntroText} sx={{ height: '100rem' }} />
        </Editor.Root>
    );
    const readModeIntroduce = (
        <div css={s_introduceContainer}>
            <Text textAlign="start">{club?.detailDescription}</Text>
        </div>
    );
    //FIXME: 추후에 이미지 서버에서 받아와서 초기값으로 바꿔줘야함
    const editModeImageList = (
        <FileUpLoader sx={{ marginTop: '5rem' }}>
            <FileUpLoader.Button text="이미지 추가" />
            <FileUpLoader.Box text="동아리 이미지 업로드" />
        </FileUpLoader>
    );
    const readModeImageList = (
        <>
            <div css={s_imageListContainer}>
                {club?.clubDetailImages?.map((image) => (
                    <button
                        css={s_imageItem}
                        key={image}
                        onClick={() => {
                            setOpen(true);
                            handleImageExpanded(image);
                        }}
                    >
                        <Image src={image} alt="동아리 사진" />
                    </button>
                ))}
            </div>

            {open && expandedImage && (
                <ImageDialog
                    open={open}
                    handleClose={() => setOpen(false)}
                    imageUrl={expandedImage}
                />
            )}
        </>
    );
    // handlers
    const handleImageExpanded = (url: string) => {
        setExpandedImage(url);
    };
    const handleDataChange = (updatedData: ClubBoxItem[]) => {
        setClubSummaries(updatedData);
    };

    const handleAddItem = () => {
        const id = crypto.randomUUID();
        if (!clubSummaries) return;
        setClubSummaries([...clubSummaries, { id: id, title: '항목', content: '내용' }]);
    };

    const handleDeleteItem = (id: string) => {
        setClubSummaries(clubSummaries?.filter((item) => item.id !== id));
    };
    const handleCancelEdit = () => {
        setClubSummaries(club?.clubSummaries || []);
        setIntroText(club?.detailDescription || '');
        setImage(club?.imageUrl || ssoc);
        setCroppedImage(club?.imageUrl || ssoc);
        setClubCategory(club?.category || '');
        setClubName(club?.name || '');
        setClubDetailImages(club?.clubDetailImages || []);
    };
    const updateClubData = () => {
        const updatedClubData: Club = {
            name: clubName, // 동아리 타이틀
            category: clubCategory, // 카테고리
            detailDescription: introText, // 동아리 소개
            clubSummaries: clubSummaries || [], // 동아리 요약
            imageUrl: croppedImage, // 동아리 대표 이미지
            clubDetailImages: clubDetailImages, // 동아리 상세 이미지
        };
        return updatedClubData;
    };
    const handleSaveEdited = async () => {
        const updatedClubData = updateClubData();
        if (JSON.stringify(club) !== JSON.stringify(updatedClubData)) {
            try {
                await updateClub({ id: clubId ?? '', club: updatedClubData });
                toast('동아리 정보가 업데이트 되었어요.', {
                    toastTheme: 'white',
                    type: 'success',
                });
            } catch (error) {
                toast('업데이트에 실패했습니다. 다시 시도해주세요.', {
                    toastTheme: 'white',
                    type: 'error',
                });
                console.error(error);
            }
        }
    };
    // effects
    useEffect(() => {
        setClubSummaries(club?.clubSummaries || []);
        setIntroText(club?.detailDescription || '');
        setImage(club?.imageUrl || ssoc);
        setCroppedImage(club?.imageUrl || ssoc);
        setClubCategory(club?.category || '');
        setClubName(club?.name || '');
        setClubDetailImages(club?.clubDetailImages || []);
    }, [club]);

    return (
        <div css={s_clubDetailPageContainer}>
            <div css={s_contentContainer}>
                <div css={s_clubHeader}>
                    <div css={s_clubImage}>{isEditMode ? editModeLogo : readModeLogo}</div>
                    <div css={s_clubHeaderTextContainer(isEditMode)}>
                        {isEditMode ? editModeClubNameAndCategory : readModeClubNameAndCategory}
                    </div>
                    <div css={s_editButtonContainer}>
                        {isEditMode ? (
                            <>
                                <Button
                                    variant="text"
                                    sx={s_buttonWrapper}
                                    onClick={() => {
                                        setIsEditMode(!isEditMode);
                                        handleSaveEdited();
                                    }}
                                    loading={isUpdateLoading}
                                >
                                    저장
                                </Button>
                                <Button
                                    variant="text"
                                    sx={s_buttonWrapper}
                                    onClick={() => {
                                        setIsEditMode(!isEditMode);
                                        handleCancelEdit();
                                    }}
                                >
                                    취소
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="text"
                                sx={s_buttonWrapper}
                                onClick={() => setIsEditMode(!isEditMode)}
                            >
                                수정
                            </Button>
                        )}
                    </div>
                </div>
                <Divider sx={{ marginBottom: '3rem', marginTop: '1rem' }} />
                <ClubBox
                    data={clubSummaries}
                    isEditMode={isEditMode}
                    onDataChange={handleDataChange}
                    onAddItem={handleAddItem}
                    onDeleteItem={handleDeleteItem}
                />
                {isEditMode ? editModeIntroduce : readModeIntroduce}
                {isEditMode ? editModeImageList : readModeImageList}
            </div>
        </div>
    );
}
export { ClubEditPage };
