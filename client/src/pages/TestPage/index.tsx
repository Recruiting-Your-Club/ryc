import React, { useState } from 'react';
import { Button } from '@components/_common/Button';
import { Text } from '@components/_common/Text';
import { ClubCard } from '@components';
function TestPage() {
    return (
        <>
            <div>
                {/**
                <Button variant="outlined">hd</Button>
                <Button variant="text">hd</Button>
                <Button variant="transparent">hd</Button>
                <Button variant="primary">hd</Button>
                <Text type="h1Bold">
                    <Text.HighLignt text="하이" />
                    하이요
                </Text>
                */}
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
