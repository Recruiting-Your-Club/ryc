import { Tag } from '@ssoc/ui';

function TagStatus(status: string) {
    switch (status) {
        case 'progress':
            return <Tag text="모집중" variant="progress" />;
        case 'primary':
            return <Tag text="모집예정" variant="primary" />;
        case 'end':
            return <Tag text="모집마감" variant="end" />;
        default:
            return <Tag text="미상" variant="progress" />;
    }
}

export { TagStatus };
