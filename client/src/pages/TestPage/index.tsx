import React from 'react';
import { ImageRegister } from '@components';
import { useState } from 'react';

function TestPage() {
    //imageSrc에 편집된 이미지가 들어감
    const [imageSrc, setImageSrc] = useState<string>();
    return (
        <>
            <ImageRegister imageSrc={imageSrc} setImageSrc={setImageSrc} />
        </>
    );
}
export { TestPage };
