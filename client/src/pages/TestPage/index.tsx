import React from 'react';
import { BaseInput, PasswordInput } from '@components/Input';
import { Button } from '@components/Button';
import { css } from '@emotion/react';
import Search from '@assets/images/search.svg';

function TestPage() {
    const [value, setValue] = React.useState('');
    const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };
    return (
        <>
            <PasswordInput label="비밀번호" helperText={'비밀번호가 일치하지 않습니다.'} placeholder="******" />

            <div css={{ width: '200px', marginBottom: '20px' }}>
                <PasswordInput label="비밀번호 확인" placeholder="******" />
            </div>

            <BaseInput
                variant="primary"
                helperText="테스트요"
                label="테스트제목"
                isError={true}
                startNode={<div>시작</div>}
                endNode={<div>03:27</div>}
            />
            <BaseInput
                helperText="테스트요"
                label="테스트제목"
                onChange={(e) => handleValue(e)}
                value={value}
                endNode={
                    <Button variant="primary" size="s">
                        테스트
                    </Button>
                }
            />
            <BaseInput
                value={value}
                placeholder="지원자 이름 검색"
                variant="primary"
                endNode={
                    <Button variant="transparent" size="xs">
                        <Search width="20" height="20" alt="search" />
                    </Button>
                }
                onChange={(e) => handleValue(e)}
            />
        </>
    );
}
export { TestPage };
