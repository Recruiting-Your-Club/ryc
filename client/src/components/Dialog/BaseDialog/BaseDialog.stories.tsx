import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@components/Button';
import { Text } from '@components/Text';
import XIcon from '@assets/images/xIcon.svg';
import { Dialog } from '.';

const meta: Meta<typeof Dialog> = {
    title: 'Components/Dialog',
    component: Dialog,
    parameters: {
        docs: {
            description: {
                component: '다이얼로그입니다.',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const BaseDialog: Story = {
    render: (args) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [isOpen, setIsOpen] = useState(false);
        const handleClose = () => {
            setIsOpen(false);
        };
        return (
            <>
                <Button size="full" variant="primary" onClick={() => setIsOpen(true)}>
                    ㅋ눌러보세용ㅋ
                </Button>
                <Dialog open={isOpen} handleClose={handleClose}>
                    <Dialog.Header border>
                        <Text as="span" type="h4Bold">
                            전체 이메일 보내기
                        </Text>
                        <Button
                            variant="transparent"
                            size="xs"
                            aria-label="close"
                            onClick={handleClose}
                        >
                            <XIcon alt="close" />
                        </Button>
                    </Dialog.Header>
                    <Dialog.Content>
                        <Text as="span" type="bodyRegular" textAlign="start">
                            내용물을 채워보아요~~~~~~~~~ 이거 왜 스토리북 Ui 이상하냐고요
                        </Text>
                    </Dialog.Content>
                    <Dialog.Action>
                        <Button size="full" variant="primary" onClick={handleClose}>
                            확인
                        </Button>
                    </Dialog.Action>
                </Dialog>
            </>
        );
    },
    args: {
        children: 'ReactNode',
        open: false,
        size: 'md',
        handleClose: () => {},
        sx: {},
    },
};
