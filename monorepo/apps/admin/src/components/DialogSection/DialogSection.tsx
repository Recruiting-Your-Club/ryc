import React from 'react';

import { Button, Text } from '@ssoc/ui';

import type { DialogSectionProps } from './types';

function DialogSection({ title, items, emptyText, onSelect }: DialogSectionProps) {
    return (
        <section>
            <Text type="h4Semibold">{title}</Text>

            {items.length === 0 ? (
                <Text color="caption">{emptyText}</Text>
            ) : (
                <ul>
                    {items.map((announcement) => (
                        <li key={announcement.announcementId}>
                            <Button variant="transparent" onClick={() => onSelect(announcement)}>
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
