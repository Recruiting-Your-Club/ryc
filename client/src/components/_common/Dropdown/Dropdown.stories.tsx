import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Dropdown } from './Dropdown';
import { Button } from '@components/Button';

type Story = StoryObj<typeof Dropdown>;
type Trigger = StoryObj<typeof Dropdown.Trigger>;
type Item = StoryObj<typeof Dropdown.Item>;

const meta: Meta = {
    title: 'Dropdown',
    component: Dropdown,
    parameters: {
        layout: 'fullscreen',
        componentSubtitle:
            'Dropdown은 추가적인 메뉴를 담은 컴포넌트가 화면에 나타나도록 제어할 수 있는 트리거를 가지고 있습니다.',
        docs: {
            description: {
                component:
                    '다음과 같은 컴포넌트를 children으로 사용할 수 있습니다. (하단 Default Dropdown Story에 정리되어있습니다) ',
            },
        },
    },
    argTypes: {
        asChild: {
            description: '사용자 설정 컴포넌트 사용 여부를 결정합니다.',
            table: {
                type: { summary: 'boolean' },
                category: 'Dropdown.Trigger',
                defaultValue: { summary: 'false' },
            },
            control: {
                type: 'boolean',
            },
        },
        offsetX: {
            description: 'Dropdown.Content의 x좌표 위치를 결정합니다.',
            table: {
                type: { summary: 'number' },
                category: 'Dropdown.Content',
            },
            control: {
                type: 'number',
            },
        },
        offsetY: {
            description: 'Dropdown.Content의 y좌표 위치를 결정합니다.',
            table: {
                type: { summary: 'number' },
                category: 'Dropdown.Content',
            },
            control: {
                type: 'number',
            },
        },
        inset_Label: {
            description:
                '해당 값의 가운데 정렬을 결정합니다. (_Label은 단순 구분값으로 실제 속성이 아님)',
            table: {
                type: { summary: 'boolean' },
                category: 'Dropdown.Label',
                defaultValue: { summary: 'false' },
            },
            control: {
                type: 'boolean',
            },
        },
        inset_Item: {
            description:
                '해당 값의 가운데 정렬을 결정합니다. (_Item 단순 구분값으로 실제 속성이 아님)',
            table: {
                type: { summary: 'boolean' },
                category: 'Dropdown.Item',
                defaultValue: { summary: 'false' },
            },
            control: {
                type: 'boolean',
            },
        },
        inset_SubTrigger: {
            description:
                '해당 값의 가운데 정렬을 결정합니다. (_SubTrigger는 단순 구분값으로 실제 속성이 아님)',
            table: {
                type: { summary: 'boolean' },
                category: 'Dropdown.SubTrigger',
                defaultValue: { summary: 'false' },
            },
            control: {
                type: 'boolean',
            },
        },
        disabled_Item: {
            description:
                'Item의 클릭 가능 여부를 결정합니다.(_Item은 단순 구분값으로 실제 속성이 아님)',
            table: {
                type: { summary: 'boolean' },
                category: 'Dropdown.Item',
                defaultValue: { summary: 'false' },
            },
            control: {
                type: 'boolean',
            },
        },
        disabled_SubTrigger: {
            description:
                'Item의 클릭 가능 여부를 결정합니다.(_SubTrigger는 단순 구분값으로 실제 속성이 아님)',
            table: {
                type: { summary: 'boolean' },
                category: 'Dropdown.SubTrigger',
                defaultValue: { summary: 'false' },
            },
            control: {
                type: 'boolean',
            },
        },
        onItemSelect: {
            description: 'Item 클릭 시 적용될 이벤트를 등록하는 속성입니다.',
            table: {
                type: { summary: '() => void' },
                category: 'Dropdown.Item',
            },
            control: {
                type: 'object',
            },
        },
        align: {
            description: 'SubContent의 위치를 결정합니다.',
            table: {
                type: { summary: 'top|center|bottom' },
                category: 'Dropdown.SubContent',
                defaultValue: { summary: 'bottom' },
            },
        },
    },
    decorators: [
        (Story) => (
            <div
                css={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '30rem',
                }}
            >
                {Story()}
            </div>
        ),
    ],
};

