import React, { useState, useRef } from 'react';
import {
    deleteImageButton,
    EdtiorTriggerButton,
    ImageEditorButton,
    ImageEditorDialogTriggerWrapper,
    ImageEditorInput,
    uploadImageButton,
} from './ImageRegister.style';
import BasicImage from '@assets/images/basicImage.png';
import { Image, Avatar, Text, Button } from '@components';
import { useClickOutside } from '@hooks/components/useClickOutside';
import type { ChangeEvent } from 'react';

function ImageEditor() {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    const [imageSrc, setImageSrc] = useState<string>(BasicImage);
    const [isOpenTrigger, setIsOpenTrigger] = useState<boolean>(false);
    const editorRef = useRef<HTMLDivElement>(null);
    // form hooks
    // query hooks
    // calculated values

    // handlers
    // FIXME 이거 위치 lib hooks오 옮기면 참조가 안되는데 어떡하죵
    useClickOutside([editorRef], () => {
        setIsOpenTrigger(false);
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
        setIsOpenTrigger(false);
    };

    const onKeyDownHandler = (e: KeyboardEvent) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            setIsOpenTrigger(!isOpenTrigger);
        }
    };
    // effects

    return (
        <>
            <div
                css={ImageEditorButton}
                onClick={() => setIsOpenTrigger(true)}
                onKeyDown={() => onKeyDownHandler}
                role="button"
                tabIndex={0}
                ref={editorRef}
            >
                <div css={EdtiorTriggerButton} />
                <img
                    src={imageSrc}
                    alt="profile"
                    width="100%"
                    height="100%"
                    css={{ borderRadius: '10px' }}
                />
                {isOpenTrigger && (
                    <div css={ImageEditorDialogTriggerWrapper}>
                        <label css={uploadImageButton}>
                            새 이미지 업로드
                            <input
                                type="file"
                                accept="image/*"
                                css={ImageEditorInput}
                                onChange={handleImageUpload}
                            />
                        </label>
                        <Button variant="transparent" sx={deleteImageButton}>
                            이미지 삭제
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}
export { ImageEditor };
