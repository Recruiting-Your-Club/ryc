const useToast = (props: string) => {
    const toast = (message: string) => {
        alert(message);
    };

    const getToastToRender = <T,>(cb: (toasts: string) => T): T => {
        return {} as T;
    };
    return {
        toast,
    };
};
export { useToast };
