import React, { useState } from 'react';
import { Button } from '@components/_common/Button';
import { Text } from '@components/_common/Text';
import { ClubCard } from '@components';
import { Input } from '@components/_common/Input';
import { TextArea } from '@components/_common/TextArea/TextArea';
function TestPage() {
    const [text, setText] = useState('');
    return (
        <>
            <div>
                <Button variant="outlined">hd</Button>
                <Button variant="text">hd</Button>
                <Button variant="transparent">hd</Button>
                <Button variant="primary">hd</Button>
                <Text type="h1Bold">
                    <Text.HighLight>하이</Text.HighLight>
                    하이요
                </Text>
                <Input />
                <TextArea size="sm" label="간단한 메모" />
                <TextArea size="md" label="중간 크기" />
                <TextArea size="lg" label="긴 내용 입력용" />
                <TextArea
                    size="md"
                    label="제목"
                    error={true}
                    charCount
                    maxLength={300}
                    errorText="gggg"
                />
                <div style={{ display: 'flex', gap: '1rem', marginTop: '10rem' }}>
                    <ClubCard
                        imageURL="https://avatars.githubusercontent.com/u/176916276?s=400&u=48a14c04c14ce04adfebdf9290c6e36492b0994d&v=4"
                        path="/"
                        status="primary"
                        tag={['학술동아리', '코딩', '프로그래밍']}
                        title="Recruting Your Club"
                        type="학술동아리"
                    />
                    <ClubCard
                        imageURL="https://avatars.githubusercontent.com/u/176916276?s=400&u=48a14c04c14ce04adfebdf9290c6e36492b0994d&v=4"
                        path="/"
                        status="primary"
                        tag={['학술동아리', '코딩', '프로그래밍']}
                        title="Recruting Your Club"
                        type="학술동아리"
                    />
                    <ClubCard
                        imageURL="https://avatars.githubusercontent.com/u/176916276?s=400&u=48a14c04c14ce04adfebdf9290c6e36492b0994d&v=4"
                        path="/"
                        status="primary"
                        tag={['학술동아리', '코딩', '프로그래밍']}
                        title="Recruting Your Club"
                        type="학술동아리"
                    />
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem' }}>
                    <ClubCard
                        imageURL="https://avatars.githubusercontent.com/u/176916276?s=400&u=48a14c04c14ce04adfebdf9290c6e36492b0994d&v=4"
                        path="/"
                        status="primary"
                        tag={['학술동아리', '코딩', '프로그래밍']}
                        title="Recruting Your Club"
                        type="학술동아리"
                    />
                    <ClubCard
                        imageURL="https://avatars.githubusercontent.com/u/176916276?s=400&u=48a14c04c14ce04adfebdf9290c6e36492b0994d&v=4"
                        path="/"
                        status="primary"
                        tag={['학술동아리', '코딩', '프로그래밍']}
                        title="Recruting Your Club"
                        type="학술동아리"
                    />
                    <ClubCard
                        imageURL="https://avatars.githubusercontent.com/u/176916276?s=400&u=48a14c04c14ce04adfebdf9290c6e36492b0994d&v=4"
                        path="/"
                        status="primary"
                        tag={['학술동아리', '코딩', '프로그래밍']}
                        title="Recruting Your Club"
                        type="학술동아리"
                    />
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem' }}>
                    <ClubCard
                        imageURL="https://avatars.githubusercontent.com/u/176916276?s=400&u=48a14c04c14ce04adfebdf9290c6e36492b0994d&v=4"
                        path="/"
                        status="primary"
                        tag={['학술동아리', '코딩', '프로그래밍']}
                        title="Recruting Your Club"
                        type="학술동아리"
                    />
                    <ClubCard
                        imageURL="https://avatars.githubusercontent.com/u/176916276?s=400&u=48a14c04c14ce04adfebdf9290c6e36492b0994d&v=4"
                        path="/"
                        status="primary"
                        tag={['학술동아리', '코딩', '프로그래밍']}
                        title="Recruting Your Club"
                        type="학술동아리"
                    />
                    <ClubCard
                        imageURL="https://avatars.githubusercontent.com/u/176916276?s=400&u=48a14c04c14ce04adfebdf9290c6e36492b0994d&v=4"
                        path="/"
                        status="primary"
                        tag={['학술동아리', '코딩', '프로그래밍']}
                        title="Recruting Your Club"
                        type="학술동아리"
                    />
                </div>
            </div>
        </>
    );
}
export { TestPage };
