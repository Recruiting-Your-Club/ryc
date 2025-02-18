import React from 'react';
import { BaseInput, PasswordInput } from '@components/Input';
import { Button } from '@components/Button';
function TestPage() {
    return (
        <>
            <div>기본 input</div>
            <BaseInput variant="lined" />
            <BaseInput variant="primary" helperText="tetaetae" />
            <PasswordInput label="비밀번호" placeholder="******" />
            <div css={{ width: '200px', marginBottom: '20px' }}>
                <PasswordInput label="비밀번호 확인" placeholder="******" />
            </div>
            <BaseInput
                variant="primary"
                helperText="테스트요"
                label="테스트제목"
                endNode={
                    <Button variant="primary" size="xs">
                        테스트
                    </Button>
                }
            />
            <BaseInput
                variant="lined"
                helperText="테스트요"
                label="테스트제목"
                endNode={
                    <Button variant="primary" size="xs">
                        테스트
                    </Button>
                }
            />
        </>
    );
}
export { TestPage };
