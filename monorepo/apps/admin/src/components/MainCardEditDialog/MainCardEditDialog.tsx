import type { Club } from '@api/domain/club/types';
import type { UpdateClub } from '@api/domain/club/types';
import ssoc from '@assets/images/ssoc.png';
import { HashTagInput } from '@components';
import type { Tag } from '@components/HashTagInput/types';
import { useUpdateClub } from '@hooks/useUpdateClub';
import type { ErrorWithStatusCode } from '@pages/ErrorFallbackPage/types';
import { getErrorMessage } from '@utils/getErrorMessage';
import { useState } from 'react';

import { Input, Text, useToast } from '@ssoc/ui';
import { Button, Dialog, MainCard } from '@ssoc/ui';

import { s_contentContainer, s_inputContainer } from './MadinCardEditDialog.style';

function MainCardEditDialog({
    clubId,
    open,
    onClose,
    club,
}: {
    clubId: string;
    open: boolean;
    onClose: () => void;
    club: Club;
}) {
    // prop destruction
    // lib hooks
    const { toast } = useToast();
    // initial values
    // state, ref, querystring hooks
    const [shortDescription, setShortDescription] = useState(club?.shortDescription);
    const [hashTags, setHashTags] = useState(
        club?.clubTags || [{ id: crypto.randomUUID(), name: '동아리 태그' }],
    );
    // form hooks
    // query hooks
    const { mutateAsync: updateClub, isPending: isUpdateLoading } = useUpdateClub();
    // calculated values
    // handlers
    const updateClubData = async () => {
        const updatedClubData: UpdateClub = {
            name: club?.name, // 동아리 타이틀
            shortDescription: shortDescription ?? club?.shortDescription,
            detailDescription: club?.detailDescription,
            category: club?.category,
            clubTags: hashTags ?? club?.clubTags,
            clubSummaries: club?.clubSummaries,
            representativeImage: club?.representativeImage.id ?? null,
            clubDetailImages: club?.clubDetailImages?.map((image) => image.id) ?? null,
        };
        return updatedClubData;
    };
    const handleShortDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShortDescription(event.target.value);
    };
    const handleTagsChange = (newTags: Tag[]) => {
        setHashTags(newTags);
    };
    const handleSaveClubData = async () => {
        const updatedClubData = await updateClubData();
        try {
            await updateClub({ id: clubId, club: updatedClubData });
            toast('동아리 정보가 업데이트 되었어요.', {
                toastTheme: 'white',
                type: 'success',
            });
        } catch (err) {
            const error = err as ErrorWithStatusCode;
            // Dialog에서는 500 에러 토스트로 처리
            if (error.response?.errors[0].message || error.message) {
                toast(getErrorMessage(error), { type: 'error', toastTheme: 'colored' });
            } else {
                toast(`동아리 정보 수정에 실패했습니다. 다시 시도해주세요.`, {
                    type: 'error',
                    toastTheme: 'colored',
                });
            }
            console.error(error);
        }
        onClose();
    };
    // effects

    return (
        <Dialog open={open} handleClose={onClose} size="lg" backdrop={false}>
            <Dialog.Header>
                <Text type="h4Semibold" textAlign="start">
                    동아리 카드 수정
                </Text>
            </Dialog.Header>
            <Dialog.Content>
                <div css={s_contentContainer}>
                    <div css={{ pointerEvents: 'none', cursor: 'default' }}>
                        <MainCard
                            title={club?.name}
                            category={club?.category}
                            description={club?.shortDescription}
                            clubTags={club?.clubTags}
                            representativeImage={club?.representativeImage?.url || ssoc}
                        />
                    </div>
                    <div css={s_inputContainer}>
                        <div css={{ gap: '2rem' }}>
                            <Text
                                type="captionSemibold"
                                textAlign="start"
                                sx={{ paddingLeft: '0.5rem' }}
                            >
                                동아리 한 줄 소개
                            </Text>
                            <Input
                                onChange={(event) => handleShortDescriptionChange(event)}
                                placeholder="ex) 동아리 한 줄 소개를 입력해주세요."
                            />
                        </div>
                        <div>
                            <Text
                                type="captionSemibold"
                                textAlign="start"
                                sx={{ paddingLeft: '0.5rem' }}
                            >
                                동아리 태그
                            </Text>
                            <HashTagInput
                                tags={hashTags}
                                onTagsChange={handleTagsChange}
                                sx={{ width: '100%' }}
                                maxTags={4}
                            />
                        </div>
                    </div>
                </div>
            </Dialog.Content>
            <Dialog.Action position="end">
                <Button variant="primary" onClick={handleSaveClubData} loading={isUpdateLoading}>
                    저장
                </Button>
                <Button variant="outlined" onClick={onClose}>
                    취소
                </Button>
            </Dialog.Action>
        </Dialog>
    );
}

export { MainCardEditDialog };
