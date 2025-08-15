export interface FileMetadata {
    fileName: string;
    fileType: string;
    contentType: string;
}

export const postFileAndGetPresignedUrl = async (
    baseUrl: string,
    fileMetadata: FileMetadata,
    requireAuth: boolean = false,
) => {
    const response = await fetch(`${baseUrl}files/presigned-url`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(fileMetadata),
        credentials: requireAuth ? 'include' : 'omit',
    });

    if (!response.ok) {
        throw new Error('Failed to get presigned url');
    }

    return response.json();
};

export const confirmUpload = async (
    baseUrl: string,
    fileMetadataId: string,
    requireAuth: boolean = false,
) => {
    const response = await fetch(`${baseUrl}files/confirm-upload`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileMetadataId }),
        credentials: requireAuth ? 'include' : 'omit',
    });

    if (!response.ok) {
        throw new Error('Failed to confirm upload');
    }
};
