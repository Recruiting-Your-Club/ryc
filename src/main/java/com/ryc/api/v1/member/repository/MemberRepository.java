package com.ryc.api.v1.member.repository;

import com.ryc.api.v1.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, String> {
    boolean existsByEmail(String email);
    Member findByEmail(String email);
}
