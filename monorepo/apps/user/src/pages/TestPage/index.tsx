import { useToast } from '@ssoc/ui';
import { Button } from '@ssoc/ui';

function TestPage() {
    const { toast } = useToast();
    return (
        <div>
            <button onClick={() => toast('test')}>테스트입니다.</button>
        </div>
    );
}
export { TestPage };
