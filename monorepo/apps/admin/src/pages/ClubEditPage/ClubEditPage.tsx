import ssoc from '@assets/images/ssoc.png';
import React, { useState } from 'react';

import { Button, Divider } from '@ssoc/ui';
import { Editor, Image, ImageDialog, Input, Select, Text } from '@ssoc/ui';

import { ClubBox, FileUpLoader, ImageRegister } from '../../components';
import type { ClubBoxItem } from '../../components/ClubBox/types';
import club from '../../mocks/data/club/clubDetail.json';
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
    const [clubData, setClubData] = useState<ClubBoxItem[]>([
        { id: '7571e92b-f38b-4878-959c-f76ab9290ed8', title: '동아리 이름', value: 'R&D' },
        { id: '7571e92b-f38b-4878-959c-f76ab9290ed4', title: '회장', value: '홍길동' },
        { id: '7571e92b-f38b-4878-959c-f76ab9290ed2', title: '연락처', value: '010-1234-5678' },
        {
            id: '7571e92b-f38b-4878-959c-f76ab9290ed1',
            title: '이메일',
            value: 'gildong.hong@example.com',
        },
    ]);

    const handleDataChange = (updatedData: ClubBoxItem[]) => {
        setClubData(updatedData);
    };

    const handleAddItem = () => {
        const id = crypto.randomUUID();
        setClubData([...clubData, { id: id, title: '항목', value: '내용' }]);
    };

    const handleDeleteItem = (id: string) => {
        setClubData(clubData.filter((item) => item.id !== id));
    };

    // lib hooks
    // initial values
    // state, ref, querystring hooks
    const [isEditMode, setIsEditMode] = useState(false);
    const [image, setImage] = useState<string>(ssoc);
    const [croppedImage, setCroppedImage] = useState<string>();
    const [text, setText] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>();
    const [open, setOpen] = useState(false);

    // form hooks
    // query hooks
    // calculated values
    const editModeIntroduce = (
        <Editor.Root sx={{ marginTop: '5rem' }}>
            <Editor.Toolbar />
            <Editor.Textarea value={text} onChange={setText} sx={{ height: '100rem' }} />
        </Editor.Root>
    );
    const readModeIntroduce = (
        <div css={s_introduceContainer}>
            <Text textAlign="start">동아리 설명입니다~~~~</Text>
        </div>
    );
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
    const editModeClubNameAndCategory = (
        <>
            <Input placeholder="동아리 이름" inputSx={{ height: '3rem' }} />
            <Select value="하이" onValueChange={() => {}} size="s">
                <Select.Trigger sx={{ height: '2.8rem', width: '10rem' }}>
                    <Select.Value />
                </Select.Trigger>
                <Select.Content>
                    <Select.Item value="1">공연동아리</Select.Item>
                    <Select.Item value="2">문화동아리</Select.Item>
                    <Select.Item value="3">체육동아리</Select.Item>
                    <Select.Item value="4">학술동아리</Select.Item>
                    <Select.Item value="5">봉사동아리</Select.Item>
                    <Select.Item value="6">종교동아리</Select.Item>
                </Select.Content>
            </Select>
        </>
    );
    const readModeClubNameAndCategory = (
        <>
            <Text as="h4" type="h1Semibold" textAlign="start" noWrap>
                인터페이스
            </Text>
            <Text
                as="div"
                type="captionSemibold"
                color="helper"
                textAlign="start"
                noWrap
                sx={{ marginLeft: '0.4rem' }}
            >
                {/* {getCategory(category)} */}
                학술동아리
            </Text>
        </>
    );
    const editModeImageList = (
        <FileUpLoader sx={{ marginTop: '5rem' }}>
            <FileUpLoader.Button text="이미지 추가" />
            <FileUpLoader.Box text="동아리 이미지 업로드" />
        </FileUpLoader>
    );
    const readModeImageList = (
        <>
            <div css={s_imageListContainer}>
                {club?.clubDetailImages?.map((images) => (
                    <button
                        css={s_imageItem}
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
        </>
    );
    // handlers
    const handleImageClick = (url: string) => {
        setImageUrl(url);
    };
    // effects

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
                                    onClick={() => setIsEditMode(!isEditMode)}
                                >
                                    저장
                                </Button>
                                <Button
                                    variant="text"
                                    sx={s_buttonWrapper}
                                    onClick={() => setIsEditMode(!isEditMode)}
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
                    data={clubData}
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
