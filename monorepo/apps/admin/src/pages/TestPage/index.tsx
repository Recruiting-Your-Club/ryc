import { Table } from '@ssoc/ui';

function TestPage() {
    return (
        <div css={{ width: '60%' }}>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell sx={{ paddingRight: '15rem' }}>
                            멤버
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>가입일</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>권한</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>작업</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>오성</Table.Cell>
                        <Table.Cell>2025.09.01</Table.Cell>
                        <Table.Cell>회장</Table.Cell>
                        <Table.Cell>hello</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>오성</Table.Cell>
                        <Table.Cell>2025.09.01</Table.Cell>
                        <Table.Cell>회장</Table.Cell>
                        <Table.Cell>hello</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>오성</Table.Cell>
                        <Table.Cell>2025.09.01</Table.Cell>
                        <Table.Cell>회장</Table.Cell>
                        <Table.Cell>hello</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            <div>hi</div>
        </div>
    );
}
export { TestPage };
