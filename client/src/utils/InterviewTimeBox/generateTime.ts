export const generateTimeItems = (interval: number): string[] => {
    if (interval <= 0) return [];

    const result: string[] = [];
    const totalMinutes = 24 * 60;

    for (let i = 0; i <= totalMinutes; i += interval) {
        const hours = String(Math.floor(i / 60)).padStart(2, '0');
        const minutes = String(i % 60).padStart(2, '0');
        result.push(`${hours}:${minutes}`);
    }

    return result;
};

const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

const minutesToTime = (minutes: number) => {
    const h = String(Math.floor(minutes / 60)).padStart(2, '0');
    const m = String(minutes % 60).padStart(2, '0');
    return `${h}:${m}`;
};

export const generateTimeRange = (start: string, end: string, interval: number): string[] => {
    if (start === end) return [];

    const startMin = timeToMinutes(start);
    const endMin = timeToMinutes(end);
    const result: string[] = [];

    for (let i = startMin; i <= endMin; i += interval) {
        result.push(minutesToTime(i));
    }

    return result;
};
