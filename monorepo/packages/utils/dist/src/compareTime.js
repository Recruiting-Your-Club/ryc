const convertToDate = (inputDate) => {
    const formattedDate = inputDate.replace(/\./g, '-');
    return new Date(formattedDate);
};
const convertToStartDate = (inputDate) => {
    const startDate = convertToDate(inputDate);
    startDate.setHours(0, 0, 0, 0);
    return startDate;
};
const convertToEndDate = (inputDate) => {
    const endDate = convertToDate(inputDate);
    endDate.setHours(23, 59, 59, 999);
    return endDate;
};
export const getStatus = ({ startDate, endDate }) => {
    const current = new Date();
    const start = convertToStartDate(startDate);
    const end = convertToEndDate(endDate);
    if (current < start)
        return 'primary';
    else if (end < current)
        return 'end';
    else
        return 'progress';
};
//# sourceMappingURL=compareTime.js.map