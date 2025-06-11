import React, { useState } from 'react';
import { Dialog, Text, Button } from '@components';
import type { ImageEditDialogProps } from './types';
import Cropper from 'react-easy-crop';
import type { Point, Area } from 'react-easy-crop';
import { s_contentContainer } from './ImageEdit.style';
import { getCroppedImg } from './utils';
import theme from '@styles/theme';

function ImageEditDialog({ open, handleClose, imageSrc, setImageSrc }: ImageEditDialogProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

    const onCropChange = (crop: Point) => {
        setCrop(crop);
    };
    const onZoomChange = (zoom: number) => {
        setZoom(zoom);
    };
    const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const handleSaveEditImage = async () => {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, 0);
        setImageSrc(croppedImage as string);
        handleClose();
    };

    return (
        <>
            <Dialog open={open} handleClose={handleClose} size="md">
                <Dialog.Header position="start" sx={{ zIndex: 100 }}>
                    <Text type="h4Bold" textAlign="start">
                        사진 업로드하기
                    </Text>
                </Dialog.Header>
                <Dialog.Content>
                    <div css={s_contentContainer}>
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            cropShape="rect"
                            aspect={1}
                            showGrid={false}
                            onCropChange={onCropChange}
                            onCropComplete={onCropComplete}
                            onZoomChange={onZoomChange}
                            style={{
                                containerStyle: {
                                    borderRadius: '20px',
                                },
                                cropAreaStyle: {
                                    borderRadius: '20px',
                                    boxShadow: '0 0 0 9999em white',
                                    border: `1px solid ${theme.colors.gray[200]}`,
                                    maxHeight: '20rem',
                                    maxWidth: '20rem',
                                },
                            }}
                        />
                    </div>
                </Dialog.Content>
                <Dialog.Action position="end">
                    <Button variant="outlined" onClick={handleClose}>
                        취소
                    </Button>
                    <Button variant="primary" onClick={handleSaveEditImage}>
                        확인
                    </Button>
                </Dialog.Action>
            </Dialog>
        </>
    );
}
export { ImageEditDialog };
