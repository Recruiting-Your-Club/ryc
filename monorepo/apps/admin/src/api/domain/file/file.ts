import { httpRequest } from '@api/common/httpRequest';

import type { FileDownloadUrlResponse } from './types';

async function postIdAndGetFileDownloadUrl(params: {
    metadataId: string;
    accessToken: string;
}): Promise<FileDownloadUrlResponse> {
    const response = await httpRequest.post({
        url: `files/get-url`,
        body: params,
        isAuthRequire: true,
    });
    return response as FileDownloadUrlResponse;
}

export { postIdAndGetFileDownloadUrl };
