import { fileMutations } from '@api/hooks/fileMutations';

import { imageDataUrlToFile } from '@ssoc/utils';

/**
 * 이미지 업로드 관련 유틸리티 타입들
 */
export interface ImageUploadResult {
    original: string;
    updated: string;
}

export interface ImageUploadOptions {
    uploadFiles: (
        file: File,
        location: string,
    ) => Promise<Array<{ fileMetadataId: string; accessToken?: string }>>;
    getFileDownloadUrl: (params: { metadataId: string }) => Promise<{ url: string }>;
    accessToken: string | null;
    location?: string;
}

/**
 * fileMetadataId로 실제 이미지 다운로드 URL을 가져오는 함수
 */
export const getImageDownloadUrl = async (
    fileMetadataId: string,
    getFileDownloadUrl: (params: { metadataId: string }) => Promise<{ url: string }>,
): Promise<string> => {
    try {
        const response = await getFileDownloadUrl({
            metadataId: fileMetadataId,
        });

        return response.url;
    } catch (error) {
        return '';
    }
};

/**
 * base64 이미지를 File로 변환하고 업로드하는 함수
 */
export const uploadBase64Image = async (
    dataUrl: string,
    index: number,
    options: ImageUploadOptions,
): Promise<{ fileMetadataId: string; imageUrl: string } | null> => {
    const {
        uploadFiles,
        getFileDownloadUrl,
        accessToken,
        location = 'ANNOUNCEMENT_EDITOR',
    } = options;

    if (!accessToken) {
        return null;
    }

    try {
        // base64를 File로 변환
        const file = imageDataUrlToFile(dataUrl, `editor-image-${Date.now()}-${index}`);

        // 파일 업로드
        const uploadResults = await uploadFiles(file, location);
        const fileMetadataId = uploadResults[0]?.fileMetadataId;
        const accessToken = uploadResults[1]?.accessToken;

        if (!fileMetadataId) {
            return null;
        }

        // 실제 이미지 URL 받아오기
        const imageUrl = await getImageDownloadUrl(fileMetadataId, getFileDownloadUrl);

        if (!imageUrl) {
            return null;
        }

        return { fileMetadataId, imageUrl };
    } catch (error) {
        return null;
    }
};

/**
 * img 태그에 fileMetadataId 속성을 추가하는 함수
 */
export const addFileMetadataToImgTag = (imgTag: string, fileMetadataId: string): string => {
    if (imgTag.includes('file-metadata-id')) {
        return imgTag;
    }

    return imgTag.replace('<img', `<img file-metadata-id="${fileMetadataId}"`);
};

/**
 * img 태그의 src를 새로운 URL로 교체하는 함수
 */
export const replaceImgSrc = (imgTag: string, oldSrc: string, newSrc: string): string => {
    return imgTag.replace(oldSrc, newSrc);
};
