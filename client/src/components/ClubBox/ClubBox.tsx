import React from 'react';
import { clubBoxContainer, clubBoxItem } from './ClubBox.style';
import { Text } from '@components';

function ClubBox() {
    const data = [
        '동아리 소개',
        '모집 공고',
        '동아리 일정',
        '동아리 회칙',
        '동아리 사진첩',
        '동아리 게시판',
        '최종 합격자 발표',
    ];
    const dataList = [
        '동아리 소개1',
        '모집 공고1',
        '동아리 일정1',
        '동아리 회칙1',
        '동아리 사진첩1',
        '동아리 게시판1',
        '최종 합격자 발표1',
    ];
    return (
        <div css={clubBoxContainer}>
            {data.map((item, index) => (
                <div key={item} css={clubBoxItem}>
                    <Text
                        as="div"
                        type="bodyRegular"
                        color="caption"
                        sx={{ width: '40%' }}
                        textAlign="start"
                        noWrap
                    >
                        {item}
                    </Text>
                    <Text as="div" type="bodyRegular" textAlign="start" noWrap>
                        {dataList[index]}
                    </Text>
                </div>
            ))}
        </div>
    );
}
export { ClubBox };
