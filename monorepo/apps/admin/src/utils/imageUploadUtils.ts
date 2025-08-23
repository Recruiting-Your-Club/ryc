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
    ) => Promise<Array<{ fileMetadataId: string; presignedUrl: string }>>;
    getFileDownloadUrl: (params: {
        metadataId: string;
        accessToken: string;
    }) => Promise<{ url: string }>;
    accessToken: string | null;
    location?: string;
}

/**
 * fileMetadataId로 실제 이미지 다운로드 URL을 가져오는 함수
 */
export const getImageDownloadUrl = async (
    fileMetadataId: string,
    accessToken: string,
    getFileDownloadUrl: (params: {
        metadataId: string;
        accessToken: string;
    }) => Promise<{ url: string }>,
): Promise<string> => {
    try {
        if (!accessToken) {
            console.error('액세스 토큰이 없습니다');
            return '';
        }

        const response = await getFileDownloadUrl({
            metadataId: fileMetadataId,
            accessToken: accessToken,
        });

        return response.url;
    } catch (error) {
        console.error('파일 URL 조회 실패:', error);
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
        console.error('액세스 토큰이 필요합니다');
        return null;
    }

    try {
        // base64를 File로 변환
        const file = imageDataUrlToFile(dataUrl, `editor-image-${Date.now()}-${index}`);

        // 파일 업로드
        const uploadResults = await uploadFiles(file, location);
        const fileMetadataId = uploadResults[0]?.fileMetadataId;

        if (!fileMetadataId) {
            console.error('파일 업로드 실패: fileMetadataId가 없습니다');
            return null;
        }

        // 실제 이미지 URL 받아오기
        const imageUrl = await getImageDownloadUrl(fileMetadataId, accessToken, getFileDownloadUrl);

        if (!imageUrl) {
            console.error('이미지 URL 조회 실패');
            return null;
        }

        return { fileMetadataId, imageUrl };
    } catch (error) {
        console.error('이미지 업로드 중 오류:', error);
        return null;
    }
};

/**
 * img 태그에 fileMetadataId 속성을 추가하는 함수
 */
export const addFileMetadataToImgTag = (imgTag: string, fileMetadataId: string): string => {
    if (imgTag.includes('data-file-metadata-id')) {
        return imgTag;
    }

    return imgTag.replace('<img', `<img data-file-metadata-id="${fileMetadataId}"`);
};

/**
 * img 태그의 src를 새로운 URL로 교체하는 함수
 */
export const replaceImgSrc = (imgTag: string, oldSrc: string, newSrc: string): string => {
    return imgTag.replace(oldSrc, newSrc);
};
