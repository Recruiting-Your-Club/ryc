interface ClubDetailImages {
    id: string;
    url: string;
    originalFileName: string;
    contentType: string;
}
const imageUrlToFile = async (images?: ClubDetailImages[]): Promise<File[] | null> => {
    if (!images || images.length === 0) return null;
    const files = images.map(async (image) => {
        try {
            const response = await fetch(image.url);
            if (!response.ok) {
                throw new Error('네트워크 응답이 올바르지 않습니다.');
            }
            const blob = await response.blob();

            return new File([blob], image.originalFileName, { type: image.contentType });
        } catch (error) {
            console.error('이미지를 파일로 변환하는 중 오류가 발생했습니다:', error);
            return null;
        }
    });
    const resolvedFiles = await Promise.all(files);
    const validFiles = resolvedFiles.filter((file): file is File => file !== null);
    return validFiles;
};

export { imageUrlToFile };
