package com.ryc.api.v2.admin.domain;

/** 해당 ENUM은 회원가입한 회원의 경우 기본적으로 부여되는 Security에서 설정하는 ROLE을 의미한다. 따라서 비즈니스 로직에서 사용되지 않는다.
 * 단순히, 로그인시, Security에서 사용하기 위한 무의미한 값으로 해석해도 된다.
 * 비즈니스 로직에서 사용하는 동아리 내 권한은 동아리 운영진, 동아리원의 ROLE은 ClubRole에서 별도로 관리한다.
*/
// TODO: 추후 해당 권한 삭제 예정
public enum AdminDefaultRole {
    USER
}
