import type { ImageUploadOptions } from './imageUploadUtils';
import { addFileMetadataToImgTag, replaceImgSrc, uploadBase64Image } from './imageUploadUtils';

/**
 * HTML 콘텐츠에서 base64 이미지를 찾는 정규식
 */
const BASE64_IMAGE_REGEX = /<img[^>]+src="(data:image\/[^"]+)"[^>]*>/g;

/**
 * HTML 콘텐츠에 base64 이미지가 있는지 확인하는 함수
 */
export const hasBase64Images = (htmlContent: string): boolean => {
    return htmlContent.includes('data:image/');
};

/**
 * HTML 콘텐츠에서 base64 이미지 태그들을 찾아서 반환하는 함수
 */
export const extractBase64Images = (
    htmlContent: string,
): Array<{ dataUrl: string; fullImgTag: string }> => {
    const matches = [...htmlContent.matchAll(BASE64_IMAGE_REGEX)];

    return matches.map((match) => ({
        dataUrl: match[1],
        fullImgTag: match[0],
    }));
};

/**
 * HTML 콘텐츠의 base64 이미지들을 업로드하고 실제 URL로 교체하는 함수
 */
export const processBase64ImagesInHtml = async (
    htmlContent: string,
    options: ImageUploadOptions,
    onUploadStart?: () => void,
    onUploadComplete?: () => void,
): Promise<string> => {
    if (!htmlContent || !hasBase64Images(htmlContent)) {
        return htmlContent;
    }

    onUploadStart?.();

    try {
        const imageMatches = extractBase64Images(htmlContent);

        if (imageMatches.length === 0) {
            return htmlContent;
        }

        let updatedContent = htmlContent;

        // 모든 base64 이미지를 병렬로 업로드
        const uploadPromises = imageMatches.map(async ({ dataUrl, fullImgTag }, index) => {
            const uploadResult = await uploadBase64Image(dataUrl, index, options);

            if (uploadResult) {
                const { fileMetadataId, imageUrl } = uploadResult;

                // img src를 실제 이미지 URL로 교체
                let updatedImgTag = replaceImgSrc(fullImgTag, dataUrl, imageUrl);

                // fileMetadataId 속성 추가
                updatedImgTag = addFileMetadataToImgTag(updatedImgTag, fileMetadataId);

                return { original: fullImgTag, updated: updatedImgTag };
            }

            return null;
        });

        const results = await Promise.all(uploadPromises);

        // 모든 img 태그를 업데이트된 URL로 교체
        results.forEach((result) => {
            if (result) {
                updatedContent = updatedContent.replace(result.original, result.updated);
            }
        });

        return updatedContent;
    } catch (error) {
        return htmlContent; // 실패 시 원본 콘텐츠 반환
    } finally {
        onUploadComplete?.();
    }
};

/**
 * HTML 콘텐츠에서 모든 이미지의 fileMetadataId를 추출하는 함수
 */
export const extractFileMetadataIds = (htmlContent: string): string[] => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const images = doc.querySelectorAll('img[data-file-metadata-id]');

    return Array.from(images)
        .map((img) => img.getAttribute('data-file-metadata-id'))
        .filter((id): id is string => id !== null);
};

/**
 * 특정 fileMetadataId를 가진 이미지를 HTML에서 제거하는 함수
 */
export const removeImageByMetadataId = (
    htmlContent: string,
    metadataIdToDelete: string,
): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const imageToDelete = doc.querySelector(`img[data-file-metadata-id="${metadataIdToDelete}"]`);

    if (imageToDelete) {
        imageToDelete.remove();
        return doc.body.innerHTML;
    }

    return htmlContent;
};

/**
 * HTML 콘텐츠의 모든 이미지 정보를 가져오는 함수
 */
export const getImageInfo = (htmlContent: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const images = doc.querySelectorAll('img[data-file-metadata-id]');

    return Array.from(images).map((img) => ({
        fileMetadataId: img.getAttribute('data-file-metadata-id'),
        src: img.getAttribute('src'),
        alt: img.getAttribute('alt') || '',
    }));
};
