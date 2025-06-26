declare const useRouter: () => {
    goTo: (path: string) => void | Promise<void>;
    goBack: () => void | Promise<void>;
    goFront: () => void | Promise<void>;
    removeHistoryAndGo: (path: string) => void | Promise<void>;
};
export { useRouter };
//# sourceMappingURL=useRouter.d.ts.map