import React, { useState } from 'react';
import banner from '@assets/images/banner.png';
import {
    bannerContainer,
    clubCategoryContainer,
    clubListContainer,
    totalClubContainer,
    mainPageContainer,
    categoryButton,
    progressContainer,
    svgContainer,
} from './MainPage.style';
import { MainCard, Text, Button } from '@components';
import type { Category } from './types';
import Check from '@assets/images/check.svg';

function MainPage() {
    // prop destruction
    // lib hooks
    // initial values
    const clubCategory: Category[] = [
        { id: 1, name: '전체' },
        { id: 2, name: '공연' },
        { id: 3, name: '문화' },
        { id: 4, name: '체육' },
        { id: 5, name: '학술' },
        { id: 6, name: '봉사' },
        { id: 7, name: '종교' },
    ];
    const clubData = [
        {
            title: 'En#',
            category: '학술동아리',
            description: 'IT 동아리 EN# 신규 멤버 모집이야쥐기네~~~~~~',
            status: 'progress',
            hashTag: ['프로그래밍', '코딩', '자바스크립트'],
        },
        {
            title: '세종피어',
            category: '봉사동아리',
            description: '세종피어 홍영환은 게이다~~',
            status: 'end',
            hashTag: ['봉사', '세종', '피어'],
        },
        {
            title: '인터페이스',
            category: '학술동아리',
            description: 'IT 동아리 인터페이스 신규 멤버 모집해용',
            status: 'primary',
            hashTag: ['프로그래밍', '코딩', '자바스크립트'],
        },
        {
            title: '인터페이스',
            category: '학술동아리',
            description: 'IT 동아리 인터페이스 신규 멤버 모집해용',
            status: 'primary',
            hashTag: ['프로그래밍', '코딩', '자바스크립트'],
        },
        {
            title: '인터페이스',
            category: '학술동아리',
            description: 'IT 동아리 인터페이스 신규 멤버 모집해용',
            status: 'primary',
            hashTag: ['프로그래밍', '코딩', '자바스크립트'],
        },
        {
            title: '세종피어',
            category: '봉사동아리',
            description: '세종피어 홍영환은 게이다~~',
            status: 'end',
            hashTag: ['봉사', '세종', '피어'],
        },
        {
            title: '세종피어',
            category: '봉사동아리',
            description: '세종피어 홍영환은 게이다~~',
            status: 'end',
            hashTag: ['봉사', '세종', '피어'],
        },
        {
            title: 'En#',
            category: '학술동아리',
            description: 'IT 동아리 EN# 신규 멤버 모집이야쥐기네~~~~~~',
            status: 'progress',
            hashTag: ['프로그래밍', '코딩', '자바스크립트'],
        },
        {
            title: 'En#',
            category: '학술동아리',
            description: 'IT 동아리 EN# 신규 멤버 모집이야쥐기네~~~~~~',
            status: 'progress',
            hashTag: ['프로그래밍', '코딩', '자바스크립트'],
        },
        {
            title: 'En#',
            category: '학술동아리',
            description: 'IT 동아리 EN# 신규 멤버 모집이야쥐기네~~~~~~',
            status: 'progress',
            hashTag: ['프로그래밍', '코딩', '자바스크립트'],
        },
        {
            title: 'En#',
            category: '학술동아리',
            description: 'IT 동아리 EN# 신규 멤버 모집이야쥐기네~~~~~~',
            status: 'progress',
            hashTag: ['프로그래밍', '코딩', '자바스크립트'],
        },
        {
            title: 'En#',
            category: '학술동아리',
            description: 'IT 동아리 EN# 신규 멤버 모집이야쥐기네~~~~~~',
            status: 'progress',
            hashTag: ['프로그래밍', '코딩', '자바스크립트'],
        },
        {
            title: 'En#',
            category: '학술동아리',
            description: 'IT 동아리 EN# 신규 멤버 모집이야쥐기네~~~~~~',
            status: 'progress',
            hashTag: ['프로그래밍', '코딩', '자바스크립트'],
        },
        {
            title: 'En#',
            category: '학술동아리',
            description: 'IT 동아리 EN# 신규 멤버 모집이야쥐기네~~~~~~',
            status: 'progress',
            hashTag: ['프로그래밍', '코딩', '자바스크립트'],
        },
        {
            title: 'En#',
            category: '학술동아리',
            description: 'IT 동아리 EN# 신규 멤버 모집이야쥐기네~~~~~~',
            status: 'progress',
            hashTag: ['프로그래밍', '코딩', '자바스크립트'],
        },
        {
            title: 'En#',
            category: '학술동아리',
            description: 'IT 동아리 EN# 신규 멤버 모집이야쥐기네~~~~~~',
            status: 'progress',
            hashTag: ['프로그래밍', '코딩', '자바스크립트'],
        },
        {
            title: 'En#',
            category: '학술동아리',
            description: 'IT 동아리 EN# 신규 멤버 모집이야쥐기네~~~~~~',
            status: 'progress',
            hashTag: ['프로그래밍', '코딩', '자바스크립트'],
        },
        {
            title: 'En#',
            category: '학술동아리',
            description: 'IT 동아리 EN# 신규 멤버 모집이야쥐기네~~~~~~',
            status: 'progress',
            hashTag: ['프로그래밍', '코딩', '자바스크립트'],
        },
    ];
    // state, ref, querystring hooks
    const [category, setCategory] = useState<number[]>([1]);
    const [isProgress, setIsProgress] = useState<boolean>(false);
    // form hooks
    // query hooks
    // calculated values
    // handlers
    const handleCategory = (categoryId: number) => {
        setCategory((prev) => {
            const isAllCategory = categoryId === 1;
            const isSelected = prev.includes(categoryId);
            const hasAllCategory = prev.includes(1);
            // 전체
            if (isAllCategory) {
                return [1];
            }
            // 이미 선택된 카테고리 클릭 시 해제
            if (isSelected) {
                if (prev.length === 1) return [1];
                return prev.filter((id) => id !== categoryId);
            }
            // 전체 선택되어있는 상태에서 다른 카테고리 선택
            if (hasAllCategory) {
                return [...prev.filter((id) => id !== 1), categoryId];
            }
            // 다른 카테고리 선택
            return [...prev, categoryId];
        });
    };
    // effects

    return (
        <div css={mainPageContainer}>
            <div css={bannerContainer}>
                <img src={banner} alt="배너 이미지" width="100%" height="100%" />
            </div>
            <div css={totalClubContainer}>
                <Text type="h4Bold" color="black">
                    총 26개의 동아리
                </Text>
            </div>

            <div css={clubCategoryContainer}>
                {clubCategory.map((data) => (
                    <Button
                        variant="text"
                        size="s"
                        key={data.name}
                        sx={categoryButton(category.includes(data.id))}
                        onClick={() => handleCategory(data.id)}
                    >
                        {data.name}
                    </Button>
                ))}
                <Button
                    variant="text"
                    size="md"
                    sx={progressContainer(isProgress)}
                    onClick={() => setIsProgress((progress) => !progress)}
                >
                    <Check css={svgContainer} />
                    모집중인 동아리만 보기
                </Button>
            </div>

            <div css={clubListContainer}>
                {clubData.map((data, index) => (
                    <MainCard
                        key={index} // FIXME: index 수정해야함
                        title={data.title}
                        category={data.category}
                        description={data.description}
                        status={data.status}
                        hashTag={data.hashTag}
                    />
                ))}
            </div>
        </div>
    );
}
export { MainPage };
