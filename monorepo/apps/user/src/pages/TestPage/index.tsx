import { EmailVerificationDialog } from '@components/EmailVerificationDialog';
import { useState } from 'react';

import { useToast } from '@ssoc/ui';
import { Button } from '@ssoc/ui';

function TestPage() {
    const { toast } = useToast();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    return (
        <div>
            <Button onClick={() => setIsDialogOpen(true)}>테스트</Button>
            <EmailVerificationDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                email={'ohsung@ohsung.com'}
                expiresAt="2025-08-28T14:30:00"
            />
        </div>
    );
}

export { TestPage };
