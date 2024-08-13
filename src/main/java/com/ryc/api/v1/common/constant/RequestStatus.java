package com.ryc.api.v1.common.constant;

public enum RequestStatus {
    PENDING,      // 요청이 제출되어 대기 중인 상태
    IN_PROGRESS,  // 요청이 처리 중인 상태
    COMPLETED,    // 요청이 성공적으로 완료된 상태
    APPROVED,     // 요청이 승인된 상태
    REJECTED,     // 요청이 거부된 상태
    CANCELLED,    // 요청이 취소된 상태
    FAILED,       // 요청이 처리 도중 실패한 상태
    ON_HOLD,       // 요청이 보류된 상태
    ALL
}
