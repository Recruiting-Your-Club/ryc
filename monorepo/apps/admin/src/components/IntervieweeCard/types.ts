import type { HTMLAttributes } from 'react';

export interface IntervieweeCardProps extends HTMLAttributes<HTMLButtonElement> {
    name: string;
    email: string;
    imageUrl?: string;
    isActivated?: boolean;
}
