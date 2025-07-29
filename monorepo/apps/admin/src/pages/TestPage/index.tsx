import { Button, Dropdown } from '@ssoc/ui';

function TestPage() {
    return (
        <div
            css={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Dropdown>
                <Dropdown.Trigger asChild>
                    <Button>hello</Button>
                </Dropdown.Trigger>
                <Dropdown.Content offsetY={-8}>
                    <Dropdown.Item>1</Dropdown.Item>
                    <Dropdown.Item>1</Dropdown.Item>
                    <Dropdown.Item>1</Dropdown.Item>
                    <Dropdown.Item>1</Dropdown.Item>
                </Dropdown.Content>
            </Dropdown>
        </div>
    );
}
export { TestPage };
