import React from 'react';
import { Text } from '@components/_common/Text';
import { clubApplyForm, clubApplyFormConatiner } from './ClubApplyPage.style';
import { Input } from '@components';
import { clubData } from './ClubApplyPage';
import { Radio } from '@components/_common/Radio';
interface ClubApplyDetailQuestionPageProps {
    idx: number;
}

function ClubApplyPersonalInfoPage({ idx }: ClubApplyDetailQuestionPageProps) {
    return (
        <div css={clubApplyFormConatiner(idx)}>
            <div css={clubApplyForm}>
                <Input variant="lined" label={clubData.name} inputSx={{ width: '50%' }} />
            </div>
            <div css={clubApplyForm}>
                <Input variant="lined" label={clubData.birth} inputSx={{ width: '50%' }} />
            </div>
            <div css={clubApplyForm}>
                <Input variant="lined" label={clubData.phoneNumber} inputSx={{ width: '50%' }} />
            </div>
            <div css={clubApplyForm}>
                <Text>{clubData.gender}</Text>
                <Radio
                    name="gender"
                    orientation="vertical"
                    options={[
                        { label: '남', value: 'male' },
                        { label: '여', value: 'female' },
                    ]}
                    // eslint-disable-next-line no-console
                    onChange={() => console.log('a')}
                />
            </div>
        </div>
    );
}

export { ClubApplyPersonalInfoPage };
