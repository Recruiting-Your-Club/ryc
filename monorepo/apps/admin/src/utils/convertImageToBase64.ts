export const convertImageToBase64 = async (html: string): Promise<string> => {
    if (!html) return '';

    const parser = new DOMParser();
    const document = parser.parseFromString(html, 'text/html');
    const imgs = Array.from(document.querySelectorAll('img'));

    await Promise.all(
        imgs.map(async (img) => {
            const src = img.getAttribute('src');
            if (!src || src.startsWith('data:image')) return;

            try {
                const response = await fetch(src);
                const blob = await response.blob();

                const reader = new FileReader();
                await new Promise<void>((resolve, reject) => {
                    reader.onloadend = () => {
                        img.setAttribute('src', reader.result as string);
                        resolve();
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                });
            } catch (error) {
                // 변환 실패 -> 무시 (원본 이미지 사용)
                // eslint-disable-next-line no-empty
            }
        }),
    );

    return document.body.innerHTML;
};
