export const parseLocalDateTime = (local: string): Date => {
    const base = local.length >= 19 ? local.slice(0, 19) : local;
    const date = new Date(base);
    return date;
};
