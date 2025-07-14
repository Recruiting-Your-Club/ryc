import { BASE_URL } from '@constants/api';

export async function getPresignedUrl(filename: string, type: string) {
    const res = await fetch(`${BASE_URL}presigned-url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename, type }),
    });
    if (!res.ok) throw new Error('Failed to get presigned url');
    return res.json();
}
