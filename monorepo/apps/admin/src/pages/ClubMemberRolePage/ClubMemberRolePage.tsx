import { roleMutations } from '@api/hooks';
import { roleQueries } from '@api/queryFactory/roleQueries';
import { ConfirmDialog } from '@components/ConfirmDialog';
import { InviteMemberDialog } from '@components/InviteMemberDialog';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import BaseImage from '@ssoc/assets/images/basicImage.png';
import Search from '@ssoc/assets/images/search.svg';
import { Avatar, Button, Dropdown, Input, Table, useDialog, useToast } from '@ssoc/ui';

import { HttpError } from '../../api/common/httpError';
import Meatball from '../../assets/images/meatball-menu.svg';
import {
    s_buttonSx,
    s_clubMemberRolePageContainer,
    s_clubMemberRolePageTableContainer,
    s_clubMemberRolePageTopContainer,
    s_dropdownContentSx,
    s_dropdownItemSx,
    s_dropdownTriggerSx,
    s_inputSx,
    s_memberCellContainer,
    s_searchButtonSx,
    s_tableCellDropdownSx,
    s_tableCellNoActionSx,
    s_tableCellSx,
    s_tableHeaderCellSx,
    s_tableSx,
} from './ClubMemberRolePage.style';

const ClubMemberRolePage = () => {
    // prop destruction
    // lib hooks
    const { open, openDialog, closeDialog } = useDialog();
    const { toast } = useToast();
    const { clubId } = useParams();
    const queryClient = useQueryClient();
    // initial values
    // state, ref, querystring hooks
    const [isKickConfirmOpen, setIsKickConfirmOpen] = useState(false);
    const [inviteUrl, setInviteUrl] = useState('');
    const [searchText, setSearchText] = useState('');
    const [selectedId, setSelectedId] = useState<string>('');
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
                const origin = window.location.origin;
                const invitePath = `/${clubId}/${code}`;
                setInviteUrl(`${origin}${invitePath}`);
                openDialog();
            },
            onError: (error) => {
                if (error instanceof HttpError && error.statusCode === 500) {
                    return;
                }
                toast.error('초대 링크 생성에 실패했습니다.');
            },
        });

    const {
        data: userList,
        isLoading,
        error,
    } = useQuery({
        ...roleQueries.getClubMemberList(clubId || ''),
        enabled: !!clubId,
    });

    // calculated values
    const filteredMembers = useMemo(
        () =>
            userList
                ?.filter((member) =>
                    member.adminName.toLowerCase().includes(searchText.trim().toLowerCase()),
                )
                ?.sort((a, b) => {
                    if (a.role === 'OWNER' && b.role !== 'OWNER') return -1;
                    if (a.role !== 'OWNER' && b.role === 'OWNER') return 1;
                    return a.joinedAt.localeCompare(b.joinedAt);
                }),
        [userList, searchText],
    );

    const translateRole = (role: string) => {
        switch (role) {
            case 'OWNER':
                return '회장';
            case 'MEMBER':
                return '동아리원';
            default:
                return '동아리원';
        }
    };

    const formatDate = (date: string) => {
        return dayjs(date).format('YYYY.MM.DD');
    };
    // handlers
    const handleClickKickMember = (memberId: string) => {
        setSelectedId(memberId);
        setIsKickConfirmOpen(true);
    };

    const handleConfirmKickMember = () => {
        deleteMember(selectedId, {
            onSuccess: () => {
                toast.success('멤버를 내보냈어요.');
                setSelectedId('');
                setIsKickConfirmOpen(false);

                queryClient.invalidateQueries({
                    queryKey: roleQueries.getClubMemberList(clubId || '').queryKey,
                });
            },
            onError: (error) => {
                if (error instanceof HttpError && error.statusCode === 500) {
                    return;
                } else if (error instanceof HttpError && error.statusCode === 400) {
                    toast.error('회장은 내보낼 수 없어요.');
                    setIsKickConfirmOpen(false);
                    return;
                } else if (error instanceof HttpError && error.statusCode === 403) {
                    toast.error('동아리원은 내보내기 권한이 없어요.');
                    setIsKickConfirmOpen(false);
                    return;
                }
                toast.error('내보내기에 실패했습니다.');
                setIsKickConfirmOpen(false);
            },
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
                        <Button variant="text" size="s" sx={s_searchButtonSx}>
                            <Search width="1.5rem" height="1.5rem" css={s_searchButtonSx} />
                        </Button>
                    }
                    inputSx={s_inputSx}
                    placeholder="동아리원 검색 또는 키워드 입력"
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
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
                <Table sxTable={s_tableSx}>
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
                        {isLoading ? (
                            <Table.Row>
                                <Table.Cell>로딩 중...</Table.Cell>
                            </Table.Row>
                        ) : filteredMembers && filteredMembers.length > 0 ? (
                            filteredMembers.map((member) => (
                                <Table.Row key={member.adminId}>
                                    <Table.Cell sx={s_tableCellSx}>
                                        <div css={s_memberCellContainer}>
                                            {member.adminProfileImage?.url ? (
                                                <Avatar
                                                    imageURL={member.adminProfileImage.url}
                                                    size="s"
                                                    shape="round"
                                                />
                                            ) : (
                                                <Avatar
                                                    imageURL={BaseImage}
                                                    size="s"
                                                    shape="round"
                                                />
                                            )}
                                            {member.adminName}
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>{formatDate(member.joinedAt)}</Table.Cell>
                                    <Table.Cell>{translateRole(member.role)}</Table.Cell>
                                    {member.role !== 'OWNER' ? (
                                        <Table.Cell sx={s_tableCellDropdownSx}>
                                            <Dropdown>
                                                <Dropdown.Trigger asChild sx={s_dropdownTriggerSx}>
                                                    <Meatball width="1.5rem" height="1.5rem" />
                                                </Dropdown.Trigger>
                                                <Dropdown.Content sx={s_dropdownContentSx}>
                                                    <Dropdown.Item
                                                        onItemSelect={() =>
                                                            handleClickKickMember(member.adminId)
                                                        }
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
                            ))
                        ) : (
                            <Table.Row>
                                <Table.Cell>등록된 멤버가 없습니다.</Table.Cell>
                            </Table.Row>
                        )}
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
