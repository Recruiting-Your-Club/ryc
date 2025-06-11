import React, { useState, useRef } from 'react';
import {
    s_deleteImageWrapper,
    s_imageEdtiorTriggerIcon,
    s_imageContainer,
    s_imageEditorDialogTriggerContainer,
    ImageEditorInput,
    s_uploadImageWrapper,
} from './ImageRegister.style';
import BasicImage from '@assets/images/basicImage.png';
import { Button, ImageEditDialog } from '@components';
import { useClickOutside } from '@hooks/components/useClickOutside';
import type { ChangeEvent } from 'react';
import type { ImageRegisterProps } from './types';
import Upload from '@assets/images/upload.svg';

function ImageRegister({ imageSrc = BasicImage, setImageSrc, sx }: ImageRegisterProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openTrigger, setOpenTrigger] = useState<boolean>(false);
    const [croppedImage, setCroppedImage] = useState<string>(imageSrc);
    const editorRef = useRef<HTMLDivElement>(null);
    // form hooks
    // query hooks
    // calculated values

    // handlers
    // FIXME: 이거 위치 lib hooks로 옮기면 참조가 안되는데 어떡해야 할까요 handler가 맞나?
    useClickOutside([editorRef], () => {
        setOpenTrigger(false);
    });

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                setImageSrc(reader.result);
            }
        };
        setOpenTrigger(false);
        setOpenDialog(true);
    };

    const handleDeleteImage = (mouseEvent: React.MouseEvent<HTMLButtonElement>) => {
        mouseEvent.stopPropagation(); // 부모 요소의 onClick 이벤트 방지
        setOpenTrigger(false);
        setImageSrc(BasicImage);
    };

    // FIXME: 이거 나중에 위치 공통 utils로 옮겨야함
    const onKeyDownHandler = (e: KeyboardEvent) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            setOpenTrigger(false);
        }
    };
    // effects
    return (
        <>
            <div
                css={[s_imageContainer, sx]}
                onClick={() => setOpenTrigger(true)}
                onKeyDown={() => onKeyDownHandler}
                role="button"
                tabIndex={0}
                ref={editorRef}
            >
                <div css={s_imageEdtiorTriggerIcon}>
                    <Upload width="70%" height="70%" />
                </div>
                <img
                    src={croppedImage}
                    alt="profile"
                    width="100%"
                    height="100%"
                    css={{ borderRadius: '10px' }}
                />
                {openTrigger && (
                    <div css={s_imageEditorDialogTriggerContainer}>
                        <label css={s_uploadImageWrapper}>
                            새 이미지 업로드
                            <input
                                type="file"
                                accept="image/*"
                                css={ImageEditorInput}
                                onChange={handleImageUpload}
                            />
                        </label>
                        <Button
                            variant="transparent"
                            sx={s_deleteImageWrapper}
                            onClick={handleDeleteImage}
                        >
                            이미지 삭제
                        </Button>
                    </div>
                )}
            </div>
            <ImageEditDialog
                open={openDialog}
                handleClose={() => setOpenDialog(false)}
                imageSrc={imageSrc}
                setImageSrc={setCroppedImage}
            />
        </>
    );
}
export { ImageRegister };
