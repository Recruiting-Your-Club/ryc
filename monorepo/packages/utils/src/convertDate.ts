export const convertDate = (date: string) => {
    const [, month, day] = date.split('-');
    return `${month}.${day}`;
};
