package com.ryc.api.v1.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ryc.api.v1.user.domain.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
  boolean existsByEmail(String email);

  User findByEmail(String email);
}
