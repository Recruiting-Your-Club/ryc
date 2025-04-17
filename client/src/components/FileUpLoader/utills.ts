export const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

export const getExtension = (fileName: string): string => {
    return fileName.split('.').pop()?.toLowerCase() || '';
};
export const formatBytes = (bytes: number): string => {
    const kb = bytes / 1024;
    const mb = kb / 1024;
    return mb >= 1 ? `${mb.toFixed(2)}MB` : `${kb.toFixed(2)}KB`;
};
