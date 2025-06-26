import { createContext, useContext } from 'react';
export const CheckboxContext = createContext(undefined);
export const useCheckboxContext = () => {
    const context = useContext(CheckboxContext);
    if (context === undefined) {
        throw new Error('useCheckboxContext는 useCheckboxContext.Provider 내부에서만 사용할 수 있습니다.');
    }
    return context;
};
//# sourceMappingURL=CheckboxContext.js.map