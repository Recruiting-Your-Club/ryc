import { MainCardEditDialog } from '@components';
import { useState } from 'react';

import { Button, Editor, Stepper } from '@ssoc/ui';

function TestPage() {
    const [activeStep, setActiveStep] = useState(0);
    const [openClubCardDialog, setOpenClubCardDialog] = useState(true);
    const club = {
        name: 'FC-SSOC',
        shortDescription: '축구에 진심인 사람들이 모인 곳',
        detailDescription:
            '저희는 축구를 사랑하는 사람들이 모여 함께 즐기는 동아리입니다. 매주 정기적으로 모여 경기를 하고, 다양한 친목 활동도 진행합니다.',
        representativeImage: {
            id: 'rep-image-id-123',
            originalFileName: 'ssoc-logo.png',
            url: 'https://i.namu.wiki/i/7Szm8bB2q-2T84lluELzc-j2a2j71-u-Sik7a-0J3rM-e-t-C-Q-X-F-x-W-g-L-Y-w-I-O-H-N-k-M-J-z-A.svg',
            contentType: 'image/svg+xml',
        },
        category: 'SPORTS',
        clubTags: [
            { id: 'tag-1', name: '축구' },
            { id: 'tag-2', name: '운동' },
            { id: 'tag-3', name: '친목' },
        ],
        clubSummaries: [
            { id: 'summary-1', title: '회장', content: '김쏘기' },
            { id: 'summary-2', title: '동아리방', content: '학생회관 101호' },
            { id: 'summary-3', title: '연락처', content: '010-1234-5678' },
        ],
        clubDetailImages: [
            {
                id: 'detail-img-1',
                url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                originalFileName: 'soccer-match.jpg',
                contentType: 'image/jpeg',
            },
            {
                id: 'detail-img-2',
                url: 'https://images.unsplash.com/photo-1551958214-2d5e2b2a6a8e?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                originalFileName: 'team-huddle.jpg',
                contentType: 'image/jpeg',
            },
        ],
    };
    return (
        <div style={{ width: '800px' }}>
            <div
                style={{
                    display: 'flex',
                    marginTop: '2rem',
                    textAlign: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Button onClick={() => setOpenClubCardDialog(true)}>동아리 카드 수정</Button>
            </div>
            <MainCardEditDialog
                open={openClubCardDialog}
                onClose={() => setOpenClubCardDialog(false)}
                club={club}
            />
        </div>
    );
}
export { TestPage };
