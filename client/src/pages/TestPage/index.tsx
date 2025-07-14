import React from 'react';
import { Button } from '@components/_common';
import { useState } from 'react';
import { uploadImageToS3 } from '@utils/FileUpLoadWithS3/uploadImageToS3';
import { FileUpLoader } from '@components/FileUpLoader';

function TestPage() {
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [files, setFiles] = useState<File[]>([]);

    const handleChange = async () => {
        if (files.length === 0) return;
        try {
            const urls = await uploadImageToS3(files);
            setImageUrls(urls);
            console.log(urls);
            alert('업로드 성공!');
        } catch (err) {
            alert('업로드 실패: ' + (err as Error).message);
        }
    };

    return (
        <div>
            <FileUpLoader files={files} onFilesChange={setFiles}>
                <FileUpLoader.Button />
                <FileUpLoader.HelperText>
                    pdf, 이미지 파일만 업로드 가능합니다.
                </FileUpLoader.HelperText>
                <FileUpLoader.Box />
            </FileUpLoader>
            <Button onClick={handleChange}>업로드</Button>
            {imageUrls.length > 0 && (
                <div>
                    {imageUrls.map((url, idx) => (
                        <img
                            key={idx}
                            src={url}
                            alt={`업로드된 이미지 : ${url}`}
                            style={{ maxWidth: 200, margin: 8 }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
export { TestPage };
