import React, { useState } from 'react';
import { Select } from '@components/Select/Select';
import { Dropdown } from '@components/_common/Dropdown/Dropdown';
import { Button } from '@components';
import { DropdownSeperator } from '@components/_common/Dropdown/DropdownSeperator';
function TestPage() {
    const [value, setValue] = useState('');

    return (
        <div>
            <p style={{ marginBottom: '20px' }}>Selected value: {value}</p>
            <Select size="md">
                <Select.Trigger>
                    <Select.Value placeholder="Select a fruit" />
                </Select.Trigger>
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Fruits</Select.Label>
                        <Select.Item value="apple">안녕1</Select.Item>
                        <Select.Item value="banana">안녕2</Select.Item>
                        <Select.Item value="orange">안녕3</Select.Item>
                    </Select.Group>
                    <Select.Separator />
                    <Select.Group>
                        <Select.Label>Vegetables</Select.Label>
                        <Select.Item value="carrot">Carrot</Select.Item>
                        <Select.Item value="potato">Potato</Select.Item>
                        <Select.Item value="broccoli">Broccoli</Select.Item>
                    </Select.Group>
                </Select.Content>
            </Select>
            <div css={{ margin: '20px' }}></div>
            <Dropdown>
                <Dropdown.Trigger asChild>
                    <Button size="xl" variant="primary">
                        hello
                    </Button>
                </Dropdown.Trigger>
                <Dropdown.Content offsetX={-15} offsetY={16}>
                    <Dropdown.Label>hello</Dropdown.Label>
                    <Dropdown.Seperator />
                    <Dropdown.Group>
                        <Dropdown.Item>hi</Dropdown.Item>
                        <Dropdown.Item>hi</Dropdown.Item>
                        <Dropdown.Item>hi</Dropdown.Item>
                    </Dropdown.Group>
                    <DropdownSeperator />
                    <Dropdown.Group>
                        <Dropdown.Item>hi</Dropdown.Item>
                        <Dropdown.Item>hi</Dropdown.Item>
                        <Dropdown.Item>hi</Dropdown.Item>
                    </Dropdown.Group>
                </Dropdown.Content>
            </Dropdown>
        </div>
    );
}
export { TestPage };
