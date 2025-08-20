import React, { useId, useRef, useState } from 'react';

import X from '@ssoc/assets/images/x-free.svg';
import { Input, Text } from '@ssoc/ui';

import {
    s_container,
    s_counter,
    s_hash,
    s_input,
    s_removeButton,
    s_tag,
    s_tagText,
    s_xIcon,
} from './TagInput.style';
import type { TagInputProps } from './types';

function TagInput({
    tags,
    onTagsChange,
    placeholder = 'ex)백엔드, 프로그래밍, ...',
    maxTags,
}: TagInputProps) {
    // prop destruction
    // lib hooks
    const inputId = useId();

    // initial values
    // state, ref, querystring hooks
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // form hooks
    // query hooks
    // calculated values
    const addTag = (tag: string) => {
        if (tag && !tags.includes(tag) && (!maxTags || tags.length < maxTags)) {
            onTagsChange([...tags, tag]);
            setInputValue('');
        }
    };

    const removeTag = (index: number) => {
        const newTags = tags.filter((_, i) => i !== index);
        onTagsChange(newTags);
    };

    // handlers
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        //FIXME: keycode가 deprecated긴 한데, 저거 안쓰면 작동을 안해서 일단 써놨습니다...
        if ((event.nativeEvent as KeyboardEvent).isComposing || event.keyCode === 229) return;

        if (event.key === 'Enter') {
            const v = event.currentTarget.value.trim();
            if (v) {
                event.preventDefault();
                addTag(v);
            }
        } else if (event.key === 'Backspace' && !event.currentTarget.value && tags.length > 0) {
            removeTag(tags.length - 1);
        }
    };

    const handleContainerClick = () => {
        inputRef.current?.focus();
    };

    // effects

    return (
        <div
            css={s_container}
            onClick={handleContainerClick}
            role="button"
            tabIndex={0}
            aria-label="태그 입력란 포커스"
            aria-controls={inputId}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleContainerClick();
                }
            }}
        >
            {tags.map((tag, index) => (
                <div key={index} css={s_tag}>
                    <Text type="captionRegular" sx={s_hash}>
                        #
                    </Text>
                    <Text type="captionRegular" sx={s_tagText}>
                        {tag}
                    </Text>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            removeTag(index);
                        }}
                        css={s_removeButton}
                    >
                        <X css={s_xIcon} />
                    </button>
                </div>
            ))}

            <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={tags.length === 0 ? placeholder : ''}
                css={s_input}
                disabled={maxTags ? tags.length >= maxTags : false}
            />

            {maxTags && (
                <span css={s_counter}>
                    {tags.length}/{maxTags}
                </span>
            )}
        </div>
    );
}

export { TagInput };
