const extractUserIdFromToken = (authHeader: string | undefined | null): string | null => {
    if (!authHeader) return null;

    if (!authHeader.startsWith('Bearer ')) return null;

    const token = authHeader.slice('Bearer '.length).trim();

    if (token.startsWith('mock-user-token-')) {
        return token.replace('mock-user-token-', '');
    }

    return null;
};

export { extractUserIdFromToken };
