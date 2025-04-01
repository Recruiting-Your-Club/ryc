import { css } from '@emotion/react';

interface SidebarContainerProps {
    isCollapsed: boolean;
}

export const SidebarContainer = (props: SidebarContainerProps) => css`
    height: 100vh;
    background-color: #0f172a;
    color: white;
    transition: all 0.3s;
    display: flex;
    flex-direction: column;
    width: ${props.isCollapsed ? '4rem' : '16rem'};
`;

export const Header = css`
    padding: 1rem;
    border-bottom: 1px solid #334155;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const HeaderTitle = css`
    font-size: 1.25rem;
    font-weight: 600;
`;

export const IconButton = css`
    padding: 0.25rem;
    border-radius: 9999px;
    &:hover {
        background-color: #334155;
    }
`;

export const NewChatSection = css`
    padding: 1rem;
`;

interface NewChatButtonProps {
    isCollapsed: boolean;
}

export const NewChatButton = (props: NewChatButtonProps) => css`
    background-color: #4f46e5;
    border-radius: 0.375rem;
    padding: ${props.isCollapsed ? '0.5rem' : '0.5rem 1rem'};
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.3s;
    &:hover {
        background-color: #4338ca;
    }
`;

export const SearchSection = css`
    padding: 0 1rem 0.5rem 1rem;
`;

export const SearchContainer = css`
    position: relative;
`;

export const SearchInput = css`
    width: 100%;
    background-color: #1e293b;
    border-radius: 0.375rem;
    padding: 0.5rem 1rem 0.5rem 2.5rem;
    font-size: 0.875rem;
`;

export const SearchIcon = css`
    position: absolute;
    left: 0.75rem;
    top: 0.625rem;
    color: #94a3b8;
`;

export const ConversationList = css`
    flex: 1;
    overflow-y: auto;
    padding-top: 0.5rem;
`;

export const ConversationItem = css`
    padding: 0.5rem 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    &:hover {
        background-color: #1e293b;
    }
`;

export const ConversationIcon = css`
    margin-right: 0.5rem;
    color: #94a3b8;
    min-width: 1rem;
`;

export const ConversationContent = css`
    overflow: hidden;
`;

export const ConversationTitle = css`
    font-size: 0.875rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const ConversationDate = css`
    font-size: 0.75rem;
    color: #94a3b8;
`;

export const Footer = css`
    padding: 1rem;
    border-top: 1px solid #334155;
`;

export const FooterContent = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const ModelInfo = css`
    font-size: 0.875rem;
`;
