import { Tag } from '@ssoc/ui';

function TagStatus(status: string) {
    switch (status) {
        case 'RECRUITING':
            return <Tag text="모집중" variant="progress" />;
        case 'UPCOMING':
            return <Tag text="모집예정" variant="primary" />;
        case 'CLOSED':
            return <Tag text="모집마감" variant="end" />;
        default:
            return <Tag text="미정" variant="primary" />;
    }
}

export { TagStatus };
