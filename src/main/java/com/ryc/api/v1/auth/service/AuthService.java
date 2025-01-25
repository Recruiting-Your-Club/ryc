package com.ryc.api.v1.auth.service;

import com.ryc.api.v1.auth.dto.request.RegisterRequest;
import com.ryc.api.v1.auth.dto.response.RegisterResponse;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    RegisterResponse register(RegisterRequest body);
    ResponseEntity logoutUser(String authorizationHeader);
}
