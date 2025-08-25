import type { Club } from '@api/domain/club/types';
import { HashTagInput } from '@components';
import type { Tag } from '@components/HashTagInput/types';
import { useState } from 'react';

import { Input, Text } from '@ssoc/ui';
import { Button, Dialog, MainCard } from '@ssoc/ui';

import { s_contentContainer, s_inputContainer } from './MadinCardEditDialog.style';

function MainCardEditDialog({
    open,
    onClose,
    club,
}: {
    open: boolean;
    onClose: () => void;
    club: Club;
}) {
    const [shortDescription, setShortDescription] = useState(club?.shortDescription);
    const [hashTags, setHashTags] = useState(club?.clubTags);
    const handleShortDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShortDescription(event.target.value);
    };
    const handleTagsChange = (newTags: Tag[]) => {
        setHashTags(newTags);
    };
    return (
        <Dialog open={open} handleClose={onClose} size="lg" backdrop={false}>
            <Dialog.Header>
                <Text type="h4Semibold" textAlign="start">
                    동아리 카드 수정
                </Text>
            </Dialog.Header>
            <Dialog.Content>
                <div css={s_contentContainer}>
                    <MainCard
                        title={club?.name}
                        category={club?.category}
                        description={shortDescription}
                        clubTags={hashTags}
                        representativeImage={club?.representativeImage.url}
                    />
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
                <Button variant="primary">저장</Button>
                <Button variant="outlined">취소</Button>
            </Dialog.Action>
        </Dialog>
    );
}

export { MainCardEditDialog };
