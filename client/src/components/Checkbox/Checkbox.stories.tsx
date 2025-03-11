import type { Meta, StoryObj } from '@storybook/react';
import type { Checkbox } from '.';

const meta: Meta<typeof Checkbox> = {
    title: 'Checkbox',

    parameters: {
        docs: {
            description: {
                component: 'Checkbox 컴포넌트입니다.',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;