/**
 * ##### `children`으로 사용 가능한 컴포넌트
 * - `<Dropdown.Trigger>` : `<Dropdown.Content>`를 열기 위한 이벤트를 제어하는 컴포넌트입니다.
 *   - `asChild` 속성을 사용해 사용자 정의 컴포넌트를  `<Dropdown.Trigger>` 내부에 렌더링시킬 수 있습니다.
 *   - `asChild` 속성 사용 시에는 `a` 태그 혹은 `button` 컴포넌트를 사용하는 것을 권장합니다. (onClick 이벤트 자동 적용되기 때문에)
 * - `<Dropdown.Content>` : 사용자가 선택할 수 있는 선택지의 종류를 렌더링하는 컴포넌트입니다.
 *   - `offsetX`, `offsetY` 속성을 사용해 `<Dropdown.Content> 컴포넌트의 위치를 직접 설정할 수 있습니다.
 * - `<Dropdown.Label>` : 선택지에 제목을 표시하고 싶을 때 사용하는 컴포넌트입니다.
 * - `<Dropdown.Seperator>` : 선택지의 구분선을 추가하고 싶을 때 사용하는 컴포넌트입니다.
 * - `<Dropdown.Group>` : 선택지를 그룹화 시키고 싶을 때 사용하는 컴포넌트입니다.
 * - `<Dropdown.Item>` : 선택지를 추가하기 위한 컴포넌트입니다.
 *   - `onItemSelect` 속성을 사용해 해당 `Item`을 선택했을 때 이벤트를 삽입할 수 있습니다.
 * - `<Dropdown.Sub>` : 선택지의 하위 선택지를 추가로 삽입하기 위한 root 컴포넌트입니다.
 * - `<Dropdown.SubTrigger>` : `<Dropdown.SubContent>`를 열기 위한 이벤트를 제어하는 컴포넌트입니다.
 * - `<Dropdown.SubContent>` : 사용자가 선택할 수 있는 하위 선택지의 종류를 렌더링하는 컴포넌트입니다.
 */
export const DefaultDropdown: Story = {
    render: (args) => {
        return (
            <Dropdown>
                <Dropdown.Trigger>hello</Dropdown.Trigger>
                <Dropdown.Content offsetX={0.2} offsetY={16}>
                    <Dropdown.Label>hello</Dropdown.Label>
                    <Dropdown.Seperator />
                    <Dropdown.Group>
                        <Dropdown.Item>hi</Dropdown.Item>
                        <Dropdown.Item>hi</Dropdown.Item>
                        <Dropdown.Item>hi</Dropdown.Item>
                    </Dropdown.Group>
                    <Dropdown.Seperator />
                    <Dropdown.Group>
                        <Dropdown.Item>hi</Dropdown.Item>
                        <Dropdown.Item>hi</Dropdown.Item>
                        <Dropdown.Item>hi</Dropdown.Item>
                    </Dropdown.Group>
                    <Dropdown.Sub>
                        <Dropdown.SubTrigger>hi</Dropdown.SubTrigger>
                        <Dropdown.SubContent>
                            <Dropdown.Label>hello</Dropdown.Label>
                            <Dropdown.Seperator />
                            <Dropdown.Group>
                                <Dropdown.Item>hi</Dropdown.Item>
                                <Dropdown.Item>hi</Dropdown.Item>
                                <Dropdown.Item>hi</Dropdown.Item>
                            </Dropdown.Group>
                            <Dropdown.Seperator />
                            <Dropdown.Group>
                                <Dropdown.Item>hi</Dropdown.Item>
                                <Dropdown.Item>hi</Dropdown.Item>
                                <Dropdown.Item>hi</Dropdown.Item>
                            </Dropdown.Group>
                        </Dropdown.SubContent>
                    </Dropdown.Sub>
                </Dropdown.Content>
            </Dropdown>
        );
    },
};

/**
 * ##### `asChild`속성을 활용해 Custom Button으로 Trigger 대체하기
 */
