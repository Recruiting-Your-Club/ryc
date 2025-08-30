export type ConsentKeys = 'service' | 'manager';
export type TermsConsentState = Record<ConsentKeys, boolean>;

export interface TermsOfUseRegisterProps {
    onAgree: (state: TermsConsentState) => void;
    initialState?: Partial<TermsConsentState>;
    ctaLabel: string;
    title: string;
    description: string;
}
