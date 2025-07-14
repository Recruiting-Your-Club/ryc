import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@constants/api';

const presignedUrlHandler = [
    http.post(`${BASE_URL}presigned-url`, async () => {
        return HttpResponse.json({
            url: 'https://fake-s3-url.com/fake-presigned-url',
            method: 'PUT',
            headers: { 'Content-Type': 'image/png' },
        });
    }),
    http.put('https://fake-s3-url.com/fake-presigned-url', () => {
        return new HttpResponse(null, { status: 200 });
    }),
];

export { presignedUrlHandler };
