import { Tag } from '@components/Tag';
import React, { useEffect, useRef, useState } from 'react';
import { invisibleTag, perTag, tagDisplay } from './ClubCard.style';

interface CardFooterProps {
    tag: string[];
}

function TagList({ tag }: CardFooterProps) {
    // prop destruction
    // lib hooks

    // state, ref, querystring hooks
    const visibleRef = useRef<HTMLDivElement | null>(null);
    const invisibleRef = useRef<HTMLDivElement | null>(null);
    const [visibleTag, setVisibleTag] = useState<string[]>([]);
    const [isMeasuring, setIsMeasuring] = useState(true);

    // form hooks
    // query hooks
    // calculated values

    // effects
    useEffect(() => {
        if (!visibleRef.current || !invisibleRef.current) return;

        const cardWidth = visibleRef.current.clientWidth;
        let currentTagsWidth = 0;
        const newVisibleTag: string[] = [];

        const tagElements = Array.from(invisibleRef.current.children) as HTMLDivElement[];
        tagElements.forEach((tagElement, index) => {
            const tagWidth = tagElement.offsetWidth;
            if (currentTagsWidth + tagWidth <= cardWidth) {
                newVisibleTag.push(tag[index]);
                currentTagsWidth += tagWidth;
            }
        });
        setVisibleTag(newVisibleTag);
        setIsMeasuring(false);
    }, [tag]);

    // handlers

    return (
        <>
            <div ref={visibleRef} css={tagDisplay}>
                {visibleTag.map((tag, _) => (
                    <span key={tag} css={perTag}>
                        <Tag text={tag} variant="primary" />
                    </span>
                ))}
            </div>
            {isMeasuring && (
                <div ref={invisibleRef} css={invisibleTag} aria-hidden="true">
                    {tag.map((tag, _) => (
                        <Tag key={tag} text={tag} variant="primary" />
                    ))}
                </div>
            )}
        </>
    );
}

export { TagList };
