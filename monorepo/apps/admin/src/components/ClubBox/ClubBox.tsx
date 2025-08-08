import React from 'react';

import Trash from '@ssoc/assets/images/trash.svg';
import { Button, Input, Text } from '@ssoc/ui';

import { clubBoxContainer, clubBoxItem } from './ClubBox.style';
import type { ClubBoxProps } from './types';

function ClubBox({ data, isEditMode, onDataChange, onAddItem, onDeleteItem }: ClubBoxProps) {
    const handleInputChange = (id: string, field: 'title' | 'value', newText: string) => {
        if (data && onDataChange) {
            const updatedData = data.map((item) =>
                item.id === id ? { ...item, [field]: newText } : item,
            );
            onDataChange(updatedData);
        }
    };

    return (
        <div css={clubBoxContainer}>
            {data?.map((item) => (
                <div key={item.id} css={clubBoxItem}>
                    {isEditMode ? (
                        <>
                            <Input
                                value={item.title}
                                onChange={(event) =>
                                    handleInputChange(item.id, 'title', event.target.value)
                                }
                                placeholder="항목"
                            />
                            <Input
                                value={item.value}
                                onChange={(event) =>
                                    handleInputChange(item.id, 'value', event.target.value)
                                }
                                placeholder="내용"
                            />
                            <Button
                                type="button"
                                variant="transparent"
                                size="md"
                                onClick={() => onDeleteItem?.(item.id)}
                            >
                                <Trash width={16} height={16} />
                            </Button>
                        </>
                    ) : (
                        <>
                            <Text
                                as="div"
                                type="bodyRegular"
                                color="caption"
                                sx={{ width: '40%' }}
                                textAlign="start"
                                noWrap
                            >
                                {item.title}
                            </Text>
                            <Text as="div" type="bodyRegular" textAlign="start" noWrap>
                                {item.value}
                            </Text>
                        </>
                    )}
                </div>
            ))}
            {isEditMode && (
                <div>
                    <Button
                        variant="outlined"
                        size="full"
                        sx={{ fontSize: '2rem' }}
                        onClick={onAddItem}
                    >
                        +
                    </Button>
                </div>
            )}
        </div>
    );
}
export { ClubBox };
