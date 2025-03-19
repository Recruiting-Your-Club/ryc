// rgba에서 rgb부분에 쓰이기 위한 변환 함수
// e.g. `rgba(${hexToRgba(#000000)}, 0.7)`
export const hexToRgb = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `${r}, ${g}, ${b}`;
};
