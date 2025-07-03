export enum FileExtension {
    JPG = 'jpg',
    JPEG = 'jpeg',
    PNG = 'png',
    GIF = 'gif',
    WEBP = 'webp',
    PDF = 'pdf',
}

export const headerItems = [
    { label: '파일명', align: 'left' },
    { label: '최종 수정 일시', align: 'center' },
    { label: '크기', align: 'center' },
    { label: '파일 유형', align: 'center' },
] as const;
