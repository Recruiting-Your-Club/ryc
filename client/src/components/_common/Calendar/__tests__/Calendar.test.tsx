// src/components/Calendar/Calendar.test.tsx

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Calendar } from '../Calendar';
import dayjs from 'dayjs';
import 'dayjs/locale/ko'; // 한글 locale import

// dayjs에 한글 locale 설정
dayjs.locale('ko');

describe('Calendar Component', () => {
    // 테스트에 사용할 onSelect 모의 함수
    const onSelectMock = jest.fn();

    // 각 테스트 전에 모의 함수를 초기화
    beforeEach(() => {
        onSelectMock.mockClear();
    });

    it('현재 년도와 월을 포함하여 달력이 올바르게 렌더링되는지 확인합니다.', () => {
        // given
        render(<Calendar onSelect={onSelectMock} />);
        const currentMonthYear = dayjs().format('YYYY년 MM월');
        const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

        // then
        // 이전/다음 달 버튼이 있는지 확인 -> aria-label을 사용하여 버튼을 찾음
        expect(screen.getByText(currentMonthYear)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '이전 달' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '다음 달' })).toBeInTheDocument();
        weekdays.forEach((day) => {
            expect(screen.getByText(day)).toBeInTheDocument();
        });
    });

    it('다음 달 버튼을 클릭하면 YYYY년 MM월이 다음 월로 바껴야 합니다.', () => {
        // given
        render(<Calendar onSelect={onSelectMock} />);
        const nextButton = screen.getByRole('button', { name: '다음 달' });

        // when
        fireEvent.click(nextButton);

        // then
        const nextMonthYear = dayjs().add(1, 'month').format('YYYY년 MM월');
        expect(screen.getByText(nextMonthYear)).toBeInTheDocument();
    });

    it('이전 달 버튼을 클릭하면 헤더가 이전 달로 변경되어야 합니다.', () => {
        // given
        render(<Calendar onSelect={onSelectMock} />);
        const backButton = screen.getByRole('button', { name: '이전 달' });

        // when
        fireEvent.click(backButton);

        // then
        const prevMonthYear = dayjs().subtract(1, 'month').format('YYYY년 MM월');
        expect(screen.getByText(prevMonthYear)).toBeInTheDocument();
    });

    it("'single' 모드에서 날짜를 클릭하면 해당 날짜가 선택되고 onSelect 함수가 호출되어야 합니다.", () => {
        // given
        render(<Calendar mode="single" onSelect={onSelectMock} />);
        const selectedDate = screen.getByText('15');

        // when
        fireEvent.click(selectedDate);

        // then
        const expectedDate = dayjs().date(15).format('YYYY-MM-DD');
        // onSelect가 한 번 호출되었는지 확인
        expect(onSelectMock).toHaveBeenCalledTimes(1);
        // 인자로 전달한 날짜가 'YYYY-MM-15' 형식인지 확인 (정확한 날짜는 렌더링 시점에 따라 다름)
        expect(onSelectMock).toHaveBeenCalledWith([expectedDate]);
        expect(onSelectMock.mock.calls[0][0]).toEqual([expectedDate]);
    });

    it("'multiple or range' 모드에서 2개의 날짜를 선택하면 onSelect 함수가 두 날짜를 포함하는 배열을 반환합니다.", () => {
        // given
        let currentSelectedDates: string[] = [];
        const onSelectMock = jest.fn((updatedDates) => {
            // onSelect가 호출되면
            currentSelectedDates = updatedDates; // 변수 업데이트
            rerender(
                // Calendar 컴포넌트를 업데이트된 prop으로 리렌더링
                <Calendar mode="multiple" onSelect={onSelectMock} selectedDate={updatedDates} />,
            );
        });

        const { rerender } = render(
            <Calendar
                mode="multiple"
                onSelect={onSelectMock}
                selectedDate={currentSelectedDates}
            />,
        );
        const firstSelectedDay = screen.getByText('13');
        const secondSelectedDay = screen.getByText('14');

        // when
        fireEvent.click(firstSelectedDay);
        fireEvent.click(secondSelectedDay);

        // then
        const expectedFirstDate = dayjs().date(13).format('YYYY-MM-DD');
        const expectedSecondDate = dayjs().date(14).format('YYYY-MM-DD');

        expect(onSelectMock).toHaveBeenCalledTimes(2);
        expect(onSelectMock.mock.calls[0][0]).toEqual([expectedFirstDate]);
        expect(onSelectMock.mock.calls[1][0]).toEqual([expectedFirstDate, expectedSecondDate]);
    });

    it("'disabled' prop이 true일 때 모든 버튼이 비활성화되어야 합니다.", () => {
        render(<Calendar disabled={true} />);

        // 이전/다음 달 버튼 비활성화 확인
        expect(screen.getByRole('button', { name: '이전 달' })).toBeDisabled();
        expect(screen.getByRole('button', { name: '다음 달' })).toBeDisabled();

        // 모든 날짜 버튼이 비활성화되었는지 확인
        // `getAllByRole`을 사용하여 모든 날짜 셀을 가져옵니다.
        const dayCells = screen.getAllByRole('button', {
            // 날짜 버튼은 'YYYY-MM-DD' 형식의 aria-label을 가집니다.
            name: /^\d{4}-\d{2}-\d{2}$/,
        });

        dayCells.forEach((cell) => {
            expect(cell).toBeDisabled();
        });
    });

    it('onlySelected가 활성화 되어있다면 기존에 선택되어있는 날짜를 제외하곤 disabled 되어야 합니다.', () => {
        //given
        const selectedDate = dayjs().date(15).format('YYYY-MM-DD');
        const notSelectedDate = dayjs().date(21).format('YYYY-MM-DD');
        render(
            <Calendar
                mode="single"
                selectedDate={[selectedDate]}
                onSelect={onSelectMock}
                onlySelected={true}
            />,
        );
        const selectedButton = screen.getByRole('button', { name: selectedDate });
        const notSelectedButton = screen.getByRole('button', { name: notSelectedDate });

        //when
        fireEvent.click(selectedButton);
        fireEvent.click(notSelectedButton);

        //then
        expect(selectedButton).not.toBeDisabled();
        expect(notSelectedButton).toBeDisabled();
    });
});
