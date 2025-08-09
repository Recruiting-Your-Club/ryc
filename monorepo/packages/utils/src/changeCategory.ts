const getCategory = (category: string) => {
    switch (category) {
        case 'PERFORMANCE_ARTS':
            return '공연동아리';
        case 'CULTURE':
            return '문화동아리';
        case 'SPORTS':
            return '체육동아리';
        case 'ACADEMIC':
            return '학술동아리';
        case 'VOLUNTEER':
            return '봉사동아리';
        case 'RELIGION':
            return '종교동아리';
        default:
            return '미정';
    }
};
export { getCategory };
