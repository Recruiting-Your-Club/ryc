package com.ryc.api.v2.common.constant;

/**
 * 공고 라이프 사이클을 표현하는 ENUM 타입
 */
// TODO: 공고 CREATED와 REGISTERED와 ACTIVATED는 우리 비즈니스 로직에서 분리할 필요는 없어 보임. 논의 필요
public enum ProcessStatus {
    CREATED,
    REGISTERED,
    ACTIVATED,
    EXPIRED
}
