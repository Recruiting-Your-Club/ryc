type CategoryEng =
    | 'all'
    | 'PERFORMANCE_ARTS'
    | 'CULTURE'
    | 'SPORTS'
    | 'ACADEMIC'
    | 'VOLUNTEER'
    | 'RELIGION';
type CategoryName = '전체' | '공연' | '문화' | '체육' | '학술' | '봉사' | '종교';
export interface Category {
    id: number;
    name: CategoryName;
    eng: CategoryEng;
}

export interface Slider {
    position: number;
    width: string;
}
