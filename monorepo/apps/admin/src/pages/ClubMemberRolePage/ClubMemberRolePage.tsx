import { roleMutations } from '@api/hooks';
import { roleQueries } from '@api/queryFactory/roleQueries';
import { ConfirmDialog } from '@components/ConfirmDialog';
import { InviteMemberDialog } from '@components/InviteMemberDialog';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import BaseImage from '@ssoc/assets/images/basicImage.png';
import Search from '@ssoc/assets/images/search.svg';
import { Avatar, Button, Dropdown, Input, Table, useDialog, useToast } from '@ssoc/ui';

import Meatball from '../../assets/images/meatball-menu.svg';
import {
    s_buttonSx,
    s_clubMemberRolePageContainer,
    s_clubMemberRolePageTableContainer,
    s_clubMemberRolePageTopContainer,
    s_dropdownItemSx,
    s_dropdownTriggerSx,
    s_inputSx,
    s_memberCellContainer,
    s_tableCellDropdownSx,
    s_tableCellNoActionSx,
    s_tableCellSx,
    s_tableHeaderCellSx,
    s_tableSx,
} from './ClubMemberRolePage.style';

const dummyUserList = [
    {
        adminId: '1',
        adminName: '홍길동',
        adminProfileImage: { url: 'https://via.placeholder.com/150' },
        joinedAt: '2025-01-01',
        role: '회장',
    },
    {
        adminId: '2',
        adminName: '김길동',
        adminProfileImage: { url: 'https://via.placeholder.com/150' },
        joinedAt: '2025-01-01',
        role: '동아리원',
    },
    {
        adminId: '3',
        adminName: '이길동',
        adminProfileImage: { url: 'https://via.placeholder.com/150' },
        joinedAt: '2025-01-01',
        role: '동아리원',
    },
    {
        adminId: '4',
        adminName: '박길동',
        adminProfileImage: { url: 'https://via.placeholder.com/150' },
        joinedAt: '2025-01-01',
        role: '동아리원',
    },
];

const ClubMemberRolePage = () => {
    // prop destruction

    // lib hooks
    const { open, openDialog, closeDialog } = useDialog();
    const { toast } = useToast();
    const { clubId } = useParams();
    // initial values
    // state, ref, querystring hooks
    const [currentUserRole] = useState<'회장' | '동아리원'>('회장');
    const [isKickConfirmOpen, setIsKickConfirmOpen] = useState(false);
    const [inviteUrl, setInviteUrl] = useState('');
    const [searchText, setSearchText] = useState('');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    // form hooks
    // query hooks
    const { mutate: deleteMember, isPending: isDeleting } = roleMutations.useDeleteClubMember(
        clubId || '',
    );
    const { mutate: generateInviteUrl, isPending: isGeneratingUrl } =
        roleMutations.usePostClubIdAndGetInviteUrl({
            clubId: clubId || '',
            onSuccess: (res) => {
                const code = res.inviteCode;
                const localhostUrl = `http://localhost:3000/${code}`;
                setInviteUrl(localhostUrl);
                openDialog();
            },
            onError: () => {
                toast.error('초대 링크 생성에 실패했습니다.');
            },
        });

    const { data: userList } = useQuery(roleQueries.getClubMemberList(clubId || ''));

    // calculated values
    const filteredMembers = useMemo(
        () =>
            userList?.filter((member) =>
                member.adminName.toLowerCase().includes(searchText.trim().toLowerCase()),
            ),
        [searchText],
    );
    // handlers

    const handleClickKickMember = () => {
        if (currentUserRole !== '회장') {
            toast.error('회장만 멤버를 내보낼 수 있습니다.');
            return;
        }

        if (selectedIds.length === 0) {
            toast.error('내보낼 멤버를 선택해주세요.');
            return;
        }

        setIsKickConfirmOpen(true);
    };

    const handleConfirmKickMember = () => {
        deleteMember(selectedIds[0], {
            onSuccess: () => toast.success('멤버를 내보냈습니다.'),
            onError: () => toast.error('내보내기에 실패했습니다.'),
        });
    };

    const handleClickInviteMember = () => {
        generateInviteUrl();
    };
    // effects

    return (
        <div css={s_clubMemberRolePageContainer}>
            <div css={s_clubMemberRolePageTopContainer}>
                <Input
                    variant="transparent"
                    startNode={
                        <Button variant="text" size="s">
                            <Search width="1.5rem" height="1.5rem" />
                        </Button>
                    }
                    inputSx={s_inputSx}
                    placeholder="동아리원 검색 또는 키워드 입력"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Button
                    variant="primary"
                    size="lg"
                    onClick={handleClickInviteMember}
                    sx={s_buttonSx}
                    disabled={isGeneratingUrl}
                >
                    {isGeneratingUrl ? '생성 중...' : '멤버 초대'}
                </Button>
            </div>
            <div css={s_clubMemberRolePageTableContainer}>
                <Table sxTable={{ s_tableSx }}>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell sx={s_tableHeaderCellSx}>
                                멤버
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>가입일</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>권한</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>작업</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {filteredMembers?.map((member) => (
                            <Table.Row key={member.adminId}>
                                <Table.Cell sx={s_tableCellSx}>
                                    <div css={s_memberCellContainer}>
                                        {member.adminProfileImage.url ? (
                                            <Avatar
                                                imageURL={member.adminProfileImage.url}
                                                size="s"
                                                shape="round"
                                            />
                                        ) : (
                                            <Avatar imageURL={BaseImage} size="s" shape="round" />
                                        )}
                                        {member.adminName}
                                    </div>
                                </Table.Cell>
                                <Table.Cell>{member.joinedAt}</Table.Cell>
                                <Table.Cell>{member.role}</Table.Cell>
                                {member.role !== '회장' && currentUserRole === '회장' ? (
                                    <Table.Cell sx={s_tableCellDropdownSx}>
                                        <Dropdown>
                                            <Dropdown.Trigger asChild sx={s_dropdownTriggerSx}>
                                                <Meatball width="1.5rem" height="1.5rem" />
                                            </Dropdown.Trigger>
                                            <Dropdown.Content>
                                                <Dropdown.Item
                                                    onItemSelect={handleClickKickMember}
                                                    sx={s_dropdownItemSx}
                                                >
                                                    내보내기
                                                </Dropdown.Item>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </Table.Cell>
                                ) : (
                                    <Table.Cell sx={s_tableCellNoActionSx}>-</Table.Cell>
                                )}
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                {open && (
                    <InviteMemberDialog
                        open={open}
                        handleClose={closeDialog}
                        inviteUrl={inviteUrl}
                    />
                )}

                <ConfirmDialog
                    open={isKickConfirmOpen}
                    type="warning"
                    title="멤버 내보내기"
                    content="정말로 멤버를 내보내시겠습니까?"
                    cancelButton={true}
                    handleClose={() => setIsKickConfirmOpen(false)}
                    actionHandler={handleConfirmKickMember}
                />
            </div>
        </div>
    );
};

export { ClubMemberRolePage };
