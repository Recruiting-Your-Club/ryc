import React from 'react';

import { Button, Text } from '@ssoc/ui';

import { s_emptyText, s_listButton, s_sectionContainer } from './DialogSection.style';
import type { DialogSectionProps } from './types';

function DialogSection({ title, items, emptyText, onSelect }: DialogSectionProps) {
    return (
        <section css={s_sectionContainer}>
            <Text type="bodySemibold">{title}</Text>

            {items.length === 0 ? (
                <Text color="caption" sx={s_emptyText}>
                    {emptyText}
                </Text>
            ) : (
                <ul>
                    {items.map((announcement) => (
                        <li key={announcement.announcementId}>
                            <Button
                                variant="transparent"
                                onClick={() => onSelect(announcement)}
                                sx={s_listButton}
                            >
                                <Text>{announcement.title}</Text>
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export { DialogSection };
