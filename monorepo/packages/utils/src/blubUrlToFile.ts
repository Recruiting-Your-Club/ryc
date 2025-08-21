async function blobUrlToFile(blobUrl: string, fileName: string = 'image.jpg'): Promise<File> {
    try {
        // Blob URL에서 데이터 가져오기
        const response = await fetch(blobUrl);

        if (!response.ok) {
            throw new Error('Blob URL 접근 실패');
        }

        // Blob 객체 생성
        const blob = await response.blob();

        // File 객체로 변환
        const file = new File([blob], fileName, {
            type: blob.type || 'image/jpeg',
            lastModified: Date.now(),
        });

        return file;
    } catch (error) {
        console.error('Blob URL을 File로 변환 실패:', error);
        throw error;
    }
}
export { blobUrlToFile };
