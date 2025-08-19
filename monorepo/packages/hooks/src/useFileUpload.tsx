import { useMutation } from '@tanstack/react-query';

import { confirmUpload, type FileMetadata, postFileAndGetPresignedUrl } from '@ssoc/utils';

interface PresignedUrlResponse {
    fileMetadataId: string;
    presignedUrl: string;
}

export const useFileUpload = (baseUrl: string) => {
    // 파일 메타데이터를 보내서 presigned URL 받는 함수
    const getPresignedUrlMutation = useMutation({
        mutationFn: async (fileMetadata: FileMetadata): Promise<PresignedUrlResponse> => {
            return postFileAndGetPresignedUrl(baseUrl, fileMetadata);
        },
    });

    // presigned URL로 S3에 파일 업로드 함수
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

    // 업로드 완료 확인 함수
    const confirmUploadMutation = useMutation({
        mutationFn: async (fileMetadataId: string) => {
            return confirmUpload(baseUrl, fileMetadataId);
        },
    });

    // 단일 파일 업로드 프로세스
    const uploadSingleFile = async (file: File, location: string): Promise<string> => {
        try {
            let fileType = '';
            switch (location) {
                case 'FILE':
                    fileType = 'ANSWER_ATTACHMENT'; // 자소서 파일 첨부 문항
                    break;
                case 'PROFILE_IMAGE':
                    fileType = 'APPLICANT_PROFILE'; // 지원자 본인 사진 문항
                    break;
                case 'CLUB_CREATE': // 동아리 생성 페이지
                    fileType = 'CLUB_PROFILE'; // 동아리 로고
                    break;
                case 'CLUB_INTRODUCTION_IMAGE': // 동아리 소개 작성 페이지
                    fileType = 'CLUB_IMAGE'; // 동아리 소개 이미지
                    break;
                case 'CLUB_EDITOR': // 동아리 소개 작성 페이지의 에디터
                    fileType = 'CLUB_POST_IMAGE'; // 동아리 소개 에디터 이미지
                    break;
                case 'ANNOUNCEMENT_EDITOR': // 공고 작성 페이지의 에디터
                    fileType = 'ANNOUNCEMENT_POST_IMAGE'; // 공고 에디터 이미지
                    break;
                case 'ANNOUNCEMENT_CREATE_IMAGE': // 공고 작성 페이지의 이미지
                    fileType = 'ANNOUNCEMENT_IMAGE'; // 공고 이미지
                    break;
                case 'USER_PROFILE': // 동아리 사용자 페이지
                    fileType = 'USER_PROFILE_IMAGE'; // 동아리 사용자 페이지 사진
                    break;
                default:
                    throw new Error('Invalid type');
            }

            // 1. presigned URL 받기
            const fileMetadata: FileMetadata = {
                fileName: file.name,
                fileType: fileType,
                contentType: file.type,
            };

            const { fileMetadataId, presignedUrl } =
                await getPresignedUrlMutation.mutateAsync(fileMetadata);

            // 2. S3에 업로드
            await uploadToS3Mutation.mutateAsync({ file, presignedUrl });

            // 3. 업로드 완료 확인
            await confirmUploadMutation.mutateAsync(fileMetadataId);

            return fileMetadataId;
        } catch (error) {
            console.error('File upload failed:', error);
            throw error;
        }
    };

    const uploadFiles = async (files: File | File[], location: string): Promise<string[]> => {
        try {
            const fileArray = Array.isArray(files) ? files : [files];

            if (fileArray.length === 0) {
                return [];
            }

            const uploadPromises = fileArray.map(async (file) => {
                return await uploadSingleFile(file, location);
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
