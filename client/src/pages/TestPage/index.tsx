import type { ChangeEvent } from 'react';
import React, { TextareaHTMLAttributes, useState } from 'react';
import { Button } from '@components/_common/Button';
import { Text } from '@components/_common/Text';
import { Input } from '@components/_common/Input';
import { TextArea } from '@components/_common/TextArea/TextArea';
function TestPage() {
    const [text, setText] = useState('');
    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };
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
                <TextArea size="xs" variant="flushed" value={text} onChange={onChange} />
                <TextArea size="sm" variant="subtle" value={text} onChange={onChange} />
                <TextArea size="md" variant="outline" value={text} onChange={onChange} />
                <TextArea size="lg" maxLength={300} value={text} onChange={onChange} />
                <TextArea
                    size="xl"
                    error={text.length < 10}
                    maxLength={300}
                    errorText="10자 이상 입력해주세요."
                    value={text}
                    onChange={onChange}
                />
                <TextArea size="full" value={text} onChange={onChange} />
            </div>
        </>
    );
}
export { TestPage };
