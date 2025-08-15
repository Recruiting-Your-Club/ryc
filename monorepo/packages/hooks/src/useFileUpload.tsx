import { useMutation } from '@tanstack/react-query';

import { confirmUpload, type FileMetadata, postFileAndGetPresignedUrl } from '@ssoc/utils';

interface PresignedUrlResponse {
    fileMetadataId: string;
    presignedUrl: string;
}

interface UseFileUploadProps {
    baseUrl: string;
    requireAuth?: boolean;
}

export const useFileUpload = ({ baseUrl, requireAuth = false }: UseFileUploadProps) => {
    // 1단계: 파일 메타데이터를 보내서 presigned URL 받기
    const getPresignedUrlMutation = useMutation({
        mutationFn: async (fileMetadata: FileMetadata): Promise<PresignedUrlResponse> => {
            return postFileAndGetPresignedUrl(baseUrl, fileMetadata, requireAuth);
        },
    });

    // 2단계: presigned URL로 S3에 파일 업로드
    const uploadToS3Mutation = useMutation({
        mutationFn: async ({ file, presignedUrl }: { file: File; presignedUrl: string }) => {
            const response = await fetch(presignedUrl, {
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': file.type,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to upload file to S3');
            }

            return response;
        },
    });

    // 3단계: 업로드 완료 확인
    const confirmUploadMutation = useMutation({
        mutationFn: async (fileMetadataId: string) => {
            return confirmUpload(baseUrl, fileMetadataId, requireAuth);
        },
    });

    // 단일 파일 업로드 프로세스 (내부 사용)
    const uploadSingleFile = async (file: File): Promise<string> => {
        try {
            // 1단계: presigned URL 받기
            const fileMetadata: FileMetadata = {
                fileName: file.name,
                fileType: file.type,
                contentType: file.type,
            };

            const { fileMetadataId, presignedUrl } =
                await getPresignedUrlMutation.mutateAsync(fileMetadata);

            // 2단계: S3에 업로드
            await uploadToS3Mutation.mutateAsync({ file, presignedUrl });

            // 3단계: 업로드 완료 확인
            await confirmUploadMutation.mutateAsync(fileMetadataId);

            return fileMetadataId;
        } catch (error) {
            console.error('File upload failed:', error);
            throw error;
        }
    };

    // 파일 업로드 프로세스 (단일/여러 파일 모두 지원)
    const uploadFiles = async (files: File | File[]): Promise<string[]> => {
        try {
            // File 또는 File[] 처리
            const fileArray = Array.isArray(files) ? files : [files];

            if (fileArray.length === 0) {
                return [];
            }

            const uploadPromises = fileArray.map(async (file) => {
                return await uploadSingleFile(file);
            });

            // 모든 파일을 병렬로 업로드
            const fileMetadataIds = await Promise.all(uploadPromises);
            return fileMetadataIds;
        } catch (error) {
            console.error('Files upload failed:', error);
            throw error;
        }
    };

    return {
        uploadFiles,
        isLoading:
            getPresignedUrlMutation.isPending ||
            uploadToS3Mutation.isPending ||
            confirmUploadMutation.isPending,
        error:
            getPresignedUrlMutation.error ||
            uploadToS3Mutation.error ||
            confirmUploadMutation.error,
    };
};
