
import React from 'react';
import { ImageRegister } from '@components';
import { useState } from 'react';

function TestPage() {
    //imageSrc에 편집된 이미지가 들어감
    const [image, setImage] = useState<string>();
    const [croppedImage, setCroppedImage] = useState<string>();
    return (
        <>
            <ImageRegister
                image={image}
                setImage={setImage}
                croppedImage={croppedImage}
                setCroppedImage={setCroppedImage}
            />
        </>
    );
}
export { TestPage };

//<Calendar selectedDate={[clicked, ...select]} setClickedDate={setClicked} />
