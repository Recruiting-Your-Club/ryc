import React from 'react';
import { useState } from 'react';
import {
    SidebarContainer,
    Header,
    HeaderTitle,
    IconButton,
    NewChatSection,
    NewChatButton,
    SearchInput,
    SearchIcon,
    SearchSection,
    SearchContainer,
    ConversationList,
    ConversationItem,
    ConversationIcon,
    ConversationContent,
    ConversationTitle,
    ConversationDate,
    Footer,
    FooterContent,
    ModelInfo,
} from './testStyle';

function SideBar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [conversations, setConversations] = useState([
        { id: 1, title: '마케팅 전략 논의', date: '오늘' },
        { id: 2, title: '이메일 초안 작성', date: '어제' },
        { id: 3, title: '제품 설명서 요약', date: '3월 29일' },
        { id: 4, title: '코드 디버깅 도움', date: '3월 28일' },
    ]);

    return (
        <>
            <div css={SidebarContainer({ isCollapsed })}>
                {/* 상단 섹션 */}
                <div css={Header}>
                    {!isCollapsed && <div css={HeaderTitle}>Claude</div>}
                    <button css={IconButton} onClick={() => setIsCollapsed(!isCollapsed)}>
                        {/**{isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}*/}
                    </button>
                </div>

                {/* 새 대화 버튼 */}
                <div css={NewChatSection}>
                    <button css={NewChatButton({ isCollapsed })}>
                        {/**
                        {isCollapsed ? (
                            <PlusCircle size={20} />
                        ) : (
                            <>
                                <PlusCircle size={20} />
                                <span>새 대화</span>
                            </>
                        )}
                             */}
                    </button>
                </div>

                {/* 검색 */}
                {!isCollapsed && (
                    <section css={SearchSection}>
                        <div css={SearchContainer}>
                            <input css={SearchInput} type="text" placeholder="대화 검색" />
                            <div css={SearchIcon} />
                        </div>
                    </section>
                )}

                {/* 대화 목록 */}
                <div css={ConversationList}>
                    {conversations.map((convo) => (
                        <div css={ConversationItem} key={convo.id}>
                            <div css={ConversationIcon} />
                            {!isCollapsed && (
                                <div css={ConversationContent}>
                                    <div css={ConversationTitle}>{convo.title}</div>
                                    <div css={ConversationDate}>{convo.date}</div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* 하단 메뉴 */}
                <footer css={Footer}>
                    <div css={FooterContent}>
                        {!isCollapsed && <div css={ModelInfo}>Claude 3.7 Sonnet</div>}
                        <div css={IconButton}>{/**<Settings size={20} />*/}</div>
                    </div>
                </footer>
            </div>
        </>
    );
}
export { SideBar };
