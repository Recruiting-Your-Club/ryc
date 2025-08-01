import { Table } from '@ssoc/ui';

function TestPage() {
    return (
        <div css={{ width: '100%' }}>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>멤버</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>가입일</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>권한</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>작업</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
            </Table>
            <div>hi</div>
        </div>
    );
}
export { TestPage };
