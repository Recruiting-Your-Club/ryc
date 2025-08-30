/**
 * File 객체를 sessionStorage에 저장하기 위한 직렬화/역직렬화 유틸리티
 */

export interface SerializedFile {
    name: string;
    type: string;
    size: number;
    lastModified: number;
    data: string; // Base64 encoded data
}

/**
 * File 객체를 직렬화 가능한 형태로 변환
 */
export const serializeFile = (file: File): Promise<SerializedFile> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const result = reader.result as string;
            resolve({
                name: file.name,
                type: file.type,
                size: file.size,
                lastModified: file.lastModified,
                data: result, // data:image/png;base64,... 형태
            });
        };

        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
};

/**
 * 직렬화된 데이터를 File 객체로 복원
 */
export const deserializeFile = (serialized: SerializedFile): File => {
    // Base64 데이터를 Blob으로 변환
    const [header, base64] = serialized.data.split(',');
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: serialized.type });

    // File 객체 생성
    return new File([blob], serialized.name, {
        type: serialized.type,
        lastModified: serialized.lastModified,
    });
};

/**
 * File 배열을 직렬화
 */
export const serializeFiles = async (files: File[]): Promise<SerializedFile[]> => {
    const promises = files.map((file) => serializeFile(file));
    return Promise.all(promises);
};

/**
 * 직렬화된 파일 배열을 File 배열로 복원
 */
export const deserializeFiles = (serializedFiles: SerializedFile[]): File[] => {
    return serializedFiles.map((serialized) => deserializeFile(serialized));
};
