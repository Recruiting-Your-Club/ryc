import { createContext, useContext } from 'react';

import type { InterviewSettingDialogContextType } from './types';

export const InterviewSettingDialogContext = createContext<
    InterviewSettingDialogContextType | undefined
>(undefined);

export const useInterviewSettingDialogContext = () => {
    const context = useContext(InterviewSettingDialogContext);

    if (context === undefined) {
        throw new Error(
            'useInterviewSettingDialogContext는 useInterviewSettingDialogContext.Provider 내부에서만 사용할 수 있습니다.',
        );
    }

    return context;
};
