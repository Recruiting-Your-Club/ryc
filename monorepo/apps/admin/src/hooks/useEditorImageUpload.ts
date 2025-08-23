import { fileMutations } from '@api/hooks/fileMutations';
import { BASE_URL } from '@constants/api';
import { useAuthStore } from '@stores/authStore';
import { useCallback, useState } from 'react';

import { useFileUpload } from '@ssoc/hooks';

import { hasBase64Images, processBase64ImagesInHtml } from '../utils/htmlImageProcessor';
import type { ImageUploadOptions } from '../utils/imageUploadUtils';

export interface UseEditorImageUploadOptions {
    location?: string;
}

export interface UseEditorImageUploadReturn {
    isUploading: boolean;
    processContent: (content: string) => Promise<string>;
    handleContentChange: (content: string, setContent: (content: string) => void) => Promise<void>;
}

/**
 * Editor에서 이미지 업로드를 처리하는 커스텀 훅
 */
export const useEditorImageUpload = (
    options: UseEditorImageUploadOptions = {},
): UseEditorImageUploadReturn => {
    const { location = 'ANNOUNCEMENT_EDITOR' } = options;

    const [isUploading, setIsUploading] = useState(false);
    const { uploadFiles } = useFileUpload(BASE_URL);
    const { accessToken } = useAuthStore();
    const { mutateAsync: getFileDownloadUrl } = fileMutations.usePostIdAndGetFileDownloadUrl();

    /**
     * HTML 콘텐츠의 base64 이미지들을 처리하는 함수
     */
    const processContent = useCallback(
        async (content: string): Promise<string> => {
            if (!content || !hasBase64Images(content)) {
                return content;
            }

            const uploadOptions: ImageUploadOptions = {
                uploadFiles,
                getFileDownloadUrl,
                accessToken,
                location,
            };

            return await processBase64ImagesInHtml(
                content,
                uploadOptions,
                () => setIsUploading(true),
                () => setIsUploading(false),
            );
        },
        [uploadFiles, getFileDownloadUrl, accessToken, location],
    );

    /**
     * Editor content 변경 시 자동으로 이미지 처리를 하는 함수
     */
    const handleContentChange = useCallback(
        async (newContent: string, setContent: (content: string) => void): Promise<void> => {
            setContent(newContent);

            // base64 이미지가 있는지 확인
            if (hasBase64Images(newContent)) {
                const processedContent = await processContent(newContent);
                if (processedContent !== newContent) {
                    setContent(processedContent);
                }
            }
        },
        [processContent],
    );

    return {
        isUploading,
        processContent,
        handleContentChange,
    };
};
