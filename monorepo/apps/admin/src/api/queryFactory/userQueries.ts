import { checkEmail } from '@api/domain/auth/auth';
import { userKeys } from '@api/querykeyFactory';
import { queryOptions } from '@tanstack/react-query';

const userQueries = {
    checkDuplicateEmail: (email: string, on: boolean = false) =>
        queryOptions({
            queryKey: userKeys.checkDuplicateEmail(email),
            queryFn: () => checkEmail(email),
            enabled: on,
        }),
};

export { userQueries };
