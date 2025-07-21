import { getPresignedUrl } from './presignedUrl';

export async function uploadImageToS3(files: File[]): Promise<string[]> {
    const uploadResults = await Promise.all(
        files.map(async (file) => {
            const { url, method, headers } = await getPresignedUrl(file.name, file.type);
            const uploadRes = await fetch(url, {
                method,
                headers,
                body: file,
            });
            if (!uploadRes.ok) throw new Error('S3 업로드 실패');
            return url;
        }),
    );
    return uploadResults;
}
