type ConsentKeys = 'service' | 'privacy' | 'sensitive';

type TermsConsentState = Record<ConsentKeys, boolean>;

interface TermsOfUseProps {
    onAgree: (state: TermsConsentState) => void;
    initialState?: Partial<TermsConsentState>;
    ctaLabel?: string;
    title?: string;
    description?: string;
}
