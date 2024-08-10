package com.ryc.api.v1.auth.service;

import com.ryc.api.v1.auth.dto.RegisterRequest;
import com.ryc.api.v1.auth.dto.RegisterResponse;

public interface AuthService {
    RegisterResponse register(RegisterRequest body);
}
