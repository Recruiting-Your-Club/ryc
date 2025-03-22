package com.ryc.api.v2.common.constant;

/**
 * 권한 요청, 혹은 사용자가 동아리 운영진에게 어떤 요청을 보낼 때, 요청 객체의 상태 ENUM
 */
public enum RequestStatus {
    PENDING, // 요청이 제출되어 대기 중인 상태
    IN_PROGRESS, // 요청이 처리 중인 상태
    APPROVED, // 요청이 승인된 상태
    REJECTED, // 요청이 거부된 상태
    CANCELLED, // 요청이 취소된 상태
    FAILED, // 요청이 처리 도중 실패한 상태
    ON_HOLD, // 요청이 보류된 상태
    ALL
}