export const CustomTrigger: Trigger = {
    args: {
        asChild: true,
    },
    render: (args) => {
        return (
            <Dropdown>
                <Dropdown.Trigger asChild={args.asChild}>
                    <Button size="xl" variant="primary">
                        hello
                    </Button>
                </Dropdown.Trigger>
                <Dropdown.Content offsetX={0.4} offsetY={18}>
                    <Dropdown.Label>hello</Dropdown.Label>
                    <Dropdown.Seperator />
                    <Dropdown.Group>
                        <Dropdown.Item>hi</Dropdown.Item>
                        <Dropdown.Item>hi</Dropdown.Item>
                        <Dropdown.Item>hi</Dropdown.Item>
                    </Dropdown.Group>
                    <Dropdown.Seperator />
                    <Dropdown.Group>
                        <Dropdown.Item>hi</Dropdown.Item>
                        <Dropdown.Item>hi</Dropdown.Item>
                        <Dropdown.Item>hi</Dropdown.Item>
                    </Dropdown.Group>
                    <Dropdown.Sub>
                        <Dropdown.SubTrigger>hi</Dropdown.SubTrigger>
                        <Dropdown.SubContent align="center">
                            <Dropdown.Label>hello</Dropdown.Label>
                            <Dropdown.Seperator />
                            <Dropdown.Group>
                                <Dropdown.Item>hi</Dropdown.Item>
                                <Dropdown.Item>hi</Dropdown.Item>
                                <Dropdown.Item>hi</Dropdown.Item>
                            </Dropdown.Group>
                            <Dropdown.Seperator />
                            <Dropdown.Group>
                                <Dropdown.Item>hi</Dropdown.Item>
                                <Dropdown.Item>hi</Dropdown.Item>
                                <Dropdown.Item>hi</Dropdown.Item>
                            </Dropdown.Group>
                        </Dropdown.SubContent>
                    </Dropdown.Sub>
                </Dropdown.Content>
            </Dropdown>
        );
    },
};

/**
 * ##### `onItemSelect()`속성을 활용해 해당 Item 클릭 시 alert 이벤트 띄우기
 */
export const EventItem: Item = {
    args: {
        onItemSelect: () => alert('버튼이 클릭되었습니다.'),
    },
    render: (args) => {
        return (
            <Dropdown>
                <Dropdown.Trigger asChild>
                    <Button size="xl" variant="primary">
                        hello
                    </Button>
                </Dropdown.Trigger>
                <Dropdown.Content offsetX={0.2} offsetY={18} sx={{ width: '20rem' }}>
                    <Dropdown.Label>hello</Dropdown.Label>
                    <Dropdown.Seperator />
                    <Dropdown.Group>
                        <Dropdown.Item onItemSelect={args.onItemSelect}>
                            누르면 alert 이벤트
                        </Dropdown.Item>
                        <Dropdown.Item>hi</Dropdown.Item>
                        <Dropdown.Item>hi</Dropdown.Item>
                    </Dropdown.Group>
                    <Dropdown.Seperator />
                    <Dropdown.Group>
                        <Dropdown.Item>hi</Dropdown.Item>
                        <Dropdown.Item>hi</Dropdown.Item>
                        <Dropdown.Item>hi</Dropdown.Item>
                    </Dropdown.Group>
                    <Dropdown.Sub>
                        <Dropdown.SubTrigger>hi</Dropdown.SubTrigger>
                        <Dropdown.SubContent>
                            <Dropdown.Label>hello</Dropdown.Label>
                            <Dropdown.Seperator />
                            <Dropdown.Group>
                                <Dropdown.Item>hi</Dropdown.Item>
                                <Dropdown.Item>hi</Dropdown.Item>
                                <Dropdown.Item>hi</Dropdown.Item>
                            </Dropdown.Group>
                            <Dropdown.Seperator />
                            <Dropdown.Group>
                                <Dropdown.Item>hi</Dropdown.Item>
                                <Dropdown.Item>hi</Dropdown.Item>
                                <Dropdown.Item>hi</Dropdown.Item>
                            </Dropdown.Group>
                        </Dropdown.SubContent>
                    </Dropdown.Sub>
                </Dropdown.Content>
            </Dropdown>
        );
    },
};

export default meta;
