import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { Checkbox } from '.';

type Story = StoryFn<typeof Checkbox>;

const meta: Meta<typeof Checkbox> = {
    title: 'Checkbox',
    component: Checkbox,
    parameters: {
        docs: {
            description: {
                component: 'Checkbox 컴포넌트입니다.',
            },
        },
    },
};

export default meta;

const CheckboxTemplate: Story = (args) => {
    return (
        <Checkbox.Root {...args}>
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>Checkbox 입니다.</Checkbox.Label>
        </Checkbox.Root>
    );
};

export const Outline = CheckboxTemplate.bind({});
Outline.args = {
    variant: 'outline',
    size: 'md',
};

export const Solid = CheckboxTemplate.bind({});
Solid.args = {
    variant: 'solid',
    size: 'md',
};

export const Subtle = CheckboxTemplate.bind({});
Subtle.args = {
    variant: 'subtle',
    size: 'md',
};

export const xs = CheckboxTemplate.bind({});
xs.args = {
    size: 'xs',
};

export const s = CheckboxTemplate.bind({});
s.args = {
    size: 's',
};

export const md = CheckboxTemplate.bind({});
md.args = {
    size: 'md',
};

export const lg = CheckboxTemplate.bind({});
lg.args = {
    size: 'lg',
};

export const DefaultChecked = CheckboxTemplate.bind({});
DefaultChecked.args = {
    isChecked: true,
    size: 'md',
};

export const DefaultCheckedButDisabled = CheckboxTemplate.bind({});
DefaultCheckedButDisabled.args = {
    isChecked: true,
    disabled: true,
    size: 'md',
};

export const Disabled = CheckboxTemplate.bind({});
Disabled.args = {
    disabled: true,
    size: 'md',
};

const CheckboxNoLabelTemplate: Story = (args) => {
    return (
        <Checkbox.Root {...args}>
            <Checkbox.HiddenInput />
            <Checkbox.Control />
        </Checkbox.Root>
    );
};

export const NoLabel = CheckboxNoLabelTemplate.bind({});
NoLabel.args = {
    size: 'lg',
};
