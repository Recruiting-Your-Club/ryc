export const imageUrlToFile = (dataUrl: string, fileName: string): File => {
    const [header, base64] = dataUrl.split(',');
    const match = header.match(/data:(.*);base64/);
    const mime = match ? match[1] : 'image/png';
    const bin = atob(base64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new File([bytes], `${fileName}.${mime.split('/')[1]}`, { type: mime });
};
